// functions and global contants defined here
var scl = 25;
var canvas,w,h;

// variables for planet creation
var planets = new Array();
var currentPoint = [0,0];
var minSize = 10;
var currentSize = minSize;
var maxSize = 150;
var reshapeDelta = 10;

// constants
const planetDensity = 10;
const G = 0.1;

function showPreview(){
	noStroke();
	fill(255,255,255,50);
	if (mouseIsPressed){
		ellipse(currentPoint[0],currentPoint[1],currentSize);
	} else {
		ellipse(mouseX,mouseY,currentSize);
	}
	stroke(0);

}
function drawBackGround(){
	this.show = function(){
		background(50);
	}
}

// vector math functions (2D)
// these modify first argument

function vecMult(a,b){
	for (i in a){
		a[i] = a[i]*b[i];
	}
}

function vecScale(a,b){
	for (i in a){
		a[i] = a[i]*b;
	}
}

function vecAdd(a,b){
	for (i in a){
		a[i] = a[i]+b[i];
	}
}

function vecSub(a,b){
	for (i in a){
		a[i] = a[i]-b[i];
	}
}

function vecInv(a) {
	for (i in a){
		a[i] = 1./a[i];
	}
}
function vecPow(a) {
	for (i in a){
		a[i] = a[i]*a[i];
	}
}
function vecNormalize(a) {
	var sum = Math.abs(a[0]) + Math.abs(a[1]);
	for (i in a){
		a[i] = a[i]/sum;
	}
}
function vecDot(a,b){
	var sum = 0;
	for (i in a){
		sum += a[i]*b[i];
	}
	return sum;
}
function vecNorm(a){
	var sum = 0;
	for (i in a){
		sum += a[i]*a[i];
	}
	return Math.sqrt(sum);
}

// color picker !
function color_pick(int){
	switch(int){
		case 0: fill(150,80,30); break;
		case 1: fill(200,200,0); break;
		case 2: fill(51,102,153); break;
		case 3: fill(200,60,0); break;
		case 4: fill(200,102,60); break;
		case 5: fill(100,100,200); break;
		case 6: fill(60,60,200); break;
	}
}