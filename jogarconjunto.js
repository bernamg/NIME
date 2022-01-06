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
let player3;
let player1_drag;
let player2_drag;
let player3_drag;

let dragging = false;
let offsetX, offsetY;
let canvasWidth, canvasHeight;
let currentDragDiv;


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


  //Lista dos instrumentos selecionados
  instrument_list = JSON.parse(localStorage.instrumentos);
  for (let i=0;i<instrument_list.length;i++){
      print("Instrumentos: "+instrument_list[i]);
  }

  angleMode(DEGREES);

  //numero de players
  player_number = JSON.parse(localStorage.player_number);
 

  //Situação default do tocar conjunto 2 players
  player1 = new MusicalNote("player1", instrument_list[0],100,100,10,200,1);
  player2= new MusicalNote("player2",instrument_list[1],200,100,10,400,2);

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


  //Situaçao de 3 players
  //PLAYER 3
  if(player_number == 3){
    player3 = new MusicalNote("player3",instrument_list[2],300,100,10,400,1);
    push();
    player3_drag = player3.notes();
    player3_drag.mousePressed(function(){ dragDiv(player3_drag)}).touchStarted(function(){ dragDiv(player3_drag)}).mouseReleased(dropDiv).touchEnded(dropDiv);
    player3_drag.style('transform', 'rotate(-90deg)');
    player3_drag.position(900, 250);
    pop();
  
    player3.doButton.mousePressed(function() {doNote(3,60, player3.instrumento);});
    player3.doButton.touchStarted(function() {doNote(3,60, player3.instrumento);});
    player3.do2Button.mouseReleased(function() {stopNote(3,60);});
    player3.do2Button.touchEnded(function() {stopNote(3,60);});

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
  }
  
}


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
}
