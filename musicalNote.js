class MusicalNote{
    
  constructor(player, instrumento,x,y,notex,notey,channel){
    this.player = player;  
    this.instrumento = instrumento;
      this.x=x;
      this.y=y;
      this.notex=notex;
      this.notey=notey;
      this.channel=channel;
      //JZZ.synth.Tiny.register('Web Audio');
      //port = JZZ().openMidiOut();
      //port.ch(channel).program(instrumento);

      this.div = createDiv('<div class = "container" id="container"><button class = "note_button" id = "'+this.player+'do" type="button">DÓ</button><button class = "note_button" id = "'+this.player+'re" type="button">RÉ</button><button class = "note_button" id = "'+this.player+'mi" type="button">MI</button><button class = "note_button" id = "'+this.player+'fa" type="button">FÁ</button><button class = "note_button" id = "'+this.player+'sol" type="button">SOL</button><button class = "note_button" id = "'+this.player+'la" type="button">LÁ</button><button class = "note_button" id =  "'+this.player+'si" type="button">SI</button><button class = "note_button" id = "'+this.player+'do2" type="button">DÓ</button></div>');

      this.doButton = select('#'+this.player+'do');
      this.reButton = select('#'+this.player+'re');
      this.miButton = select('#'+this.player+'mi');
      this.faButton = select('#'+this.player+'fa');
      this.solButton = select('#'+this.player+'sol');
      this.laButton = select('#'+this.player+'la');
      this.siButton = select('#'+this.player+'si');
      this.do2Button = select('#'+this.player+'do2');  


    }
  
  notes(){  
    return this.div;
  }

  show(){
      image(this.instrumento,this.x,this.y,100,100);
  }

  setInstrument(instrumento){
    this.instrumento = instrumento;
  }
}