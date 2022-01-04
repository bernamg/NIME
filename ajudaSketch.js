function preload(){
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
}


function sair(){
  window.location.href="index.html";
}

function clickHandler(element){
  console.log(element);
  if(element.className == "container"){
    var video1 = document.getElementById('video1');
    video1.play();
  }
}

