class Note{
  constructor(){
    this.x=random(100,windowWidth-100);
    this.y=random(100,windowHeight-100);
    this.xspeed = 4;
    this.yspeed = 2;
  }

  move(){
    this.x += this.xspeed;
    this.y += this.yspeed;
    if(this.x>windowWidth-100 || this.x<0){
      this.xspeed = -this.xspeed;
    }
    if (this.y > windowHeight - 100 || this.y<0) {
      this.yspeed = -this.yspeed;
    }
  }

  show(){
      image(noteIMG,this.x,this.y,100,100);
  }

  show2(){
      image(note2IMG,this.x,this.y,100,100);
  }

  show3(){
    image(note3IMG,this.x,this.y,40,100);
}

  clicked(x,y){
    if (x <= this.x + 100 && x >= this.x && y >= this.y && y <= this.y + 100){
      return true;
    }
  }
}