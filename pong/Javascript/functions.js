
var scl = 12;
var w = 53*scl;
var h = 41*scl;

var gameball;
var gamescore;
var player1;
var player2;
// common lambdas
var update = x => x.update();
var clog = x => console.log(x);


function vecAdd (a, b){
    return a.map((x,i) => x + b[i]);
}



function color_pick(int){
    noStroke();
        switch(int){
        case 0:fill(0);break;
        case 1:fill(255);break;
    }
}

function paddleball(){
    var b = gameball.superpos;
    var p1 = player1.superpos;
    var p2 = player2.superpos;

    if (b[0] > p1[0] && (b[0] < p1[0]+scl)){
        return true;
    }
    
    return true;

}