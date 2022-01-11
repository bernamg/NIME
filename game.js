let note = [];
let i=98;
let notaselecionada = null
var port;
let instrument_list = [];
let notex = [];
let notey = [];
let dirx = [];
let solo_player = true;
let player_number = 0;
let div;
let familyDiv;
let soproDiv;
let cordasDiv;
let percursaoDiv;
let left_arrow;
let right_arrow;
let current_familia = "Sopro";
let Instrument_containers_all = [];
let Instrument_containers_list = [];
let dragging = false;
let offsetX, offsetY;
let currentDragDiv;
let cenario_check = [false,false,false];

//let sopro_names =['AltoSax', 'SopranoSax','BaritonoSax', 'Oboe', 'Fagote', 'Trompete', 'Trombone', 'Tuba'];
let sopro =[[65,'Saxofone Alto'],[64,'Saxofone Soprano'] ,[67,'Saxofone Baritono'],[69,'Oboe'],[70,'Fagote'],[56,'Trompote'],[57,'Trombone'],[58,'Tuba']];
let cordas = [[24,'Guitarra Acustica'],[27,'Guitarra Elétrica'],[40,'Violino'],[42,'Violoncelo'],[46,'Harpa'],[104,'Sitar'],[105,'Banjo'],[107,'Koto']];
let percursao = [[24,'Guitarra Acustica'],[27,'Guitarra Elétrica'],[40,'Violino'],[42,'Violoncelo'],[46,'Harpa'],[104,'Sitar'],[105,'Banjo'],[107,'Koto']];

cenario_atual = sopro;

