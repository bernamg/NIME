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

let dragging = false;
let offsetX, offsetY, onsetX, onsetY;
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

  div = createDiv('<div class = "container"><button class = "note_button" id = "do" type="button">DÓ</button><button class = "note_button" id = "re" type="button">RÉ</button><button class = "note_button" id = "mi" type="button">MI</button><button class = "note_button" id = "fa" type="button">FÁ</button><button class = "note_button" id = "sol" type="button">SOL</button><button class = "note_button" id = "la" type="button">LÁ</button><button class = "note_button" id = "si" type="button">SI</button><button class = "note_button" id = "do2" type="button">DÓ</button></div>').mousePressed(dragDiv).touchStarted(dragDiv).mouseReleased(dropDiv).touchEnded(dropDiv);
  div.position(20, 500);

  let doButton = select('#do');
  let reButton = select('#re');
  let miButton = select('#mi');
  let faButton = select('#fa');
  let solButton = select('#sol');
  let laButton = select('#la');
  let siButton = select('#si');
  let do2Button = select('#do2');

  doButton.mousePressed(function(){doNote(0,60, selecionado);});
  doButton.touchStarted(function(){doNote(0,60, selecionado);});
  doButton.mouseReleased(function() {stopNote(0,60,);});
  doButton.touchEnded(function() {stopNote(0,60);});

  reButton.mousePressed(function(){doNote(0,62, selecionado);});
  reButton.touchStarted(function(){doNote(0,62, selecionado);});
  reButton.mouseReleased(function() {stopNote(0,62);});
  reButton.touchEnded(function() {stopNote(0,62);});

  miButton.mousePressed(function(){doNote(0,64, selecionado);});
  miButton.touchStarted(function(){doNote(0,64, selecionado);});
  miButton.mouseReleased(function() {stopNote(0,64,);});
  miButton.touchEnded(function() {stopNote(0,64);});

  faButton.mousePressed(function(){doNote(0,65, selecionado);});
  faButton.touchStarted(function(){doNote(0,65, selecionado);});
  faButton.mouseReleased(function() {stopNote(0,65,);});
  faButton.touchEnded(function() {stopNote(0,65);});

  solButton.mousePressed(function(){doNote(0,67, selecionado);});
  solButton.touchStarted(function(){doNote(0,67, selecionado);});
  solButton.mouseReleased(function() {stopNote(0,67,);});
  solButton.touchEnded(function() {stopNote(0,67);});

  laButton.mousePressed(function(){doNote(0,69, selecionado);});
  laButton.touchStarted(function(){doNote(0,69, selecionado);});
  laButton.mouseReleased(function() {stopNote(0,69,);});
  laButton.touchEnded(function() {stopNote(0,69);});

  siButton.mousePressed(function(){doNote(0,71, selecionado);});
  siButton.touchStarted(function(){doNote(0,71, selecionado);});
  siButton.mouseReleased(function() {stopNote(0,71,);});
  siButton.touchEnded(function() {stopNote(0,71);});

  do2Button.mousePressed(function(){doNote(0,72, selecionado);});
  do2Button.touchStarted(function(){doNote(0,72, selecionado);});
  do2Button.mouseReleased(function() {stopNote(0,72,);});
  do2Button.touchEnded(function() {stopNote(0,72);});

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

    if ( newX > canvasWidth ) {
        newX = canvasWidth - currentPostIt.width;
    } 
    if ( newX < 0 ) {
        newX = 0;
    }

    newY = mouseY + offsetY;

    if ( newY > canvasHeight ) {
      newY = canvasHeight - currentPostIt.height;
    } 
    if ( newY < 0 ) {
      newY = 0;
    }

    div.position(newX, newY);
  }
}

function dropDiv(){
  dragging = false;
}

function dragDiv(){
  dragging = true;        
  offsetX = div.x - mouseX;
  offsetY = div.y - mouseY;
  onsetX = div.width + offsetX;
  onsetY = div.height + offsetY;
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
  else{
    conjuntoButton.show();
    okButton.hide();
    soloButton.hide();
    solo = 1;
    solo_player = true;
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
      okButton.show();
    }

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
  localStorage.setItem('instrumentos',JSON.stringify(instrument_list));
  localStorage.setItem('player_number',JSON.stringify(player_number));
  window.location.href="conjunto.html";
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
