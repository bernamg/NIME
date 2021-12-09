let note;
let count = 0;

function preload(){
  bg = loadImage('images/background.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);


}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(bg);

  for (var x = (width/10)*2; x <= width - (width/10)*2; x += width / 10) {
		for (var y = 0; y < height; y += height / 5) {
			stroke(0);
			strokeWeight(1);
			line(x, (height/5), x, height-height/5);
			line((width/5), y, width-(width/10)*2, y);
		}
	}

}
