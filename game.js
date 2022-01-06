let note = [];
let count = 0;
let i=98;
let selecionado = null;
let notaselecionada = null
var port;
let coluna=[];
let linha=[];
let checkList = [3];
checkList[1] = [];
checkList[2] = [];
checkList[3] = [];
let last_instrument = "";
let instrument_list = [];
let notex = [];
let notey = [];
let dirx = [];
let solo = 1;
let solo_player = true;
let player_number = 0;
let shiftable = false;
let div;
let familyDiv;
let left_arrow;
let right_arrow;
let current_familia = "Sopro";
let tocarPressed = false;

let dragging = false;
let offsetX, offsetY;
let canvasWidth, canvasHeight;
let currentDragDiv;

//let sopro_names =['AltoSax', 'SopranoSax','BaritonoSax', 'Oboe', 'Fagote', 'Trompete', 'Trombone', 'Tuba'];
let sopro =[[65,'AltoSax'],[64,'SopranoSax'] ,[67,'BaritonoSax'],[69,'Oboe'],[70,'Fagote'],[56,'Trompote'],[57,'Trombone'],[58,'Tuba']];
let cordas = [[24,'Guitarra Acustica'],[27,'Guitarra Elétrica'],[40,'Violino'],[42,'Violoncelo'],[46,'Harpa'],[104,'Sitar'],[105,'Banjo'],[107,'Koto']];


cenario_atual = sopro;

