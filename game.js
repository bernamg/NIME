let note;
let count = 0;
let i=98;
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

  conjuntoButton = createButton('Tocar em Conjunto');
  conjuntoButton.position(windowWidth*0.80 -conjuntoButton.width, windowHeight* 0.10);
  conjuntoButton.addClass('button');
  conjuntoButton.style('border', '1px solid #243F8D');
  conjuntoButton.style('background-color', col);
  



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
  /*
  button = createImg('/images/guitarra-classica.png');
  button.position(410,270);
  button.size(150,100);
  button.addClass('instrument');
  button.mousePressed(guitarra);
  button.touchStarted(guitarra);

*/
 
  saxofoneI = createImg('images/saxofone-alto.png');
  saxofoneI.position(windowWidth/3.1,windowHeight/4.9);
  saxofoneI.size(60,120);
  saxofoneI.addClass('instrument');
  saxofoneI.mousePressed(AltoSax);
  saxofoneI.touchStarted(AltoSax);

  saxofoneSop = createImg('images/saxofone-soprano.png');
  saxofoneSop.position(windowWidth/2.33,windowHeight/4.9);
  saxofoneSop.size(60,120);
  saxofoneSop.addClass('instrument');
  saxofoneSop.mousePressed(AltoSax);
  saxofoneSop.touchStarted(AltoSax);

  saxofoneBar = createImg('images/saxofone-baritono.png');
  saxofoneBar.position(windowWidth/1.94,windowHeight/4.9);
  saxofoneBar.size(90,120);
  saxofoneBar.addClass('instrument');
  saxofoneBar.mousePressed(BaritonoSax);
  saxofoneBar.touchStarted(BaritonoSax);

  oboe = createImg('images/oboe.png');
  oboe.position(windowWidth*0.62,windowHeight/4.9);
  oboe.size(90,120);
  oboe.addClass('instrument');
  oboe.mousePressed(OboeI);
  oboe.touchStarted(OboeI);

  fagote = createImg('images/fagote.png');
  fagote.position(windowWidth/3.1,windowHeight/2.47);
  fagote.size(90,120);
  fagote.addClass('instrument');
  fagote.mousePressed(FagoteI);
  fagote.touchStarted(FagoteI);

  trompete = createImg('images/trompete.png');
  trompete.position(windowWidth/2.4,windowHeight/2.47);
  trompete.size(90,120);
  trompete.addClass('instrument');
  trompete.mousePressed(TrompeteI);
  trompete.touchStarted(TrompeteI);
  
  trombone = createImg('images/trombone.png');
  trombone.position(windowWidth/1.94,windowHeight/2.47);
  trombone.size(90,120);
  trombone.addClass('instrument');
  trombone.mousePressed(TromboneI);
  trombone.touchStarted(TromboneI);

  tuba = createImg('/images/tuba.png');
  tuba.position(windowWidth*0.62,windowHeight/2.47);
  tuba.size(90,120);
  tuba.addClass('instrument');
  tuba.mousePressed(TubaI);
  tuba.touchStarted(TubaI);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function draw() {
  background(bg);

  for (var x = (width/10)*3; x <= width - (width/10)*3; x += width / 10) {
		for (var y = 0; y < height - height/5; y += height / 5) {
			stroke(0);
			strokeWeight(1);
			line(x, (height/5), x, height-(height/5)*2);
			line((width/10)*3, y, width-(width/10)*3, y);
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
  selecionado = 'Acoustic Guitar (nylon)';
  console.log(selecionado);
  port.ch(0).program(selecionado);
}

function AltoSax(instrumento){
  console.log("Alterado para saxofone");
  selecionado = 65;
  port.ch(0).program(selecionado);
}

function SopranoSax(instrumento){
  console.log("Alterado para saxofone-soprano");
  selecionado = 64;
  port.ch(0).program(selecionado);
}

function BaritonoSax(instrumento){
  console.log("Alterado para saxofone-baritono");
  selecionado = 67;
  port.ch(0).program(selecionado);
}

function OboeI(instrumento){
  console.log("Alterado para saxofone-baritono");
  selecionado = 69;
  port.ch(0).program(selecionado);
}

function FagoteI(instrumento){
  console.log("Alterado para fagote");
  selecionado = 70;
  port.ch(0).program(selecionado);
}

function TrompeteI(instrumento){
  console.log("Alterado para trompete");
  selecionado = 56;
  port.ch(0).program(selecionado);
}

function TromboneI(instrumento){
  console.log("Alterado para trombone");
  selecionado = 57;
  port.ch(0).program(selecionado);
}

function TubaI(instrumento){
  console.log("Alterado para tuba");
  selecionado = 58;
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
    port.noteOn(0, 60, 127)
    setTimeout(function() {
    port.noteOff(0, 60, 127)
    }, 500);
  }
}

function reNote(){
  if(selecionado != null){
    console.log("Playing note: re on " + selecionado);
    port.noteOn(0, 62, 127);
    if(mouseReleased){  
      port.noteOff(0, 62, 127)
    }
  }
}

function mouseReleased(){
  
}

function miNote(){
  if(selecionado != null){
    console.log("Playing note: mi on " + selecionado);
    port.noteOn(0, 64, 127)
    setTimeout(function() {
    port.noteOff(0, 64, 127)
    }, 500);
  }
}

function faNote(){
  console.log("NOTA DO");
  if(selecionado != null){
    console.log("Playing note: fa on " + selecionado);
    port.noteOn(0, 65, 127)
    setTimeout(function() {
    port.noteOff(0, 65, 127)
    }, 500);
  }
}

function solNote(){
  if(selecionado != null){
    console.log("Playing note: sol on " + selecionado);
    port.noteOn(0, 67, 127)
    setTimeout(function() {
    port.noteOff(0, 67, 127)
    }, 500);
  }
}

function laNote(){
  if(selecionado != null){
    console.log("Playing note: la on " + selecionado);
    port.noteOn(0, 69, 127)
    setTimeout(function() {
    port.noteOff(0, 69, 127)
    }, 500);
  }
}
function siNote(){
  if(selecionado != null){
    console.log("Playing note: si on " + selecionado);
    port.noteOn(0, 71, 127)
    setTimeout(function() {
    port.noteOff(0, 71, 127)
    }, 500);
  }
}
function do2Note(){
  if(selecionado != null){
    console.log("Playing note: do2 on " + selecionado);
    port.noteOn(0, 72, 127)
    setTimeout(function() {
    port.noteOff(0, 72, 127)
    }, 500);
  }
}