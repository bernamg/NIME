let note;
let count = 0;

function preload(){
  noteIMG = loadImage("images/nota1.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  note = new Note();

  //guitarButton = createImg("images/guitar.jpg");
  //guitarButton.position(0,0);
  //guitarButton.addClass('instrument');
  //guitarButton.touchStarted();


}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
    note.move();
    note.show();

}
