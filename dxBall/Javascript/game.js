function setup() {
	createCanvas(w,h);
	noCursor();
	player = new paddle();
	balls = new Array();
	balls.push(new ball());
	balls.push(new ball());
	balls[1].superpos = [w/4,h/4];
}

function draw() {
	background(100);
	player.update();
	ballcount = 0;
	balls.forEach(update);
	console.log(balls.length);
}
