
function draw_level(){
    color_pick(1);
    rect(0,10*scl,w,scl);
    rect(0,h-scl,w,scl);
    for (var i = 0; i < 30; i++){
        if (i%2 != 0){
            rect(w/2-scl/2, i*scl + 10*scl, scl, scl);
        }
    }
}

function score(){
    this.player1 = 0;
    this.player2 = 0;

    this.init = function(){
        this.player1 = 0;
        this.player2 = 0;
    }

    this.show = function(){
        color_pick(1);
        textSize(32);
        text(this.player1.toString(), w/2 -2*32,32*3);
        text(this.player2.toString(), w/2 + 32,32*3);
    }
}