function preload(){
  bg = loadImage('images/background.jpg');
  font = loadFont('font/titlespace.otf');
  col = color(36, 63, 141, 100);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  windowResized();
  angleMode(DEGREES);

  JZZ.synth.Tiny.register('Web Audio');
  port = JZZ().openMidiOut();

 
  familyDiv = createDiv('<div class = "family_container"><button type="button" id="left"><img src="images/left_arrow.png" width="40" height="50"/></button><button class="button" type="button" id="familia">Sopro</button><button type="button" id="right"><img src="images/right_arrow.png" width="40" height="50"/></button></div>');
  familyDiv.position(windowWidth*0.5  - windowWidth*0.1, windowHeight* 0.30);

  soproDiv = createDiv('<div class = "instrument_galeria"><div class = "instrument_container" id = "sopro_container1" ><image src="images/'+sopro[0][0]+'.png"/></div><div class = "instrument_container" id = "sopro_container2" ><image src="images/'+sopro[1][0]+'.png"/></div><div class = "instrument_container" id = "sopro_container3" ><image src="images/'+sopro[2][0]+'.png"/></div><div class = "instrument_container" id = "sopro_container4" ><image src="images/'+sopro[3][0]+'.png"/></div><div class = "instrument_container" id = "sopro_container5" ><image src="images/'+sopro[4][0]+'.png"/></div><div class = "instrument_container" id = "sopro_container6" ><image src="images/'+sopro[5][0]+'.png"/></div><div class = "instrument_container" id = "sopro_container7" ><image src="images/'+sopro[6][0]+'.png"/></div><div class = "instrument_container" id = "sopro_container8" ><image src="images/'+sopro[7][0]+'.png"/></div></div>');
  soproDiv.position((windowWidth/2) - ((((windowHeight*0.8)*0.21*4)+22.5)/2), windowHeight/2 - windowHeight*0.1);

  cordasDiv = createDiv('<div class = "instrument_galeria"><div class = "instrument_container" id = "cordas_container1" ><image src="images/'+cordas[0][0]+'.png"/></div><div class = "instrument_container" id = "cordas_container2" ><image src="images/'+cordas[1][0]+'.png"/></div><div class = "instrument_container" id = "cordas_container3" ><image src="images/'+cordas[2][0]+'.png"/></div><div class = "instrument_container" id = "cordas_container4" ><image src="images/'+cordas[3][0]+'.png"/></div><div class = "instrument_container" id = "cordas_container5" ><image src="images/'+cordas[4][0]+'.png"/></div><div class = "instrument_container" id = "cordas_container6" ><image src="images/'+cordas[5][0]+'.png"/></div><div class = "instrument_container" id = "cordas_container7" ><image src="images/'+cordas[6][0]+'.png"/></div><div class = "instrument_container" id = "cordas_container8" ><image src="images/'+cordas[7][0]+'.png"/></div></div>');
  cordasDiv.position((windowWidth/2) - ((((windowHeight*0.8)*0.21*4)+22.5)/2), windowHeight/2 - windowHeight*0.1);
  cordasDiv.hide();

  percursaoDiv = createDiv('<div class = "instrument_galeria"><div class = "instrument_container" id = "percursao_container1" ><image src="images/'+percursao[0][0]+'.png"/></div><div class = "instrument_container" id = "percursao_container2" ><image src="images/'+percursao[1][0]+'.png"/></div><div class = "instrument_container" id = "percursao_container3" ><image src="images/'+percursao[2][0]+'.png"/></div><div class = "instrument_container" id = "percursao_container4" ><image src="images/'+percursao[3][0]+'.png"/></div><div class = "instrument_container" id = "percursao_container5" ><image src="images/'+percursao[4][0]+'.png"/></div><div class = "instrument_container" id = "percursao_container6" ><image src="images/'+percursao[5][0]+'.png"/></div><div class = "instrument_container" id = "percursao_container7" ><image src="images/'+percursao[6][0]+'.png"/></div><div class = "instrument_container" id = "percursao_container8" ><image src="images/'+percursao[7][0]+'.png"/></div></div>');
  percursaoDiv.position((windowWidth/2) - ((((windowHeight*0.8)*0.21*4)+22.5)/2), windowHeight/2 - windowHeight*0.1);
  percursaoDiv.hide();

  left_arrow = select('#left');
  left_arrow.touchStarted(function(){ switchFamily(true);
  //left_arrow.mousePressed(function(){ switchFamily(true)});
  print("touchstarted linha 65")});

  right_arrow = select('#right');
  right_arrow.touchStarted(function(){ switchFamily(false);
  //right_arrow.mousePressed(function(){ switchFamily(false)});
  print("touchstarted linha 70");});

  conjuntoButton = createButton('Tocar em Conjunto');
  conjuntoButton.position(windowWidth*0.5 - windowWidth*0.1, windowHeight* 0.15);
  conjuntoButton.addClass('button');
  conjuntoButton.style('border', '1px solid #243F8D');
  conjuntoButton.style('background-color', col);
  conjuntoButton.mousePressed(switchButton);
  conjuntoButton.touchStarted(switchButton);
  conjuntoButton.touchEnded(switchButton);


  soloButton = createButton('Tocar a Solo');
  soloButton.position(windowWidth*0.5 - windowWidth*0.1, windowHeight* 0.15);
  soloButton.addClass('button');
  soloButton.style('border', '1px solid #243F8D');
  soloButton.style('background-color', col);
  soloButton.hide();
  soloButton.mousePressed(switchButton);
  soloButton.touchStarted(switchButton);
  soloButton.touchEnded(switchButton);

  sairButton = createButton('Sair');
  sairButton.position(windowWidth*0.5 - windowWidth*0.025, windowHeight* 0.05);
  sairButton.addClass('sair_button');
  sairButton.style('border', '1px solid #243F8D');
  sairButton.style('background-color', col);
  sairButton.mousePressed(sair);
  sairButton.touchStarted(sair);

  player1 = new MusicalNote("player1", instrument_list[0],100,100,10,200,1);
  player2= new MusicalNote("player2",instrument_list[1],200,100,10,400,2);
  player3 = new MusicalNote("player3",instrument_list[2],300,100,10,400,1);

  push();
  player1_drag = player1.notes();
  player1_drag.touchMoved(function(){ dragDiv(player1_drag)}).touchEnded(dropDiv);
  player1_drag.position(windowWidth/2 - (((windowWidth*0.035*8)+46)/2),650);
  pop();

  push();
  player2_drag = player2.notes();
  player2_drag.touchMoved(function(){ dragDiv(player2_drag)}).touchEnded(dropDiv);
  player2_drag.style('transform', 'rotate(90deg)');
  player2_drag.position(0,windowHeight/2 + 7.5);
  player2_drag.hide();
  pop();

  push();
  player3_drag = player3.notes();
  player3_drag.touchMoved(function(){ dragDiv(player1_drag)}).touchEnded(dropDiv);
  player3_drag.style('transform', 'rotate(-90deg)');
  player3_drag.position(870, windowHeight/2 - 62);
  player3_drag.hide();
  pop();

  //player1.doButton.mousePressed(function() {doNote(1,60,player1.instrumento);});
  player1.doButton.touchStarted(function() {doNote(1,60,player1.instrumento);});
 // player1.doButton.mouseReleased(function() {stopNote(1,60,);});
  player1.doButton.touchEnded(function() {stopNote(1,60);});

  //player1.reButton.mousePressed(function() {doNote(1,62,player1.instrumento);});
  player1.reButton.touchStarted(function() {doNote(1,62,player1.instrumento);});
 // player1.reButton.mouseReleased(function() {stopNote(1,62);});
  player1.reButton.touchEnded(function() {stopNote(1,62);});

  //player1.miButton.mousePressed(function() {doNote(1,64,player1.instrumento);});
  player1.miButton.touchStarted(function() {doNote(1,64,player1.instrumento);});
  //player1.miButton.mouseReleased(function() {stopNote(1,64);});
  player1.miButton.touchEnded(function() {stopNote(1,64);});

  //player1.faButton.mousePressed(function() {doNote(1,65,player1.instrumento);});
  player1.faButton.touchStarted(function() {doNote(1,65,player1.instrumento);});
 // player1.faButton.mouseReleased(function() {stopNote(1,65);});
  player1.faButton.touchEnded(function() {stopNote(1,65);});

  //player1.solButton.mousePressed(function() {doNote(1,67,player1.instrumento);});
  player1.solButton.touchStarted(function() {doNote(1,67,player1.instrumento);});
 // player1.solButton.mouseReleased(function() {stopNote(1,67);});
  player1.solButton.touchEnded(function() {stopNote(1,67);});

 // player1.laButton.mousePressed(function() {doNote(1,69,player1.instrumento);});
  player1.laButton.touchStarted(function() {doNote(1,69,player1.instrumento);});
 // player1.laButton.mouseReleased(function() {stopNote(1,69);});
  player1.laButton.touchEnded(function() {stopNote(1,69);});
  
  //player1.siButton.mousePressed(function() {doNote(1,71,player1.instrumento);});
  player1.siButton.touchStarted(function() {doNote(1,71,player1.instrumento);});
 // player1.siButton.mouseReleased(function() {stopNote(1,71);});
  player1.siButton.touchEnded(function() {stopNote(1,71);});
  
 // player1.do2Button.mousePressed(function() {doNote(1,72,player1.instrumento);});
  player1.do2Button.touchStarted(function() {doNote(1,72,player1.instrumento);});
 // player1.do2Button.mouseReleased(function() {stopNote(1,72);});
  player1.do2Button.touchEnded(function() {stopNote(1,72);});


  //PLAYER 2
 // player2.doButton.mousePressed(function() {doNote(2,60,player2.instrumento);});
  player2.doButton.touchStarted(function() {doNote(2,60,player2.instrumento);});
  //player2.doButton.mouseReleased(function() {stopNote(2,60);});
  player2.doButton.touchEnded(function() {stopNote(2,60);});

 // player2.reButton.mousePressed(function() {doNote(2,62,player2.instrumento);});
  player2.reButton.touchStarted(function() {doNote(2,62,player2.instrumento);});
 // player2.reButton.mouseReleased(function() {stopNote(2,62);});
  player2.reButton.touchEnded(function() {stopNote(2,62);});

 // player2.miButton.mousePressed(function() {doNote(2,64,player2.instrumento);});
  player2.miButton.touchStarted(function() {doNote(2,64,player2.instrumento);});
 // player2.miButton.mouseReleased(function() {stopNote(2,64);});
  player2.miButton.touchEnded(function() {stopNote(2,64);});

 // player2.faButton.mousePressed(function() {doNote(2,65,player2.instrumento);});
  player2.faButton.touchStarted(function() {doNote(2,65,player2.instrumento);});
 // player2.faButton.mouseReleased(function() {stopNote(2,65);});
  player2.faButton.touchEnded(function() {stopNote(2,65);});

 // player2.solButton.mousePressed(function() {doNote(2,67,player2.instrumento);});
  player2.solButton.touchStarted(function() {doNote(2,67,player2.instrumento);});
 // player2.solButton.mouseReleased(function() {stopNote(2,67);});
  player2.solButton.touchEnded(function() {stopNote(2,67);});

 // player2.laButton.mousePressed(function() {doNote(2,69,player2.instrumento);});
  player2.laButton.touchStarted(function() {doNote(2,69,player2.instrumento);});
 // player2.laButton.mouseReleased(function() {stopNote(2,69);});
  player2.laButton.touchEnded(function() {stopNote(2,69);});
  
 // player2.siButton.mousePressed(function() {doNote(2,71,player2.instrumento);});
  player2.siButton.touchStarted(function() {doNote(2,71,player2.instrumento);});
 // player2.siButton.mouseReleased(function() {stopNote(2,71);});
  player2.siButton.touchEnded(function() {stopNote(2,71);});
  
 // player2.do2Button.mousePressed(function() {doNote(2,72,player2.instrumento);});
  player2.do2Button.touchStarted(function() {doNote(2,72,player2.instrumento);});
 // player2.do2Button.mouseReleased(function() {stopNote(2,72);});
  player2.do2Button.touchEnded(function() {stopNote(2,72);});

  //PLAYER 3
 // player3.doButton.mousePressed(function() {doNote(3,60, player3.instrumento);});
  player3.doButton.touchStarted(function() {doNote(3,60, player3.instrumento);});
 // player3.doButton.mouseReleased(function() {stopNote(3,60);});
  player3.doButton.touchEnded(function() {stopNote(3,60);});

 // player3.reButton.mousePressed(function() {doNote(3,62, player3.instrumento);});
  player3.reButton.touchStarted(function() {doNote(3,62, player3.instrumento);});
 // player3.reButton.mouseReleased(function() {stopNote(3,62);});
  player3.reButton.touchEnded(function() {stopNote(3,62);});

 // player3.miButton.mousePressed(function() {doNote(3,64, player3.instrumento);});
  player3.miButton.touchStarted(function() {doNote(3,64, player3.instrumento);});
 // player3.miButton.mouseReleased(function() {stopNote(3,64);});
  player3.miButton.touchEnded(function() {stopNote(3,64);});

 // player3.faButton.mousePressed(function() {doNote(3,65, player3.instrumento);});
  player3.faButton.touchStarted(function() {doNote(3,65, player3.instrumento);});
 // player3.faButton.mouseReleased(function() {stopNote(3,65);});
  player3.faButton.touchEnded(function() {stopNote(3,65);});

  //player3.solButton.mousePressed(function() {doNote(3,67, player3.instrumento);});
  player3.solButton.touchStarted(function() {doNote(3,67, player3.instrumento);});
 // player3.solButton.mouseReleased(function() {stopNote(3,67);});
  player3.solButton.touchEnded(function() {stopNote(3,67);});

  //player3.laButton.mousePressed(function() {doNote(3,69, player3.instrumento);});
  player3.laButton.touchStarted(function() {doNote(3,69, player3.instrumento);});
  //player3.laButton.mouseReleased(function() {stopNote(3,69);});
  player3.laButton.touchEnded(function() {stopNote(3,69);});
  
  //player3.siButton.mousePressed(function() {doNote(3,71, player3.instrumento);});
  player3.siButton.touchStarted(function() {doNote(3,71, player3.instrumento);});
  //player3.siButton.mouseReleased(function() {stopNote(3,71);});
  player3.siButton.touchEnded(function() {stopNote(3,71);});
  
  //player3.do2Button.mousePressed(function() {doNote(3,72, player3.instrumento);});
  player3.do2Button.touchStarted(function() {doNote(3,72, player3.instrumento);});
 // player3.do2Button.mouseReleased(function() {stopNote(3,72);});
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

  setInstrumentFamily();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function draw() {
  background(bg);
  
  if(notex[-1]!=0 && notey[-1]!=0){
    animatedNote();
  }

  if(dragging){

    newX = mouseX + offsetX;
    newY = mouseY + offsetY;

    currentDragDiv.position(newX, newY);
  }

  if(instrument_list[0]!=null){
    fill(105,138,13);
    textSize(40);
    textFont(font);
    textAlign(CENTER, CENTER);
    text(instrument_list[0], width/2, 650 - 30);
  }

  if(instrument_list[1]!=null){
    push();
    rotate(90);
    fill(255,21,170);
    text(instrument_list[1], windowHeight/2,-windowWidth/2 + ((((windowHeight*0.8)*0.21*4)+22.5)/2) + 40);
    player2_drag.show();
    player2_drag.style('animation','player2ShowAnimation 1s linear');
    pop();
  }

  if(instrument_list[2]!=null){
    push();
    rotate(-90);
    fill(195,104,0);
    text(instrument_list[2], -windowHeight/2, windowWidth/2 + ((((windowHeight*0.8)*0.21*4)+22.5)/2) + 40);
    player3_drag.show();
    player3_drag.style('animation','player3ShowAnimation 1s linear');
    pop();
  }
  
  //line(windowWidth/2,0,windowWidth/2,windowHeight);
  //line(0,windowHeight/2,windowWidth,windowHeight/2);
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
  highlightSelected(0);
  instrument_list = [];
  Instrument_containers_all = [];
  Instrument_containers_list = [];
  player_number = 0;
  if(left){
    if(current_familia == "Sopro"){
      current_familia = "Cordas";
      cenario_atual = cordas;
      cordasDiv.show();
      percursaoDiv.hide();
      soproDiv.hide();
      print("esquerda sopro -> cordas");
    }
    else if(current_familia == "Cordas"){
      current_familia = "Percursao";
      cenario_atual = percursao;
      percursaoDiv.show();
      cordasDiv.hide();
      soproDiv.hide();
      print("esquerda cordas -> percurssão");
    }
    else{
      current_familia = "Sopro";
      cenario_atual = sopro;
      soproDiv.show();
      cordasDiv.hide();
      percursaoDiv.hide();
      print("esquerda percussão -> sopro");
    }
  }
  else{
    if(current_familia == "Sopro"){
      current_familia = "Percursao";
      cenario_atual = percursao;
      percursaoDiv.show();
      cordasDiv.hide();
      soproDiv.hide();
    }
    else if(current_familia == "Percursao"){
      current_familia = "Cordas";
      cenario_atual = cordas;
      cordasDiv.show();
      percursaoDiv.hide();
      soproDiv.hide();
    }
    else{
      current_familia = "Sopro";
      cenario_atual = sopro;
      soproDiv.show();
      cordasDiv.hide();
      percursaoDiv.hide();
    }
  }
  setInstrumentFamily();
  document.getElementById('familia').innerText = current_familia;
}

function switchButton(){
  highlightSelected(0);
  instrument_list = [];
  Instrument_containers_list = [];

  //MODO CONJUNTO
  if(solo_player){
    conjuntoButton.hide();
    soloButton.show();
    solo_player = false;

    /*
    let title = createElement('h', 'Selecione os Instrumentos');
    title.addClass('selectInstrument')
    title.position(windowWidth * 0.40 ,windowHeight* 0.03);
    */
  }
  //MODO SOLO
  else{
    conjuntoButton.show();
    soloButton.hide();
    solo_player = true;
    player2_drag.style('animation','player2HideAnimation 1s forwards');
    player2_drag.position(0,windowHeight/2 + 7.5);
    player3_drag.style('animation','player3HideAnimation 1s forwards');
    player3_drag.position(870, windowHeight/2 - 62);
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

function highlightSelected(InstrumentNum){
  if(Instrument_containers_all[0]!=null){
    for(let i=0; i<cenario_atual.length; i++){
      Instrument_containers_all[i].style("border","3px solid black");
    }
  }

  if(InstrumentNum!=0){
    if(instrument_list[0]!=null){
      Instrument_containers_list[0].style("border","3px solid rgb(105,138,13)");
    }

    if(!solo_player){

      if(instrument_list[1]!=null){
        Instrument_containers_list[1].style("border","3px solid rgb(255,21,170)");
        player_number = 2;

        if(instrument_list[2]!=null){
          Instrument_containers_list[2].style("border","3px solid rgb(195,104,0)");
          player_number = 3;
        }
      }
    }
  }
}

/*******************************
 * 
 * ALTERAR O INSTUMENTO 
 * 
 */

//TODO: CRIAR UM ARRAY PARA PASSAR O NOME DOS INSTRUMENTOS
 function change_instrument(InstrumentNum, instrumento,name,x,y){
  if(solo_player){
    instrument_list.shift();
    Instrument_containers_list.shift();
  }

  if(player_number != 3){
    instrument_list.push(name);
    Instrument_containers_list.push(InstrumentNum);
    //instrument_list_num.push(instrumento);

    //console.log("Alterado para: " + instrumento);
    port.ch(0).program(instrumento);
    highlightSelected(InstrumentNum);

    player1.setInstrument(instrument_list[0]);
    if(instrument_list[1]!=null){
      player2.setInstrument(instrument_list[1]);
      if(instrument_list[2]!=null){
        player3.setInstrument(instrument_list[2]);
      }
    }
  }
}

function setInstrumentFamily(){

  //%%%%%%%%%%%%%%INSTRUMENT1%%%%%%%%%%%%%%
  if(cenario_atual==sopro)
    Instrument1 = select('#sopro_container1');
  else if(cenario_atual==percursao)
    Instrument1 = select('#percursao_container1');
  else
    Instrument1 = select('#cordas_container1');

  //%%%%%%%%%%%%%%INSTRUMENT2%%%%%%%%%%%%%%
  if(cenario_atual==sopro)
    Instrument2 = select('#sopro_container2');
  else if(cenario_atual==percursao)
    Instrument2 = select('#percursao_container2');
  else
    Instrument2 = select('#cordas_container2');

  //%%%%%%%%%%%%%%INSTRUMENT3%%%%%%%%%%%%%%
  if(cenario_atual==sopro)
    Instrument3 = select('#sopro_container3');
  else if(cenario_atual==percursao)
    Instrument3 = select('#percursao_container3');
  else
    Instrument3 = select('#cordas_container3');

  //%%%%%%%%%%%%%%INSTRUMENT4%%%%%%%%%%%%%%
  if(cenario_atual==sopro)
    Instrument4 = select('#sopro_container4');
  else if(cenario_atual==percursao)
    Instrument4 = select('#percursao_container4');
  else
    Instrument4 = select('#cordas_container4');

  //%%%%%%%%%%%%%%INSTRUMENT5%%%%%%%%%%%%%%
  if(cenario_atual==sopro)
    Instrument5 = select('#sopro_container5');
  else if(cenario_atual==percursao)
    Instrument5 = select('#percursao_container5');
  else
    Instrument5 = select('#cordas_container5');

  //%%%%%%%%%%%%%%INSTRUMENT6%%%%%%%%%%%%%%
  if(cenario_atual==sopro)
    Instrument6 = select('#sopro_container6');
  else if(cenario_atual==percursao)
    Instrument6 = select('#percursao_container6');
  else
    Instrument6 = select('#cordas_container6');

  //%%%%%%%%%%%%%%INSTRUMENT7%%%%%%%%%%%%%%
  if(cenario_atual==sopro)
    Instrument7 = select('#sopro_container7');
  else if(cenario_atual==percursao)
    Instrument7 = select('#percursao_container7');
  else
    Instrument7 = select('#cordas_container7');

  //%%%%%%%%%%%%%%INSTRUMENT8%%%%%%%%%%%%%%
  if(cenario_atual==sopro)
    Instrument8 = select('#sopro_container8');
  else if(cenario_atual==percursao)
    Instrument8 = select('#percursao_container8');
  else
    Instrument8 = select('#cordas_container8');

  Instrument_containers_all.push(Instrument1);
  Instrument_containers_all.push(Instrument2);
  Instrument_containers_all.push(Instrument3);
  Instrument_containers_all.push(Instrument4);
  Instrument_containers_all.push(Instrument5);
  Instrument_containers_all.push(Instrument6);
  Instrument_containers_all.push(Instrument7);
  Instrument_containers_all.push(Instrument8);
  
  if((cenario_atual==sopro && !cenario_check[0]) || (cenario_atual==percursao && !cenario_check[1]) || (cenario_atual==cordas && !cenario_check[2])){
    //Instrument1.mousePressed(function(){ change_instrument(Instrument1, cenario_atual[0][0], cenario_atual[0][1],0,0);});
    Instrument1.touchStarted(function(){ change_instrument(Instrument1, cenario_atual[0][0], cenario_atual[0][1],0,0);});


    //Instrument2.mousePressed(function(){ change_instrument(Instrument2, cenario_atual[1][0], cenario_atual[1][1],1,0);});
    Instrument2.touchStarted(function(){ change_instrument(Instrument2, cenario_atual[1][0], cenario_atual[1][1],1,0);});


    //Instrument3.mousePressed(function(){ change_instrument(Instrument3, cenario_atual[2][0], cenario_atual[2][1],2,0);});
    Instrument3.touchStarted(function(){ change_instrument(Instrument3, cenario_atual[2][0], cenario_atual[2][1],2,0);});


   // Instrument4.mousePressed(function(){ change_instrument(Instrument4, cenario_atual[3][0], cenario_atual[3][1],3,0);});
    Instrument4.touchStarted(function(){ change_instrument(Instrument4, cenario_atual[3][0], cenario_atual[3][1],3,0);});
    

   // Instrument5.mousePressed(function(){ change_instrument(Instrument5, cenario_atual[4][0], cenario_atual[4][1],0,1);});
    Instrument5.touchStarted(function(){ change_instrument(Instrument5, cenario_atual[4][0], cenario_atual[4][1],0,1);});

   // Instrument6.mousePressed(function(){ change_instrument(Instrument6, cenario_atual[5][0], cenario_atual[5][1],1,1);});
    Instrument6.touchStarted(function(){ change_instrument(Instrument6, cenario_atual[5][0], cenario_atual[5][1],1,1);});

    //Instrument7.mousePressed(function(){ change_instrument(Instrument7, cenario_atual[6][0], cenario_atual[6][1],2,1);});
    Instrument7.touchStarted(function(){ change_instrument(Instrument7, cenario_atual[6][0], cenario_atual[6][1],2,1);});

   // Instrument8.mousePressed(function(){ change_instrument(Instrument8, cenario_atual[7][0], cenario_atual[7][1],3,1);});
    Instrument8.touchStarted(function(){ change_instrument(Instrument8, cenario_atual[7][0], cenario_atual[7][1],3,1);});
  }

  if(cenario_atual == sopro)
    cenario_check[0] = true;
  else if(cenario_atual == percursao)
    cenario_check[1] = true;
  else
    cenario_check[2] = true;
}

/***********************************
*     
* NOTAS           
*                        
*/

//Funçao que toca a nota do instrumento
function doNote(channel,nota,instrumento){
  //console.log("Tocando: c-> " + channel +" n-> " +nota +" I: " +instrumento);
  port.ch(channel).program(instrumento);
  notaselecionada=nota;
  port.noteOn(channel, nota, 127);
}

//Funçao que para a nota qd o touch acaba
function stopNote(channel, nota){
  //console.log("Ended5: " + "c: "+channel +" n: " + nota);
  notaselecionada = nota;
  port.noteOff(channel,nota,127);
}

function sair(){
  window.location.href="index.html";
}



