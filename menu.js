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
}