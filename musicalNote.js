class MusicalNote{
    
  constructor(instrumento,x,y,notex,notey,channel){
      this.instrumento = instrumento;
      this.x=x;
      this.y=y;
      this.notex=notex;
      this.notey=notey;
      this.channel=channel;
      JZZ.synth.Tiny.register('Web Audio');
      port = JZZ().openMidiOut();
      port.ch(channel).program(instrumento);

      this.div = createDiv('<div class = "container"><button class = "note_button" id = "do" type="button">DÓ</button><button class = "note_button" id = "re" type="button">RÉ</button><button class = "note_button" id = "mi" type="button">MI</button><button class = "note_button" id = "fa" type="button">FÁ</button><button class = "note_button" id = "sol" type="button">SOL</button><button class = "note_button" id = "la" type="button">LÁ</button><button class = "note_button" id = "si" type="button">SI</button><button class = "note_button" id = "do2" type="button">DÓ</button></div>');

      this.doButton = select('#do');
      this.reButton = select('#re');
      this.miButton = select('#mi');
      this.faButton = select('#fa');
      this.solButton = select('#sol');
      this.laButton = select('#la');
      this.siButton = select('#si');
      this.do2Button = select('#do2');  


    }
  
  notes(){  
    return this.div;
  }


  //doNote(){
      //  notaselecionada=60;
    //    port.noteOn(this.channel, 60, 127);
  //}
    

  touchEnded(){
      console.log("Ended5");
      if(notaselecionada!=null){
      port.noteOff(this.channel,notaselecionada,127);
      }
  }

  show(){
      image(this.instrumento,this.x,this.y,100,100);
  }
}