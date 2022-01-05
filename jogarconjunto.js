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
let player1;
let player2;
let player1_drag;
let player2_drag;

let dragging = false;
let offsetX, offsetY, onsetX, onsetY;
let canvasWidth, canvasHeight;
let currentDragDiv;


function preload(){
  bg = loadImage('images/background.jpg');
  font = loadFont('font/titlespace.otf');
  col = color(36, 63, 141, 100);
}

function setup() {
  angleMode(DEGREES);
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
 
  
  player1 = new MusicalNote('imagens/oboe.png',100,100,10,200,0);
  player2= new MusicalNote('images/tuba.png',200,100,10,400,1);

  player1_drag = player1.notes();
  player1_drag.mousePressed(function(){ dragDiv(player1_drag)}).touchStarted(function(){ dragDiv(player1_drag)}).mouseReleased(dropDiv).touchEnded(dropDiv);
  player1_drag.position(400,550);

  player2_drag = player2.notes();
  player2_drag.mousePressed(function(){ dragDiv(player2_drag)}).touchStarted(function(){ dragDiv(player2_drag)}).mouseReleased(dropDiv).touchEnded(dropDiv);
  player2_drag.style('transform', 'rotate(90deg)');
  player2_drag.position(100,700);

  player1.doButton.mousePressed(function() {doNote(1,60);});
  player1.doButton.touchStarted(function() {doNote(1,60);});
  player1.doButton.mouseReleased(function() {stopNote(1,60);});
  player1.doButton.touchEnded(function() {stopNote(1,60);});

  player1.reButton.mousePressed(function() {doNote(1,62);});
  player1.reButton.touchStarted(function() {doNote(1,62);});
  player1.reButton.mouseReleased(function() {stopNote(1,62);});
  player1.reButton.touchEnded(function() {stopNote(1,62);});

  player1.miButton.mousePressed(function() {doNote(1,64);});
  player1.miButton.touchStarted(function() {doNote(1,64);});
  player1.miButton.mouseReleased(function() {stopNote(1,64);});
  player1.miButton.touchEnded(function() {stopNote(1,64);});

  player1.faButton.mousePressed(function() {doNote(1,65);});
  player1.faButton.touchStarted(function() {doNote(1,65);});
  player1.faButton.mouseReleased(function() {stopNote(1,65);});
  player1.faButton.touchEnded(function() {stopNote(1,65);});

  player1.solButton.mousePressed(function() {doNote(1,67);});
  player1.solButton.touchStarted(function() {doNote(1,67);});
  player1.solButton.mouseReleased(function() {stopNote(1,67);});
  player1.solButton.touchEnded(function() {stopNote(1,67);});

  player1.laButton.mousePressed(function() {doNote(1,69);});
  player1.laButton.touchStarted(function() {doNote(1,69);});
  player1.laButton.mouseReleased(function() {stopNote(1,69);});
  player1.laButton.touchEnded(function() {stopNote(1,69);});
  
  player1.siButton.mousePressed(function() {doNote(1,71);});
  player1.siButton.touchStarted(function() {doNote(1,71);});
  player1.siButton.mouseReleased(function() {stopNote(1,71);});
  player1.siButton.touchEnded(function() {stopNote(1,71);});
  
  player1.do2Button.mousePressed(function() {doNote(1,72);});
  player1.do2Button.touchStarted(function() {doNote(1,72);});
  player1.do2Button.mouseReleased(function() {stopNote(1,72);});
  player1.do2Button.touchEnded(function() {stopNote(1,72);});


  //PLAYER 2
  player2.doButton.mousePressed(function() {doNote(2,60);});
  player2.doButton.touchStarted(function() {doNote(2,60);});

  player2.reButton.mousePressed(function() {doNote(2,62);});
  player2.reButton.touchStarted(function() {doNote(2,62);});

  player2.miButton.mousePressed(function() {doNote(2,64);});
  player2.miButton.touchStarted(function() {doNote(2,64);});

  player2.faButton.mousePressed(function() {doNote(2,65);});
  player2.faButton.touchStarted(function() {doNote(2,65);});

  player2.solButton.mousePressed(function() {doNote(2,67);});
  player2.solButton.touchStarted(function() {doNote(2,67);});

  player2.laButton.mousePressed(function() {doNote(2,69);});
  player2.laButton.touchStarted(function() {doNote(2,69);});
  
  player2.siButton.mousePressed(function() {doNote(2,71);});
  player2.siButton.touchStarted(function() {doNote(2,71);});
  
  player2.do2Button.mousePressed(function() {doNote(2,72);});
  player2.do2Button.touchStarted(function() {doNote(2,72);});

 
}

function doNote(channel,nota){
  console.log("Tocando: c-> " + channel +" n-> " +nota);
  notaselecionada=nota;
  port.noteOn(channel, nota, 127);
}

function stopNote(channel, nota){
  console.log("Ended5");
  notaselecionada = nota;
  port.noteOff(channel,nota,127);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function draw() {
  background(bg);

  if(dragging){

    newX = mouseX + offsetX;
    newY = mouseY + offsetY;

    currentDragDiv.position(newX, newY);
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
  onsetX = currentDragDiv.width + offsetX;
  onsetY = currentDragDiv.height + offsetY;
}

/*function touchEnded(){
  console.log("Ended5");
  if(notaselecionada!=null){
  port.noteOff(0,notaselecionada,127);
  }
}*/