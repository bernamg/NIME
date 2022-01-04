class MusicalNote{
    
    constructor(instrumento,x,y,channel){
        this.instrumento = instrumento;
        this.x=x;
        this.y=y;
        this.channel=channel;
        JZZ.synth.Tiny.register('Web Audio');
        port = JZZ().openMidiOut();
        port.ch(channel).program(instrumento);
      }
    
    notes(){
      let doButton;
      doButton = createButton('DÓ');
      doButton.position(this.x,this.y);
      doButton.addClass('note_button');
      doButton.style('border', '1px solid #243F8D');
      doButton.style('background-color', col);
      doButton.mousePressed(this.doNote(this.channel));
      doButton.touchStarted(this.doNote);
    }


    doNote(channelR){
          notaselecionada=60;
          port.noteOn(channelR, 60, 127);

    }
      

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