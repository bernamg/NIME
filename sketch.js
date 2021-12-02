let note;
let count = 0;

function preload(){
  noteIMG = loadImage("images/nota1.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  let title = createElement('h', 'NIME');
  title.addClass('title');
  title.position(windowWidth * 0.50 - title.width/2 ,windowHeight* 0.15);
  title.center('horizontal');

  note = new Note();
  fullscreenButton = createButton('FullScreen');

  fullscreenButton.position(windowWidth * 0.85 - fullscreenButton.width/2 ,windowHeight * 0.05);
  fullscreenButton.addClass('botton');
  fullscreenButton.style('border', '1px solid #ec1840');
  fullscreenButton.touchStarted(goFullScreen);
  //rato
  fullscreenButton.mousePressed(goFullScreen);


  playButton = createButton('Play Music');
  playButton.addClass('botton');
  playButton.style('border', '1px solid #23f702');
  playButton.position(windowWidth*0.50 -playButton.width/2, windowHeight * 0.35);
  playButton.center('horizontal');
  playButton.touchStarted(goFullScreen);
  //rato
  playButton.mousePressed(teste);


  //BOTAO AJUDA

  helpButton = createButton('Help')
  helpButton.addClass('botton');
  helpButton.style('border', '1px solid #23f702');
  helpButton.position(windowWidth*0.50 -playButton.width/2, windowHeight * 0.45);
  helpButton.center('horizontal');
  //playButton.touchStarted();
  //rato
  helpButton.mousePressed();

  //BOTAO SAIR DO JOGO~

  exitButton = createButton('Sair do jogo')
  exitButton.addClass('botton');
  exitButton.style('border', '1px solid #23f702');
  exitButton.position(windowWidth*0.50 -playButton.width/2, windowHeight * 0.55);
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
}

function draw() {
  background(0);
    note.move();
    note.show();

}


function teste(){
  window.location.href="teste.html";
}