function preload(){
  bg = loadImage('images/background.jpg');
  col = color(36, 63, 141, 100);
}

function setup() {

  createCanvas(windowWidth, windowHeight);
  
  let ajuda = createElement('h', 'AJUDA');
  ajuda.addClass('ajuda');
  ajuda.position(windowWidth * 0.385 ,windowHeight* 0.15);

  sairButton = createButton('Sair');
  sairButton.position(windowWidth * 0.8 + sairButton.width ,windowHeight * 0.05);
  sairButton.addClass('sair_button');
  sairButton.style('border', '1px solid #243F8D');
  sairButton.style('background-color', col);
  sairButton.touchStarted(sair);
  //rato
  sairButton.mousePressed(sair);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function draw() {
  background(bg);
  
  rectMode(CENTER);
  strokeWeight(4);
  stroke(col);
  rect(windowWidth/2, windowHeight/2, windowWidth*0.60, windowHeight*0.60);
  fill(0, 0, 255);
}


function sair(){
  window.location.href="index.html";
}

