class MusicalNote{
    
    constructor(instrumento,x,y,channel){
        this.instrumento = instrumento;
        this.x=x;
        this.y=y;
        this.channel=channel;
        JZZ.synth.Tiny.register('Web Audio');
        port = JZZ().openMidiOut();
        port.ch(channel).program(instrumento);

        this.doButton = createButton('DÓ');
        this.doButton.position(this.x,this.y);
        this.doButton.addClass('note_button');
        this.doButton.style('border', '1px solid #243F8D');
        this.doButton.style('background-color', col);

        this.reButton = createButton('RÉ');
        this.reButton.position(this.x,this.y+100);
        this.reButton.addClass('note_button');
        this.reButton.style('border', '1px solid #243F8D');
        this.reButton.style('background-color', col);

      
        this.miButton = createButton('MI');
        this.miButton.position(this.x,this.y+200);
        this.miButton.addClass('note_button');
        this.miButton.style('border', '1px solid #243F8D');
        this.miButton.style('background-color', col);

      
        this.faButton = createButton('FÁ');
        this.faButton.position(this.x,this.y+300);
        this.faButton.addClass('note_button');
        this.faButton.style('border', '1px solid #243F8D');
        this.faButton.style('background-color', col);

      
        this.solButton = createButton('SOL');
        this.solButton.position(this.x,this.y+400);
        this.solButton.addClass('note_button');
        this.solButton.style('border', '1px solid #243F8D');
        this.solButton.style('background-color', col);

        this.laButton = createButton('LÁ');
        this.laButton.position(this.x,this.y+500);
        this.laButton.addClass('note_button');
        this.laButton.style('border', '1px solid #243F8D');
        this.laButton.style('background-color', col);

      
        this.siButton = createButton('SI');
        this.siButton.position(this.x,this.y+600);
        this.siButton.addClass('note_button');
        this.siButton.style('border', '1px solid #243F8D');
        this.siButton.style('background-color', col);
      
        this.do2Button = createButton('DÓ');
        this.do2Button.position(this.x,this.y+700);
        this.do2Button.addClass('note_button');
        this.do2Button.style('border', '1px solid #243F8D');
        this.do2Button.style('background-color', col);


      }
    
    notes(){
      let doButton;
      doButton = createButton('DÓ');
      doButton.position(this.x,this.y);
      doButton.addClass('note_button');
      doButton.style('border', '1px solid #243F8D');
      doButton.style('background-color', col);
      //doButton.mousePressed(this.doNote);
      //doButton.touchStarted(this.doNote);
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