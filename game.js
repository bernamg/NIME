let note;
let count = 0;
let i=98;
function preload(){
  bg = loadImage('images/background.jpg');
  col = color(36, 63, 141, 100);
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  saxfoneAlto = createImg('/images/saxofone-alto.png');
  saxfoneAlto.position(350, 180);
  saxfoneAlto.size(60,120);
  saxfoneAlto.mousePressed(playSound);

  doButton = createButton('DÓ');
  doButton.position(windowWidth/10 - doButton.width*2,windowHeight*0.8);
  doButton.addClass('note_button');
  doButton.style('border', '1px solid #243F8D');
  doButton.style('background-color', col);

  reButton = createButton('RÉ');
  reButton.position(windowWidth/10,windowHeight*0.8);
  reButton.addClass('note_button');
  reButton.style('border', '1px solid #243F8D');
  reButton.style('background-color', col);

  miButton = createButton('MI');
  miButton.position(windowWidth/10 + doButton.width*2,windowHeight*0.8);
  miButton.addClass('note_button');
  miButton.style('border', '1px solid #243F8D');
  miButton.style('background-color', col);

  faButton = createButton('FÁ');
  faButton.position(windowWidth/10 + doButton.width*4,windowHeight*0.8);
  faButton.addClass('note_button');
  faButton.style('border', '1px solid #243F8D');
  faButton.style('background-color', col);

  solButton = createButton('SOL');
  solButton.position(windowWidth/10 + doButton.width*6,windowHeight*0.8);
  solButton.addClass('note_button');
  solButton.style('border', '1px solid #243F8D');
  solButton.style('background-color', col);

  laButton = createButton('LÁ');
  laButton.position(windowWidth/10 + doButton.width*8,windowHeight*0.8);
  laButton.addClass('note_button');
  laButton.style('border', '1px solid #243F8D');
  laButton.style('background-color', col);

  siButton = createButton('SI');
  siButton.position(windowWidth/10 + doButton.width*10,windowHeight*0.8);
  siButton.addClass('note_button');
  siButton.style('border', '1px solid #243F8D');
  siButton.style('background-color', col);

  do2Button = createButton('DÓ');
  do2Button.position(windowWidth/10 + doButton.width*12,windowHeight*0.8);
  do2Button.addClass('note_button');
  do2Button.style('border', '1px solid #243F8D');
  do2Button.style('background-color', col);


 
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function playSound(){
  print("playSound")
 
  JZZ.synth.Tiny.register('Web Audio');
  var port = JZZ().openMidiOut();
  port.ch(0).program('Alto Sax')

  print("Antes da query selector")
  let a = select('#saxfoneAlto')
    print("Antes de random")
    let note = parseInt(i);
    print("Depois do random")
    console.log("Playing note: ", note, " on guitar");
    port.noteOn(0, note, 127)
    setTimeout(function() {
    port.noteOff(0, note, 127)
 //   i=i+1;
    }, 1000);
}

function draw() {
  background(bg);

  for (var x = (width/10)*2; x <= width - (width/10)*2; x += width / 10) {
		for (var y = 0; y < height - height/5; y += height / 5) {
			stroke(0);
			strokeWeight(1);
			line(x, (height/5), x, height-(height/5)*2);
			line((width/10)*2, y, width-(width/10)*2, y);
		}
	}

}
