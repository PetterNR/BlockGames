function keyDown(){
}
function keyReleased(){
}
function keyPressed() {
}
function mousePressed(){
	waitingballs.push(new ball());
}
function mouseReleased(){
	while (waitingballs.length != 0){
		waitingballs[waitingballs.length -1].inplay = true;
		balls.push(waitingballs.pop());
	}
}

function mouseWheel(event){
	player.size -= 5*event.delta/Math.abs(event.delta);
}