function setup() {
	createCanvas(w,h);
	noCursor();
	player = new paddle();
	balls = new Array();
	balls.push(new ball());
}

function draw() {
	background(100);
	player.update();
	balls.forEach(update);
}
