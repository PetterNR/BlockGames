// input and window event functions

function keyDown(){
}

function keyReleased(){
}

function keyPressed(){
	console.log(keyCode);
	if (keyCode == 32){
		if (currentType == "sun"){
			currentType = "planet";
		} else {
			currentType = "sun";
		}
		console.log(currentType);
	}
}

var tmp;
function mousePressed(){
	currentPoint = [mouseX, mouseY];
	tmp = new planet();
}

function mouseReleased(){
	currentSize = minSize;
	var velAddition = [mouseX,mouseY];
	vecSub(velAddition, currentPoint);
	vecScale(velAddition, 0.01);
	vecAdd(tmp.vel,  velAddition);
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