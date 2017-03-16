
var scl = 20;
var w = 32*scl;
var h = 42*scl;
var ceiling = 50;

var player;
var balls;
var numberballs = 3;
var ballcount = 0;
var waitingballs;
var playgrid;
// common lambdas
var update = x => x.update();
var clog = x => console.log(x);


function vecAdd (a, b){
    return a.map((x,i) => x + b[i]);
}


function color_pick(int){
    switch(int){
        case 0:fill(100);break;
        case 1:fill(255);break;
        case 2:fill(200,33,33,230);break;
        case 3:fill(128,255,0,230);break;
        case 4:fill(255,128,0,230);break;
        case 5:fill(0,60,220,230);break;
        case 6:fill(255,255,0,230);break;
        case 7:fill(0,255,255,230);break;
        case 8:fill(120,51,255,230);break;
    }
}