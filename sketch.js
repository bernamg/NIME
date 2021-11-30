

let note;
let count = 0;

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
  fullscreenButton.position(windowWidth*0.9-(fullscreenButton.width/2),20);
  fullscreenButton.addClass('botton');
  fullscreenButton.style('border', '1px solid #ec1840');
  fullscreenButton.touchStarted(goFullScreen);
  //rato
  fullscreenButton.mousePressed(goFullScreen);


  playButton = createButton('Play Music');
  playButton.addClass('botton');
  playButton.style('border', '1px solid #23f702');
  playButton.position(windowWidth-170,windowHeight/3);
  playButton.center('horizontal');
  playButton.touchStarted(goFullScreen);
  //rato
  playButton.mousePressed(play);
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function goFullScreen() {
  let fs = fullscreen();
  fullscreen(!fs);
}

function draw() {
  /*if(count==0){
    clear();
    print("if do zero");
    background(0);
    note.move();
    note.show();
  }
  if(count==1){
    clear();
    background(0);
    print("if do count=1");
    backButton = createButton('Back');
    backButton.addClass('botton');
    backButton.style('border', '1px solid #23f702');
    backButton.position(windowWidth-170,windowHeight/3);
    backButton.center('horizontal');
    backButton.touchStarted(goFullScreen);
    //rato
    backButton.mousePressed(test1);
  }*/
  background(0);
    note.move();
    note.show();

}

function test(){
  count=1;
}

function test1(){
  count=0;
}
