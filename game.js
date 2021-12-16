let note;
let count = 0;
let selecionado = null;
var port;

function preload(){
  bg = loadImage('images/background.jpg');
  col = color(36, 63, 141, 100);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  JZZ.synth.Tiny.register('Web Audio');
  port = JZZ().openMidiOut();

  doButton = createButton('DÓ');
  doButton.position(windowWidth/10 - doButton.width*2,windowHeight*0.8);
  doButton.addClass('note_button');
  doButton.style('border', '1px solid #243F8D');
  doButton.style('background-color', col);
  doButton.mousePressed(doNote);
  doButton.touchStarted(doNote);

  reButton = createButton('RÉ');
  reButton.position(windowWidth/10,windowHeight*0.8);
  reButton.addClass('note_button');
  reButton.style('border', '1px solid #243F8D');
  reButton.style('background-color', col);
  reButton.mousePressed(reNote);
  reButton.touchStarted(reNote);

  miButton = createButton('MI');
  miButton.position(windowWidth/10 + doButton.width*2,windowHeight*0.8);
  miButton.addClass('note_button');
  miButton.style('border', '1px solid #243F8D');
  miButton.style('background-color', col);
  miButton.mousePressed(miNote);
  miButton.touchStarted(miNote);

  faButton = createButton('FÁ');
  faButton.position(windowWidth/10 + doButton.width*4,windowHeight*0.8);
  faButton.addClass('note_button');
  faButton.style('border', '1px solid #243F8D');
  faButton.style('background-color', col);
  faButton.mousePressed(faNote);
  faButton.touchStarted(faNote);

  solButton = createButton('SOL');
  solButton.position(windowWidth/10 + doButton.width*6,windowHeight*0.8);
  solButton.addClass('note_button');
  solButton.style('border', '1px solid #243F8D');
  solButton.style('background-color', col);
  solButton.mousePressed(solNote);
  solButton.touchStarted(solNote);

  laButton = createButton('LÁ');
  laButton.position(windowWidth/10 + doButton.width*8,windowHeight*0.8);
  laButton.addClass('note_button');
  laButton.style('border', '1px solid #243F8D');
  laButton.style('background-color', col);
  laButton.mousePressed(laNote);
  laButton.touchStarted(laNote);

  siButton = createButton('SI');
  siButton.position(windowWidth/10 + doButton.width*10,windowHeight*0.8);
  siButton.addClass('note_button');
  siButton.style('border', '1px solid #243F8D');
  siButton.style('background-color', col);
  siButton.mousePressed(siNote);
  siButton.touchStarted(siNote);

  do2Button = createButton('DÓ');
  do2Button.position(windowWidth/10 + doButton.width*12,windowHeight*0.8);
  do2Button.addClass('note_button');
  do2Button.style('border', '1px solid #243F8D');
  do2Button.style('background-color', col);
  do2Button.mousePressed(do2Note);
  do2Button.touchStarted(do2Note);

  /****
   * INSTRUMENTOS
   * 
   */
  button = createImg('guitarra.png');
  button.position(410,270);
  button.addClass('instrument');
  button.mousePressed(guitarra);
  button.touchStarted(guitarra);

  saxofoneI = createImg('saxofone.png');
  saxofoneI.position(610,270);
  saxofoneI.addClass('instrument');
  saxofoneI.mousePressed(saxofone);
  saxofoneI.touchStarted(saxofone);
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
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


/*******************************
 * 
 * ALTERAR O INSTUMENTO
 * 
 */
function guitarra(){
  console.log("Alterado para guitarra")
  selecionado = 'guitar';
  console.log(selecionado);
  port.ch(0).program(selecionado);
}

function saxofone(){
  console.log("Alterado para saxofone");
  selecionado = 'piano';
  port.ch(0).program(selecionado);
}


/***********************************
*     
* NOTAS           
*                        
*/
function doNote(){
  if(selecionado != null){
    console.log("Playing note: do on " + selecionado);
    port.noteOn(0, 20, 127)
    setTimeout(function() {
    port.noteOff(0, 20, 127)
    }, 1000);
  }
}

function reNote(){
  if(selecionado != null){
    console.log("Playing note: re on " + selecionado);
    port.noteOn(0, 30, 127)
    setTimeout(function() {
    port.noteOff(0, 30, 127)
    }, 1000);
  }
}

function miNote(){
  if(selecionado != null){
    console.log("Playing note: mi on " + selecionado);
    port.noteOn(0, 35, 127)
    setTimeout(function() {
    port.noteOff(0, 35, 127)
    }, 1000);
  }
}

function faNote(){
  console.log("NOTA DO");
  if(selecionado != null){
    console.log("Playing note: fa on " + selecionado);
    port.noteOn(0, 50, 127)
    setTimeout(function() {
    port.noteOff(0, 50, 127)
    }, 1000);
  }
}

function solNote(){
  if(selecionado != null){
    console.log("Playing note: sol on " + selecionado);
    port.noteOn(0, 60, 127)
    setTimeout(function() {
    port.noteOff(0, 60, 127)
    }, 1000);
  }
}

function laNote(){
  if(selecionado != null){
    console.log("Playing note: la on " + selecionado);
    port.noteOn(0, 70, 127)
    setTimeout(function() {
    port.noteOff(0, 70, 127)
    }, 1000);
  }
}
function siNote(){
  if(selecionado != null){
    console.log("Playing note: si on " + selecionado);
    port.noteOn(0, 80, 127)
    setTimeout(function() {
    port.noteOff(0, 80, 127)
    }, 1000);
  }
}
function do2Note(){
  if(selecionado != null){
    console.log("Playing note: do2 on " + selecionado);
    port.noteOn(0, 90, 127)
    setTimeout(function() {
    port.noteOff(0, 90, 127)
    }, 1000);
  }
}