function preload(){
  bg = loadImage('images/background.jpg');
  font = loadFont('font/titlespace.otf');
  col = color(36, 63, 141, 100);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  windowResized();
  JZZ.synth.Tiny.register('Web Audio');
  port = JZZ().openMidiOut();

 
  familyDiv = createDiv('<div class = "family_container"><button type="button" id="left"><img src="images/left_arrow.png" width="40" height="50"/></button><button class="button" type="button" id="familia">Sopro</button><button type="button" id="right"><img src="images/right_arrow.png" width="40" height="50"/></button></div>');
  familyDiv.position(windowWidth*0.75, windowHeight* 0.30);

  left_arrow = select('#left');
  left_arrow.mousePressed(function(){ switchFamily(true)});
  left_arrow.touchStarted(function(){ switchFamily(true)});

  right_arrow = select('#right');
  right_arrow.mousePressed(function(){ switchFamily(false)});
  right_arrow.touchStarted(function(){ switchFamily(false)});

  conjuntoButton = createButton('Tocar em Conjunto');
  conjuntoButton.position(windowWidth*0.75, windowHeight* 0.10);
  conjuntoButton.addClass('button');
  conjuntoButton.style('border', '1px solid #243F8D');
  conjuntoButton.style('background-color', col);
  conjuntoButton.mousePressed(switchButton);
  conjuntoButton.touchStarted(switchButton);

  soloButton = createButton('Tocar a Solo');
  soloButton.position(windowWidth*0.75, windowHeight* 0.10);
  soloButton.addClass('button');
  soloButton.style('border', '1px solid #243F8D');
  soloButton.style('background-color', col);
  soloButton.hide();
  soloButton.mousePressed(switchButton);
  soloButton.touchStarted(switchButton);

  okButton = createButton('Tocar');
  okButton.position(windowWidth*0.75, windowHeight* 0.70);
  okButton.addClass('button');
  okButton.style('border', '1px solid #243F8D');
  okButton.style('background-color', col);
  okButton.hide();
  okButton.mousePressed(tocarConjunto);
  okButton.touchStarted(tocarConjunto);

  player1 = new MusicalNote("player1", instrument_list[0],100,100,10,200,1);
  player2= new MusicalNote("player2",instrument_list[1],200,100,10,400,2);
  player3 = new MusicalNote("player3",instrument_list[2],300,100,10,400,1);

  push();
  player1_drag = player1.notes();
  player1_drag.mousePressed(function(){ dragDiv(player1_drag)}).touchStarted(function(){ dragDiv(player1_drag)}).mouseReleased(dropDiv).touchEnded(dropDiv);
  player1_drag.position((windowWidth/3),550);
  pop();

  push();
  player2_drag = player2.notes();
  player2_drag.mousePressed(function(){ dragDiv(player2_drag)}).touchStarted(function(){ dragDiv(player2_drag)}).mouseReleased(dropDiv).touchEnded(dropDiv);
  player2_drag.style('transform', 'rotate(90deg)');
  player2_drag.position(0,250);
  player2_drag.hide();
  pop();

  push();
  player3_drag = player3.notes();
  player3_drag.mousePressed(function(){ dragDiv(player3_drag)}).touchStarted(function(){ dragDiv(player3_drag)}).mouseReleased(dropDiv).touchEnded(dropDiv);
  player3_drag.style('transform', 'rotate(-90deg)');
  player3_drag.position(900, 250);
  player3_drag.hide();
  pop();

  player1.doButton.mousePressed(function() {doNote(1,60,player1.instrumento);});
  player1.doButton.touchStarted(function() {doNote(1,60,player1.instrumento);});
  player1.doButton.mouseReleased(function() {stopNote(1,60,);});
  player1.doButton.touchEnded(function() {stopNote(1,60);});

  player1.reButton.mousePressed(function() {doNote(1,62,player1.instrumento);});
  player1.reButton.touchStarted(function() {doNote(1,62,player1.instrumento);});
  player1.reButton.mouseReleased(function() {stopNote(1,62);});
  player1.reButton.touchEnded(function() {stopNote(1,62);});

  player1.miButton.mousePressed(function() {doNote(1,64,player1.instrumento);});
  player1.miButton.touchStarted(function() {doNote(1,64,player1.instrumento);});
  player1.miButton.mouseReleased(function() {stopNote(1,64);});
  player1.miButton.touchEnded(function() {stopNote(1,64);});

  player1.faButton.mousePressed(function() {doNote(1,65,player1.instrumento);});
  player1.faButton.touchStarted(function() {doNote(1,65,player1.instrumento);});
  player1.faButton.mouseReleased(function() {stopNote(1,65);});
  player1.faButton.touchEnded(function() {stopNote(1,65);});

  player1.solButton.mousePressed(function() {doNote(1,67,player1.instrumento);});
  player1.solButton.touchStarted(function() {doNote(1,67,player1.instrumento);});
  player1.solButton.mouseReleased(function() {stopNote(1,67);});
  player1.solButton.touchEnded(function() {stopNote(1,67);});

  player1.laButton.mousePressed(function() {doNote(1,69,player1.instrumento);});
  player1.laButton.touchStarted(function() {doNote(1,69,player1.instrumento);});
  player1.laButton.mouseReleased(function() {stopNote(1,69);});
  player1.laButton.touchEnded(function() {stopNote(1,69);});
  
  player1.siButton.mousePressed(function() {doNote(1,71,player1.instrumento);});
  player1.siButton.touchStarted(function() {doNote(1,71,player1.instrumento);});
  player1.siButton.mouseReleased(function() {stopNote(1,71);});
  player1.siButton.touchEnded(function() {stopNote(1,71);});
  
  player1.do2Button.mousePressed(function() {doNote(1,72,player1.instrumento);});
  player1.do2Button.touchStarted(function() {doNote(1,72,player1.instrumento);});
  player1.do2Button.mouseReleased(function() {stopNote(1,72);});
  player1.do2Button.touchEnded(function() {stopNote(1,72);});


  //PLAYER 2
  player2.doButton.mousePressed(function() {doNote(2,60,player2.instrumento);});
  player2.doButton.touchStarted(function() {doNote(2,60,player2.instrumento);});
  player2.doButton.mouseReleased(function() {stopNote(2,60);});
  player2.doButton.touchEnded(function() {stopNote(2,60);});

  player2.reButton.mousePressed(function() {doNote(2,62,player2.instrumento);});
  player2.reButton.touchStarted(function() {doNote(2,62,player2.instrumento);});
  player2.reButton.mouseReleased(function() {stopNote(2,62);});
  player2.reButton.touchEnded(function() {stopNote(2,62);});

  player2.miButton.mousePressed(function() {doNote(2,64,player2.instrumento);});
  player2.miButton.touchStarted(function() {doNote(2,64,player2.instrumento);});
  player2.miButton.mouseReleased(function() {stopNote(2,64);});
  player2.miButton.touchEnded(function() {stopNote(2,64);});

  player2.faButton.mousePressed(function() {doNote(2,65,player2.instrumento);});
  player2.faButton.touchStarted(function() {doNote(2,65,player2.instrumento);});
  player2.faButton.mouseReleased(function() {stopNote(2,65);});
  player2.faButton.touchEnded(function() {stopNote(2,65);});

  player2.solButton.mousePressed(function() {doNote(2,67,player2.instrumento);});
  player2.solButton.touchStarted(function() {doNote(2,67,player2.instrumento);});
  player2.solButton.mouseReleased(function() {stopNote(2,67);});
  player2.solButton.touchEnded(function() {stopNote(2,67);});

  player2.laButton.mousePressed(function() {doNote(2,69,player2.instrumento);});
  player2.laButton.touchStarted(function() {doNote(2,69,player2.instrumento);});
  player2.laButton.mouseReleased(function() {stopNote(2,69);});
  player2.laButton.touchEnded(function() {stopNote(2,69);});
  
  player2.siButton.mousePressed(function() {doNote(2,71,player2.instrumento);});
  player2.siButton.touchStarted(function() {doNote(2,71,player2.instrumento);});
  player2.siButton.mouseReleased(function() {stopNote(2,71);});
  player2.siButton.touchEnded(function() {stopNote(2,71);});
  
  player2.do2Button.mousePressed(function() {doNote(2,72,player2.instrumento);});
  player2.do2Button.touchStarted(function() {doNote(2,72,player2.instrumento);});
  player2.do2Button.mouseReleased(function() {stopNote(2,72);});
  player2.do2Button.touchEnded(function() {stopNote(2,72);});

  //PLAYER 3
  player3.doButton.mousePressed(function() {doNote(3,60, player3.instrumento);});
  player3.doButton.touchStarted(function() {doNote(3,60, player3.instrumento);});
  player3.doButton.mouseReleased(function() {stopNote(3,60);});
  player3.doButton.touchEnded(function() {stopNote(3,60);});

  player3.reButton.mousePressed(function() {doNote(3,62, player3.instrumento);});
  player3.reButton.touchStarted(function() {doNote(3,62, player3.instrumento);});
  player3.reButton.mouseReleased(function() {stopNote(3,62);});
  player3.reButton.touchEnded(function() {stopNote(3,62);});

  player3.miButton.mousePressed(function() {doNote(3,64, player3.instrumento);});
  player3.miButton.touchStarted(function() {doNote(3,64, player3.instrumento);});
  player3.miButton.mouseReleased(function() {stopNote(3,64);});
  player3.miButton.touchEnded(function() {stopNote(3,64);});

  player3.faButton.mousePressed(function() {doNote(3,65, player3.instrumento);});
  player3.faButton.touchStarted(function() {doNote(3,65, player3.instrumento);});
  player3.faButton.mouseReleased(function() {stopNote(3,65);});
  player3.faButton.touchEnded(function() {stopNote(3,65);});

  player3.solButton.mousePressed(function() {doNote(3,67, player3.instrumento);});
  player3.solButton.touchStarted(function() {doNote(3,67, player3.instrumento);});
  player3.solButton.mouseReleased(function() {stopNote(3,67);});
  player3.solButton.touchEnded(function() {stopNote(3,67);});

  player3.laButton.mousePressed(function() {doNote(3,69, player3.instrumento);});
  player3.laButton.touchStarted(function() {doNote(3,69, player3.instrumento);});
  player3.laButton.mouseReleased(function() {stopNote(3,69);});
  player3.laButton.touchEnded(function() {stopNote(3,69);});
  
  player3.siButton.mousePressed(function() {doNote(3,71, player3.instrumento);});
  player3.siButton.touchStarted(function() {doNote(3,71, player3.instrumento);});
  player3.siButton.mouseReleased(function() {stopNote(3,71);});
  player3.siButton.touchEnded(function() {stopNote(3,71);});
  
  player3.do2Button.mousePressed(function() {doNote(3,72, player3.instrumento);});
  player3.do2Button.touchStarted(function() {doNote(3,72, player3.instrumento);});
  player3.do2Button.mouseReleased(function() {stopNote(3,72);});
  player3.do2Button.touchEnded(function() {stopNote(3,72);});

  /****
   * INSTRUMENTOS
   * 
   */
  /*
  button = createImg('/images/guitarra-classica.png');
  button.position(410,270);
  button.size(150,100);
  button.addClass('instrument');
  button.mousePressed(guitarra);
  button.touchStarted(guitarra);

*/

 //Mudar nome das imagens para substituir com 
 
  Instrument1 = createImg('images/'+ cenario_atual[0][0] + '.png');
  Instrument1.position(windowWidth/3.1,windowHeight/4.9);
  Instrument1.size(60,120);
  Instrument1.addClass('instrument');
  Instrument1.mousePressed(function(){ change_instrument(cenario_atual[0][0], cenario_atual[0][1],0,0);});
  Instrument1.touchStarted(function(){ change_instrument(cenario_atual[0][0], cenario_atual[0][1],0,0);});

  Instrument2 = createImg('images/'+ cenario_atual[1][0] + '.png');
  Instrument2.position(windowWidth/2.33,windowHeight/4.9);
  Instrument2.size(60,120);
  Instrument2.addClass('instrument');
  Instrument2.mousePressed(function(){ change_instrument(cenario_atual[1][0], cenario_atual[1][1],1,0);});
  Instrument2.touchStarted(function(){ change_instrument(cenario_atual[1][0], cenario_atual[1][1],1,0);});

  Instrument3 = createImg('images/'+ cenario_atual[2][0] + '.png');
  Instrument3.position(windowWidth/1.94,windowHeight/4.9);
  Instrument3.size(90,120);
  Instrument3.addClass('instrument');
  Instrument3.mousePressed(function(){ change_instrument(cenario_atual[2][0], cenario_atual[2][1],2,0);});
  Instrument3.touchStarted(function(){ change_instrument(cenario_atual[2][0], cenario_atual[2][1],2,0);});

  Instrument4 = createImg('images/'+ cenario_atual[3][0] + '.png');
  Instrument4.position(windowWidth*0.62,windowHeight/4.9);
  Instrument4.size(90,120);
  Instrument4.addClass('instrument');
  Instrument4.mousePressed(function(){ change_instrument(cenario_atual[3][0], cenario_atual[3][1],3,0);});
  Instrument4.touchStarted(function(){ change_instrument(cenario_atual[3][0], cenario_atual[3][1],3,0);});

  Instrument5 = createImg('images/'+ cenario_atual[4][0] + '.png');
  Instrument5.position(windowWidth/3.1,windowHeight/2.47);
  Instrument5.size(90,120);
  Instrument5.addClass('instrument');
  Instrument5.mousePressed(function(){ change_instrument(cenario_atual[4][0], cenario_atual[4][1],0,1);});
  Instrument5.touchStarted(function(){ change_instrument(cenario_atual[4][0], cenario_atual[4][1],0,1);});

  Instrument6 = createImg('images/'+ cenario_atual[5][0] + '.png');
  Instrument6.position(windowWidth/2.4,windowHeight/2.47);
  Instrument6.size(90,120);
  Instrument6.addClass('instrument');
  Instrument6.mousePressed(function(){ change_instrument(cenario_atual[5][0], cenario_atual[5][1],1,1);});
  Instrument6.touchStarted(function(){ change_instrument(cenario_atual[5][0], cenario_atual[5][1],1,1);});
  
  Instrument7 = createImg('images/'+ cenario_atual[6][0] + '.png');
  Instrument7.position(windowWidth/1.94,windowHeight/2.47);
  Instrument7.size(90,120);
  Instrument7.addClass('instrument');
  Instrument7.mousePressed(function(){ change_instrument(cenario_atual[6][0], cenario_atual[6][1],2,1);});
  Instrument7.touchStarted(function(){ change_instrument(cenario_atual[6][0], cenario_atual[6][1],2,1);});

  Instrument8 = createImg('images/'+ cenario_atual[7][0] + '.png');
  Instrument8.position(windowWidth*0.62,windowHeight/2.47);
  Instrument8.size(90,120);
  Instrument8.addClass('instrument');
  Instrument8.mousePressed(function(){ change_instrument(cenario_atual[7][0], cenario_atual[7][1],3,1);});
  Instrument8.touchStarted(function(){ change_instrument(cenario_atual[7][0], cenario_atual[7][1],3,1);});
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function draw() {
  background(bg);

  for (var x = (width/10)*3; x <= width - (width/10)*3; x += width / 10) {
		for (var y = 0; y < height - height/5; y += height / 5) {
			stroke(0);
			strokeWeight(1);
			line(x, (height/5), x, height-(height/5)*2);
			line((width/10)*3, y, width-(width/10)*3, y);
		}
	}
  
  if(selecionado!=null && solo_player==true){
    if(shiftable){
      shiftable = false;
      checkInstrument();
    }
    highlightSelected();
  }
  else if(selecionado!=null && solo_player==false){
    highlightSelected();
  }

  if(notex[-1]!=0 && notey[-1]!=0){
    animatedNote();
  }

  if(dragging){

    newX = mouseX + offsetX;
    newY = mouseY + offsetY;

    currentDragDiv.position(newX, newY);
  }

  if(instrument_list[0]!=null){
    player1.setInstrument(instrument_list[0]);
  }
  if(instrument_list[1]!=null){
    player2.setInstrument(instrument_list[1]);
  }
  if(instrument_list[2]!=null){
    player3.setInstrument(instrument_list[2]);
  }
}

function dropDiv(){
  dragging = false;
  currentDragDiv = null;
}

function dragDiv(d){
  currentDragDiv = d;
  dragging = true;        
  offsetX = currentDragDiv.x - mouseX;
  offsetY = currentDragDiv.y - mouseY;
}


function switchFamily(left){
  if(left){
    if(current_familia == "Sopro"){
      current_familia = "Cordas";
    }
    else if(current_familia == "Cordas"){
      current_familia = "Percursao";
    }
    else{
      current_familia = "Sopro";
    }
  }
  else{
    if(current_familia == "Sopro"){
      current_familia = "Percursao";
    }
    else if(current_familia == "Percursao"){
      current_familia = "Cordas";
    }
    else{
      current_familia = "Sopro";
    }
  }
  document.getElementById('familia').innerText = current_familia;
}

function switchButton(){
  last_instrument = "";
  selecionado = null;
  instrument_list = [];
  coluna = [];
  linha = [];

  checkList = [3];
  checkList[1] = [];
  checkList[2] = [];
  checkList[3] = [];

  //MODO CONJUNTO
  if(solo == 1){
    conjuntoButton.hide();
    soloButton.show();
    okButton.hide();
    solo = 0;
    solo_player = false;

    let title = createElement('h', 'Selecione os Instrumentos');
    title.addClass('selectInstrument')
    title.position(windowWidth * 0.40 ,windowHeight* 0.03);
  }
  //MODO SOLO
  else{
    conjuntoButton.show();
    okButton.hide();
    soloButton.hide();
    player2_drag.hide();
    player3_drag.hide();
    solo = 1;
    solo_player = true;
    tocarPressed = false;
    player_number = 0;
  }
}

function animatedNote(){
  strokeWeight(1);
  fill(105,138,13);
  textSize(15);
  textFont('Times New Roman');
  for (let i = 0; i < notex.length; i++){
    text(note[i], notex[i], notey[i]);
    notex[i] += dirx[i];
    notey[i] -= 0.5;
    if(notey[i]<0){
      notey.shift();
      notex.shift()
      dirx.shift();
      note.shift();
    }
  }
}

function highlightSelected(){
  fill(105,138,13);
  textSize(40);
  textFont(font);
  textAlign(CENTER, CENTER);

  if(solo_player){
    text(instrument_list[0], width/2, height*0.1);
  }
  else{
    text(instrument_list[0], width/2, height*0.03);
  }

  stroke(105,138,13);
  strokeWeight(5);

  line((width/10)*(3+coluna[0]), (height/5)*(1+linha[0]), (width/10)*(4+coluna[0]), (height/5)*(1+linha[0]));
  line((width/10)*(3+coluna[0]), (height/5)*(2+linha[0]),(width/10)*(4+coluna[0]), (height/5)*(2+linha[0]));
  line((width/10)*(3+coluna[0]), (height/5)*(1+linha[0]), (width/10)*(3+coluna[0]), (height/5)*(2+linha[0]));
  line((width/10)*(4+coluna[0]), (height/5)*(1+linha[0]), (width/10)*(4+coluna[0]), (height/5)*(2+linha[0]));

  if(!solo_player){

    noStroke();
    fill(255,21,170);
    text(instrument_list[1], width/2, height*0.09);

    stroke(255,21,170);
    line((width/10)*(3+coluna[1]), (height/5)*(1+linha[1]), (width/10)*(4+coluna[1]), (height/5)*(1+linha[1]));
    line((width/10)*(3+coluna[1]), (height/5)*(2+linha[1]),(width/10)*(4+coluna[1]), (height/5)*(2+linha[1]));
    line((width/10)*(3+coluna[1]), (height/5)*(1+linha[1]), (width/10)*(3+coluna[1]), (height/5)*(2+linha[1]));
    line((width/10)*(4+coluna[1]), (height/5)*(1+linha[1]), (width/10)*(4+coluna[1]), (height/5)*(2+linha[1]));

    if(instrument_list[1]!=null){
      player_number = 2;
      if(!tocarPressed){
       okButton.show(); 
      }
    }

    if(!tocarPressed){
      noStroke();
      fill(195,104,0);
      text(instrument_list[2], width/2, height*0.15);

      stroke(195,104,0);
      line((width/10)*(3+coluna[2]), (height/5)*(1+linha[2]), (width/10)*(4+coluna[2]), (height/5)*(1+linha[2]));
      line((width/10)*(3+coluna[2]), (height/5)*(2+linha[2]),(width/10)*(4+coluna[2]), (height/5)*(2+linha[2]));
      line((width/10)*(3+coluna[2]), (height/5)*(1+linha[2]), (width/10)*(3+coluna[2]), (height/5)*(2+linha[2]));
      line((width/10)*(4+coluna[2]), (height/5)*(1+linha[2]), (width/10)*(4+coluna[2]), (height/5)*(2+linha[2]));
    
      if(instrument_list[2]!=null){
        player_number = 3;
      }
   }
  }
}

function setHighlightPosition(c, l){
  if(solo_player){
    if(coluna[-1]!=c && linha[-1]!=l){
      coluna.push(c);
      linha.push(l);
    }
  }
  else{
      coluna.push(c);
      linha.push(l);
  }
  shiftable = true;
}

function checkInstrument(){
  if(last_instrument == ""){
    last_instrument = instrument_list[0];
  }
  else{
    coluna.shift();
    linha.shift();
    instrument_list.shift();
    last_instrument = instrument_list[0];
  }
}

function tocarConjunto(){
  player2_drag.show();
  if(player_number == 3){
    player3_drag.show();
  }
  tocarPressed = true;
  okButton.hide();
}
/*******************************
 * 
 * ALTERAR O INSTUMENTO 
 * 
 */

//TODO: CRIAR UM ARRAY PARA PASSAR O NOME DOS INSTRUMENTOS
 function change_instrument(instrumento,name,x,y){
  setHighlightPosition(x,y);
  instrument_list.push(name);
  //instrument_list_num.push(instrumento);

  console.log("Alterado para: " + instrumento);
  selecionado = instrumento;
  console.log(selecionado);
  port.ch(0).program(instrumento);

}

/***********************************
*     
* NOTAS           
*                        
*/

//Funçao que toca a nota do instrumento
function doNote(channel,nota,instrumento){
  console.log("Tocando: c-> " + channel +" n-> " +nota +" I: " +instrumento);
  port.ch(channel).program(instrumento);
  notaselecionada=nota;
  port.noteOn(channel, nota, 127);
}

//Funçao que para a nota qd o touch acaba
function stopNote(channel, nota){
  console.log("Ended5: " + "c: "+channel +" n: " + nota);
  notaselecionada = nota;
  port.noteOff(channel,nota,127);
}




/***********************************
*     
* NOTAS           
*                        
*/
/*
function doNote(){
  if(selecionado != null){
    note.push("DO");

    console.log("Playing note: do on " + selecionado);
    notaselecionada=60;
    port.noteOn(0, 60, 127)

    if(instrument_list[0] == "Saxofone"){
      notex.push(windowWidth/2.75);
      notey.push(windowHeight/3.4);
      dirx.push(random(-0.5,0.5));
    }
  }
}

function reNote(){
  if(selecionado != null){
    note.push("RE");

    console.log("Playing note: re on " + selecionado);
    notaselecionada=62;
    port.noteOn(0, 62, 127);

    if(instrument_list[0] == "Saxofone"){
      notex.push(windowWidth/2.75);
      notey.push(windowHeight/3.4);
      dirx.push(random(-1,1));
    }
  }
}


function miNote(){
  if(selecionado != null){
    note.push("MI");

    console.log("Playing note: mi on " + selecionado);
    notaselecionada=64;
    port.noteOn(0, 64, 127)

    if(instrument_list[0] == "Saxofone"){
      notex.push(windowWidth/2.75);
      notey.push(windowHeight/3.4);
      dirx.push(random(-1,1));
    }
  }
  
}

function faNote(){
  if(selecionado != null){
    note.push("FA");

    console.log("Playing note: fa on " + selecionado);
    port.noteOn(0, 65, 127)
    notaselecionada=65;

    if(instrument_list[0] == "Saxofone"){
      notex.push(windowWidth/2.75);
      notey.push(windowHeight/3.4);
      dirx.push(random(-1,1));
    }
  }
}

function solNote(){
  if(selecionado != null){
    note.push("SOL");

    console.log("Playing note: sol on " + selecionado);
    port.noteOn(0, 67, 127)
    notaselecionada=67;

    if(instrument_list[0] == "Saxofone"){
      notex.push(windowWidth/2.75);
      notey.push(windowHeight/3.4);
      dirx.push(random(-1,1));
    }
  }
}

function laNote(){
  if(selecionado != null){
    note.push("LA");

    console.log("Playing note: la on " + selecionado);
    port.noteOn(0, 69, 127)
    notaselecionada=69;

    if(instrument_list[0] == "Saxofone"){
      notex.push(windowWidth/2.75);
      notey.push(windowHeight/3.4);
      dirx.push(random(-1,1));
    }
  }
}
function siNote(){
  if(selecionado != null){
    note.push("SI");

    console.log("Playing note: si on " + selecionado);
    port.noteOn(0, 71, 127)
    notaselecionada=71;

    if(instrument_list[0] == "Saxofone"){
      notex.push(windowWidth/2.75);
      notey.push(windowHeight/3.4);
      dirx.push(random(-1,1));
    }
  }
}
function do2Note(){
  if(selecionado != null){
    note.push("DO");

    console.log("Playing note: do2 on " + selecionado);
    port.noteOn(0, 72, 127)
    notaselecionada=72;

    if(instrument_list[0] == "Saxofone"){
      notex.push(windowWidth/2.75);
      notey.push(windowHeight/3.4);
      dirx.push(random(-1,1));
    }
  }
}

function touchEnded(){
  console.log("Ended5");
  if(notaselecionada!=null){
  port.noteOff(0,notaselecionada,127);
  }
}
*/
