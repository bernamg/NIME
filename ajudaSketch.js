
function preload(){
  noteIMG = loadImage("images/nota1.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  //Titulo
  let title = createElement('h', 'NIME');
  title.addClass('title');
  title.position(windowWidth * 0.50 - title.width ,windowHeight* 0.15);
  title.center('horizontal');

 


  sairButton = createButton('Sair');

  sairButton.position(windowWidth * 0.75 - sairButton.width/2 ,windowHeight * 0.05);
  sairButton.addClass('botton');
  sairButton.style('border', '1px solid #ec1840');
  sairButton.touchStarted(sair);
  //rato
  sairButton.mousePressed(sair);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function draw() {
  background(0);


  fill(0, 255, 0);
  rect(windowWidth * 0.20, windowHeight * 0.10, windowWidth*0.60, windowHeight*0.80);
  fill(0, 0, 0);
  rect(windowWidth * 0.22, windowHeight * 0.12, windowWidth*0.56, windowHeight*0.76);
  fill(0, 255, 0);
  textSize(50);
  text('Aqui escrever regras ', 400, 300);


}


function sair(){
  window.location.href="index.html";
}

