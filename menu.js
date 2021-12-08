let xspeed = 8;
let yspeed = 2;

class Note{


  constructor(){
    this.x=200;
    this.y=150;
  }

  move(){
    this.x += xspeed;
    this.y += yspeed;
    if(this.x>windowWidth-100 || this.x<0){
        xspeed = -xspeed;
    }
    if (this.y > windowHeight - 100 || this.y<0) {
      yspeed = -yspeed;
    }
  }

  show(){
      image(noteIMG,this.x,this.y,100,100);
  }

  clicked(x,y){
    if (x <= this.x + 100 && x >= this.x && y >= this.y && y <= this.y + 100){
      return true;
    }
  }
}