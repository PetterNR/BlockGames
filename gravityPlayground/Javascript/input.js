// input and window event functions

function keyDown(){
}

function keyReleased(){
}

function keyPressed(){
}

var tmp;
function mousePressed(){
	currentPoint = [mouseX, mouseY];
	tmp = new planet();
}

function mouseReleased(){
	currentSize = minSize;
	var velAddition = vecSub([mouseX,mouseY], currentPoint);
	velAddition = vecScale(velAddition, 0.01);
	tmp.vel = vecAdd(tmp.vel,  velAddition);
	planets.push(tmp);
}

function windowResized(){
	w = window.innerWidth;
	h = window.innerHeight;
	createCanvas(w,h);
}

function mouseWheel(event){
	currentSize += -event.delta/Math.abs(event.delta)*reshapeDelta;
	if (currentSize < minSize){
		currentSize = minSize;
	} else if (currentSize > maxSize){
		currentSize = maxSize;
	}
}