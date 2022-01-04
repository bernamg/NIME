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
 
  
  let player1 = new MusicalNote('Oboe',100,100,0);
  let player2= new MusicalNote('Marimba',200,100,1);
  //player1.notes();
  player1.doButton.mousePressed(function() {doNote(1,60);});
  player1.doButton.touchStarted(function() {doNote(1,60);});

  player1.reButton.mousePressed(function() {doNote(1,62);});
  player1.reButton.touchStarted(function() {doNote(1,60);});

  player1.miButton.mousePressed(function() {doNote(1,64);});
  player1.miButton.touchStarted(function() {doNote(1,60);});

  player1.faButton.mousePressed(function() {doNote(1,65);});
  player1.faButton.touchStarted(function() {doNote(1,60);});

  player1.solButton.mousePressed(function() {doNote(1,67);});
  player1.solButton.touchStarted(function() {doNote(1,60);});

  player1.laButton.mousePressed(function() {doNote(1,69);});
  player1.laButton.touchStarted(function() {doNote(1,60);});
  
  player1.siButton.mousePressed(function() {doNote(1,71);});
  player1.siButton.touchStarted(function() {doNote(1,60);});
  
  player1.do2Button.mousePressed(function() {doNote(1,72);});
  player1.do2Button.touchStarted(function() {doNote(1,60);});
 // player2.notes();

 player2.doButton.mousePressed(function() {doNote(2,60);});
 player2.doButton.touchStarted(function() {doNote(2,60);});

 player2.reButton.mousePressed(function() {doNote(2,62);});
 player2.reButton.touchStarted(function() {doNote(2,60);});

 player2.miButton.mousePressed(function() {doNote(2,64);});
 player2.miButton.touchStarted(function() {doNote(2,60);});

 player2.faButton.mousePressed(function() {doNote(2,65);});
 player2.faButton.touchStarted(function() {doNote(2,60);});

 player2.solButton.mousePressed(function() {doNote(2,67);});
 player2.solButton.touchStarted(function() {doNote(2,60);});

 player2.laButton.mousePressed(function() {doNote(2,69);});
 player2.laButton.touchStarted(function() {doNote(2,60);});
 
 player2.siButton.mousePressed(function() {doNote(2,71);});
 player2.siButton.touchStarted(function() {doNote(2,60);});
 
 player2.do2Button.mousePressed(function() {doNote(2,72);});
 player2.do2Button.touchStarted(function() {doNote(2,60);});

 
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


function touchEnded(){
  console.log("Ended5");
  if(notaselecionada!=null){
  port.noteOff(0,notaselecionada,127);
  }
}