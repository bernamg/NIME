let note1;
let note2;
let note3;
let note2_check = 0;
let note3_check = 0;
let count = 0;
let play_sound;
let angle = 0;
let direction = 0;
let check=0;
function preload(){
  
  bg = loadImage('images/background.jpg');

  noteIMG = loadImage("images/nota1.png");
  note2IMG = loadImage("images/nota2.png");
  note3IMG = loadImage("images/nota3.png");


  guitarraIMG = loadImage("guitarra.png");
  saxofoneIMG = loadImage("saxofone.png");
  tamborIMG = loadImage("tambor.png");

  song1 = loadSound('sounds/musica_menu.mp3');
  song2 = loadSound('sounds/musica_menu2.mp3');
  song3 = loadSound('sounds/musica_menu3.mp3');


}

function setup() {
  
  canvas = createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  soundFormats('mp3', 'ogg');
  play_sound = loadSound('sounds/guitar');

  //Titulo
  let title = createElement('h', 'NIME');
  title.addClass('title');
  title.position(windowWidth/2 - 190 ,windowHeight* 0.20);
  
  note1 = new Note();
  note2 = new Note();
  note3 = new Note();


  //BOTAO PLAY MUSIC

  canvas.mousePressed(checkNote);
  canvas.touchStarted(checkNote);

  playButton = createButton('Tocar Música');
  playButton.addClass('button');
  playButton.style('border', '1px solid #CF1D41');
  let col1 = color(207, 29, 65, 100);
  playButton.style('background-color', col1);
  playButton.position(windowWidth/2 - windowWidth*0.2, windowHeight * 0.45);
  playButton.center('horizontal');
  playButton.touchStarted(playMenu);
  //rato
  playButton.mousePressed(playMenu);


  //BOTAO AJUDA

  helpButton = createButton('Ajuda')
  helpButton.addClass('button');
  helpButton.style('border', '1px solid #F6BE2E');
  let col2 = color(246, 190, 46, 100);
  helpButton.style('background-color', col2);
  helpButton.position(windowWidth*0.50 -playButton.width/2, windowHeight * 0.60);
  helpButton.center('horizontal');
  //playButton.touchStarted();
  //rato
  helpButton.mousePressed(ajuda);

  //BOTAO SAIR DO JOGO

  exitButton = createButton('Sair do jogo')
  exitButton.addClass('button');
  exitButton.style('border', '1px solid #243F8D');
  let col3 = color(36, 63, 141, 100);  
  exitButton.style('background-color', col3);
  exitButton.position(windowWidth*0.50 -playButton.width/2, windowHeight * 0.75);
  exitButton.center('horizontal');
  //playButton.touchStarted();
  //rato
  exitButton.mousePressed();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function goFullScreen() {
  let fs = fullscreen();
  fullscreen(!fs);
  windowResized();
}

function draw() {
  imageMode(CORNER);

  background(bg);
  note1.move();
  note1.show();
  if(note2_check == 1){
    note2.move();
    note2.show2();
  }
  if(note3_check == 1){
    note3.move();
    note3.show3();
  }
  imageMode(CENTER);
  playAnimation();
}

//===============DEFINIR DIRECÃO DA ANIMACÃO===============//
function setDirection(){
  if(check==1){
    rotate(angle);
    if(direction == 0){
      angle = angle + 0.05;
      if(angle >= 20)
        direction = 1;
    }
    else{
      angle = angle - 0.05;
      if(angle <= -30)
        direction = 0;
    }
  }
}

function playAnimation(){

  //===============GUITARRA 1===============//
  push();
  scale(-0.6,0.6);
  translate (-width*1.4, height - (guitarraIMG.height/3));
  rotate(70);
  setDirection();
  image(guitarraIMG,0,0);
  pop();

  //===============SAXOFONE 1===============//
  push();
  scale(0.4,0.4);
  translate (width*2.35, height + (saxofoneIMG.height/4));
  rotate(-30);
  setDirection();
  image(saxofoneIMG,0,0);
  pop();  

  //===============SAXOFONE 2===============//
  push();
  scale(-0.5,0.5);
  translate (-saxofoneIMG.width/4, height-(saxofoneIMG.height/2));
  rotate(-30);
  setDirection();
  image(saxofoneIMG,0,0);
  pop();

  //===============GUITARRA 2===============//
  push();
  scale(0.7);
  translate (width/5.5, height);
  setDirection();
  image(guitarraIMG,0,0);
  pop();

  //===============SAXOFONE 3===============//
  push();
  scale(-0.4,0.4);
  translate (-saxofoneIMG.width/3.5, height*2);
  rotate(10);
  setDirection();
  image(saxofoneIMG,0,0);
  pop();

  //===============GUITARRA 3===============//
  push();
  scale(-0.6,0.6);
  translate (-width*1.55, height + (guitarraIMG.height/1.6));
  setDirection();
  image(guitarraIMG,0,0);
  pop();

  //===============TAMBOR 1===============//
  push();
  scale(0.7);
  translate (width * 1.3, height/4.5);
  rotate(15);
  setDirection();
  image(tamborIMG,0,0);
  pop();

  //===============TAMBOR 2===============//
  push();
  scale(0.8);
  translate (width * 1.05, height - (tamborIMG.height/5));
  rotate(-15);
  setDirection();
  image(tamborIMG,0,0);
  pop();

  //===============TAMBOR 3===============//
  push();
  scale(-0.7,0.7);
  translate (-width/6, height - (tamborIMG.height/2));
  rotate(-15);
  setDirection();
  image(tamborIMG,0,0);
  pop();

  //===============TAMBOR 4===============//
  push();
  scale(-0.7,0.7);
  translate (-width/5, height - tamborIMG.height*1.3);
  rotate(20);
  setDirection();
  image(tamborIMG,0,0);
  pop();
}

function playMenu(){
  song1.stop();
  song2.stop();
  //play_sound.play();
  window.location.href="game.html";
}

function checkNote(){
  let x=mouseX;
  let y=mouseY;
  if(note1.clicked(x,y)){
    check = 1;
    playAnimation();
    if (song2.isPlaying()){
      song2.stop();
    }
    else if(song3.isPlaying()){
      song3.stop();
    }
    if(!song1.isPlaying()){
      song1.loop();
    }
    note2_check = 1;
  }
  
  else if(note2.clicked(x,y)){
    if (song1.isPlaying()){
      song1.stop();
    }
    if(song3.isPlaying()){
      song3.stop();
    }
    if(!song2.isPlaying()){
      song2.loop();
    }
    note3_check = 1;
  }

  else if(note3.clicked(x,y)){
    if (song1.isPlaying()){
      song1.stop();
    }
    if(song2.isPlaying()){
      song2.stop();
    }
    if(!song3.isPlaying()){
      song3.loop();
    }
  }
}

function ajuda(){
  window.location.href="ajuda.html";
}