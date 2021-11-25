function setup() {
  createCanvas(400, 400);
}


function draw() {
  background(125);
  clear();
  let display = touches.length + ' touches';
  text(display, 5, 10);
}
