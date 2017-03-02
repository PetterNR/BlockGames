var scl = 20;
var screensize = 40*scl;
var s;
var food;


var speed = 8;
function setup() {
	createCanvas(screensize,screensize);
	s = new snek();
	food = piclocation();
	frameRate(speed);
}

function draw() {
	text(20,20,"score %d", this.length)
	background(51);
	s.update();
	s.show();
	fill(255,255,0);
	rect(food.x, food.y, scl,scl);
}

function keyPressed() {
	if (!s.locked){
		if (keyCode == UP_ARROW){
			if (s.yspeed != 1) {s.dir(0,-1)};		
			s.started = true;
			s.locked = true;
		} else if (keyCode == DOWN_ARROW) {
			if (s.yspeed != -1) {s.dir(0,1)};
			s.started = true;
			s.locked = true;
		} else if (keyCode == RIGHT_ARROW) {
			if (s.xspeed != -1) {s.dir(1,0)};
			s.started = true;
			s.locked = true;
		} else if (keyCode == LEFT_ARROW) {
			if (s.xspeed != 1) {s.dir(-1,0)};
			s.started = true;
			s.locked = true;
		}
	}
}
function piclocation(){
	var rows = screensize/scl;
	var x = floor(random(rows));
	var y = floor(random(rows));
	return createVector(x,y).mult(scl)
}

function snek(){
	this.x = floor(screensize/2);
	this.y = floor(screensize/2);
	this.yspeed = 0;
	this.xspeed = 0;
	this.length = 4;
	this.tail = [];
	this.started = false;
	this.locked = false;

	for (var i = 0; i < this.length; i++){
		this.tail[i] = createVector(this.x, this.y);
	}
	this.show = function(){
		fill(255,20,20);
		rect(this.x, this.y, scl, scl);
		if (this.started == true) {
			for (var i = 0; i < this.length; i++){
				fill(255);
				rect(this.tail[i].x, this.tail[i].y, scl, scl)
			}
		}
		
	}
	this.eatfood = function(){
		if (this.x == food.x && (this.y == food.y)){
			this.length++;
			this.tail.push(this.x, this.y);
			food = piclocation();
		}
	}
	this.die = function(){
		this.x = screensize/2;
		this.y = screensize/2;
		this.yspeed = 0;
		this.xspeed = 0;
		for (var i = 0; i < this.length; i++){
			this.tail[i] = createVector(this.x, this.y);
		}
		this.stated = false;
		fill(0,0,0);
		rect(scl,scl,scl,scl);

		this.tail = [];
		this.length = 4;
		for (var i = 0; i < this.length; i++){
			this.tail[i] = createVector(this.x, this.y);
		}
		var currentTime = new Date().getTime();

		while (currentTime + 100 >= new Date().getTime()) {
		}
	}

	this.update = function(){
		
		
		this.tail.pop();
		this.tail.unshift(createVector(this.x, this.y));
		this.x += this.xspeed*scl;
		this.y += this.yspeed*scl;
		this.eatfood();
		this.locked = false;
		if (this.x > screensize | (this.x < 0)
			| (this.y > screensize) | (this.y < 0)){
			this.die();
		}

		if (this.started){
			for (var i = 0; i < this.length; i++) {
				if (this.x == this.tail[i].x && (this.y == this.tail[i].y)){
					this.die();
				}
			}}
		this.show();
	}

	this.dir = function (x,y) {
		this.xspeed = x;
		this.yspeed = y;
	}
}
