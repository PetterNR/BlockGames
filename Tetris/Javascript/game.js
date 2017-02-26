function setup() {
	createCanvas(24*scl,36*scl);
	board = new board();
	playpiece = new piece(start);
}

function draw() {
	
	keyDown();
	background(10)
	board.update();
	playpiece.update();
	textSize(32);
	color_pick(6);
	text(highstring, (offset*2+14)*scl, 32*scl-2*32);
	color_pick(4);
	text(linestr, (offset*2+14)*scl, 32*scl);
	color_pick(3);
	text(levelstr, (offset*2+14)*scl, 32+32*scl);
	
}
function keyDown(){
	if (keyIsDown(RIGHT_ARROW)){
		if (new Date().getTime() - keyTimer > 50){
			keyTimer = new Date().getTime();
			if (!detectColX(1)){
				playpiece.superpos[0]++;
			}
		}
	}  
	if (keyIsDown(LEFT_ARROW)){
		if (new Date().getTime() - keyTimer > 50){
			keyTimer = new Date().getTime();
			if (!detectColX(-1)){
				playpiece.superpos[0]--;
				keyTimer = new Date().getTime();
			}
		}
	}
}

function keyReleased(){
	if (keyCode == DOWN_ARROW) {
		speed = originspeed;
	} 
}
function keyPressed() {
	if (keyCode == UP_ARROW){	
		playpiece.rotate();
	} 
	if (keyCode == DOWN_ARROW) {
		speed = originspeed + 20;
	} 
	if (keyCode == RIGHT_ARROW) {
		if (!detectColX(1)){
			playpiece.superpos[0]++;
			keyTimer = new Date().getTime() + 200;
		}
	} 
	if (keyCode == LEFT_ARROW) {
		if (!detectColX(-1)){
			playpiece.superpos[0]--;
			keyTimer = new Date().getTime() + 200;
		}
	}
}
