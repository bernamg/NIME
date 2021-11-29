let note;

function preload(){
  noteIMG = loadImage("images/nota1.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  let title = createElement('h', 'NIME');
  title.addClass('title');
  title.position(windowWidth-170,windowHeight/6);
  title.center('horizontal');

  note = new Note();
  fullscreenButton = createButton('FullScreen');
  fullscreenButton.position(windowWidth-300,20);
  fullscreenButton.addClass('full');
  fullscreenButton.style('border', '1px solid #ec1840');
  fullscreenButton.touchStarted(goFullScreen);
  //rato
  fullscreenButton.mousePressed(goFullScreen);


  playButton = createButton('Play Music');
  playButton.addClass('full');
  playButton.style('border', '1px solid #23f702');
  playButton.position(windowWidth-170,windowHeight/3);
  playButton.center('horizontal');
  playButton.touchStarted(goFullScreen);
  //rato
  playButton.mousePressed();
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


