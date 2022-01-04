let note = [];
let count = 0;
let i=98;
let selecionado = null;
var port;
let coluna=[];
let linha=[];
let last_instrument = "";
let notex = [];
let notey = [];
let dirx = [];
let solo = 1;
let player_number = 1;
let shiftable = false;
let notaselecionada;

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

  print("Atualizado");
  imgplayer1 = loadImage("images/oboe.png");
  instrument_list = JSON.parse(localStorage.instrumentos);
  for (let i=0;i<instrument_list.length;i++){
      print("Instrumentos: "+instrument_list[i]);
  }
 
  
  let player1 = new MusicalNote('English Horn',100,100,0);
  let player2= new MusicalNote('Marimba',200,100,1);
  //player1.notes();
  player1.doButton.mousePressed(function() {doNote(1,60);});
  player1.reButton.mousePressed(function() {doNote(1,62);});
  player1.miButton.mousePressed(function() {doNote(1,64);});
  player1.faButton.mousePressed(function() {doNote(1,65);});
  player1.solButton.mousePressed(function() {doNote(1,67);});
  player1.laButton.mousePressed(function() {doNote(1,69);});
  player1.siButton.mousePressed(function() {doNote(1,71);});
  player1.do2Button.mousePressed(function() {doNote(1,72);});
 // player2.notes();

  player2.doButton.mousePressed(function() {doNote(2,60);});
  player2.reButton.mousePressed(function() {doNote(2,62);});
  player2.miButton.mousePressed(function() {doNote(2,64);});
  player2.faButton.mousePressed(function() {doNote(2,65);});
  player2.solButton.mousePressed(function() {doNote(2,67);});
  player2.laButton.mousePressed(function() {doNote(2,69);});
  player2.siButton.mousePressed(function() {doNote(2,71);});
  player2.do2Button.mousePressed(function() {doNote(2,72);});

 /* soloButton = createButton('Tocar a Solo');
  soloButton.position(windowWidth*0.75, windowHeight* 0.10);
  soloButton.addClass('button');
  soloButton.style('border', '1px solid #243F8D');
  soloButton.style('background-color', col);
  soloButton.hide();
  soloButton.mousePressed(switchButton);
  soloButton.touchStarted(switchButton);


  doButton = createButton('DÓ');
  doButton.position(windowWidth/10 - doButton.width*2,windowHeight*0.7);
  doButton.addClass('note_button');
  doButton.style('border', '1px solid #243F8D');
  doButton.style('background-color', col);
  doButton.mousePressed(doNote);
  doButton.touchStarted(doNote);

  reButton = createButton('RÉ');
  reButton.position(windowWidth/10,windowHeight*0.7);
  reButton.addClass('note_button');
  reButton.style('border', '1px solid #243F8D');
  reButton.style('background-color', col);
  reButton.mousePressed(reNote);
  reButton.touchStarted(reNote);

  miButton = createButton('MI');
  miButton.position(windowWidth/10 + doButton.width*2,windowHeight*0.7);
  miButton.addClass('note_button');
  miButton.style('border', '1px solid #243F8D');
  miButton.style('background-color', col);
  miButton.mousePressed(miNote);
  miButton.touchStarted(miNote);

  faButton = createButton('FÁ');
  faButton.position(windowWidth/10 + doButton.width*4,windowHeight*0.7);
  faButton.addClass('note_button');
  faButton.style('border', '1px solid #243F8D');
  faButton.style('background-color', col);
  faButton.mousePressed(faNote);
  faButton.touchStarted(faNote);

  solButton = createButton('SOL');
  solButton.position(windowWidth/10 + doButton.width*6,windowHeight*0.7);
  solButton.addClass('note_button');
  solButton.style('border', '1px solid #243F8D');
  solButton.style('background-color', col);
  solButton.mousePressed(solNote);
  solButton.touchStarted(solNote);

  laButton = createButton('LÁ');
  laButton.position(windowWidth/10 + doButton.width*8,windowHeight*0.7);
  laButton.addClass('note_button');
  laButton.style('border', '1px solid #243F8D');
  laButton.style('background-color', col);
  laButton.mousePressed(laNote);
  laButton.touchStarted(laNote);

  siButton = createButton('SI');
  siButton.position(windowWidth/10 + doButton.width*10,windowHeight*0.7);
  siButton.addClass('note_button');
  siButton.style('border', '1px solid #243F8D');
  siButton.style('background-color', col);
  siButton.mousePressed(siNote);
  siButton.touchStarted(siNote);

  do2Button = createButton('DÓ');
  do2Button.position(windowWidth/10 + doButton.width*12,windowHeight*0.7);
  do2Button.addClass('note_button');
  do2Button.style('border', '1px solid #243F8D');
  do2Button.style('background-color', col);
  do2Button.mousePressed(do2Note);
  do2Button.touchStarted(do2Note);
*/


}

function doNote(channel,nota){
  notaselecionada=nota;
  port.noteOn(channel, nota, 127);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function draw() {
  background(bg);
  
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
    solo = 0;
    player_number = 3;

    let title = createElement('h', 'Selecione os Instrumentos');
    title.addClass('selectInstrument')
    title.position(windowWidth * 0.40 ,windowHeight* 0.03);
  }
  else{
    conjuntoButton.show();
    okButton.hide();
    soloButton.hide();
    solo = 1;
    player_number = 1;
  }
}
/*
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
}*/






/*
function TubaI(instrumento){
  setHighlightPosition(3,1);

  instrument_list.push("Tuba");
 
  console.log("Alterado para tuba");
  selecionado = 58;
  port.ch(0).program(selecionado);
}
*/

/***********************************
*     
* NOTAS           
*                        
*/
/*
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
*/
function touchEnded(){
  console.log("Ended5");
  if(notaselecionada!=null){
  port.noteOff(0,notaselecionada,127);
  }
}