function keyIsPressed(){
    
}
function keyReleased(){
    if (keyCode == 32){
        gameball.inplay = true;
    }
}
function keyPressed() {
    console.log(keyCode);
}

function mousePressed(){

}
function mouseReleased(){

}

function mouseWheel(event){

}
function player1ctrl(){
    if (keyIsDown(87)){
        player1.moveUp();
    }
    if (keyIsDown(83)){
        player1.moveDown();
    }
}
function player2ctrl(){
    if (keyIsDown(38)){
        player2.moveUp();
    }
    if (keyIsDown(40)){
        player2.moveDown();
    }
}