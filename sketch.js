function setup() {
  createCanvas(windowWidth, windowHeight);
  
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function draw() {
  clear();
  background(178,255,102);
  let display = touches.length + ' touches';
  textAlign(CENTER);
  text(display, windowWidth/2, windowHeight/2);
}
