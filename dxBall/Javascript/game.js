function setup() {
	createCanvas(w,h);
	noCursor();
	player = new paddle();
	balls = new Array();
	waitingballs = new Array();
	playgrid = new grid();
}

function draw() {
	background(100);
	player.update();
	ballcount = 0;
	balls.forEach(update);
	waitingballs.forEach(update);
	playgrid.show();
}
