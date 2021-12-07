let note;
let count = 0;

function preload(){
  noteIMG = loadImage("images/nota1.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  bg = loadImage('img.jpg');

  //Titulo
  let title = createElement('h', 'NIME');
  title.addClass('title');
  title.position(windowWidth * 0.355 ,windowHeight* 0.15);
  
  note = new Note();


  //BOTAO FULLSCREEN
  /*
  fullscreenButton = createButton('FullScreen');
  fullscreenButton.position(windowWidth * 0.75 - fullscreenButton.width/2 ,windowHeight * 0.05);
  fullscreenButton.addClass('botton');
  fullscreenButton.style('border', '1px solid #ec1840');
  fullscreenButton.touchStarted(goFullScreen);
  //rato
  fullscreenButton.mousePressed(goFullScreen);
  */
  
  //BOTAO PLAY MUSIC

  playButton = createButton('Play Music');
  playButton.addClass('botton');
  playButton.style('border', '1px solid #CF1D41');
  let col1 = color(207, 29, 65, 100);
  playButton.style('background-color', col1);
  playButton.position(windowWidth*0.50 -playButton.width/2, windowHeight * 0.40);
  playButton.center('horizontal');
  playButton.touchStarted(goFullScreen);
  //rato
  playButton.mousePressed(teste);


  //BOTAO AJUDA

  helpButton = createButton('Help')
  helpButton.addClass('botton');
  helpButton.style('border', '1px solid #243F8D');
  let col2 = color(36, 63, 141, 100);
  helpButton.style('background-color', col2);
  helpButton.position(windowWidth*0.50 -playButton.width/2, windowHeight * 0.55);
  helpButton.center('horizontal');
  //playButton.touchStarted();
  //rato
  helpButton.mousePressed(ajuda);

  //BOTAO SAIR DO JOGO

  exitButton = createButton('Sair do jogo')
  exitButton.addClass('botton');
  exitButton.style('border', '1px solid #F6BE2E');
  let col3 = color(246, 190, 46, 100);
  exitButton.style('background-color', col3);
  exitButton.position(windowWidth*0.50 -playButton.width/2, windowHeight * 0.70);
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
  background(bg);
  note.move();
  note.show();

}


function teste(){
  window.location.href="play.html";
}

function ajuda(){
  window.location.href="ajuda.html";
}