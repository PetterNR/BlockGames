function keyDown(){
}

function keyReleased(){

}
function keyPressed() {

}

function mouseWheel(event){
	player.size -= 5*event.delta/Math.abs(event.delta);
}