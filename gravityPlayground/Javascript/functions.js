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
const planetDensity = 0.04;
const G = 0.1;

// 
var currentType = "planet";

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

// funcy funks
function vecScale(a,b){
	return a.map((x)=>x*b);
}

function vecAdd(a,b){
	return a.map((x,i)=>x+b[i]);
}

function vecSub(a,b){
	return a.map((x,i)=>x-b[i]);
}

function vecInv(a) {
	return a.map(x=>1./x);
}

function vecNormalize(a) {
	var sum = vecNorm(a);
	return a.map(x=>x/sum);
}

function vecDot(a,b){
	return a.map((x,i)=>x*b[i]).reduce((x,y)=>x+y,0);
}

function vecNorm(a){
	return Math.sqrt(a.reduce((y,x) => y+x*x,0));
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