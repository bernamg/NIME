var play = function(p){
    

    p.setup = function(){
        createCanvas(windowWidth, windowHeight);
        backButton = createButton('Back');
        backButton.position(windowWidth-300,20);
        backButton.addClass('full');
        backButton.style('border', '1px solid #ec1840');
        backButton.touchStarted(goFullScreen);
        //rato
        backButton.mousePressed(goFullScreen);
    }

    p.windowResized = function(){
        resizeCanvas(windowWidth, windowHeight);
    }

    p.draw = function(){

    }
}