function setup() {
	createCanvas(24*scl,36*scl);
	board = new board();
	playpiece = new piece(start);
	textFont("Courier New");
}

function draw() {
	if (!paused){
		keyDown();
		background(10)
		board.update();
		playpiece.update();
		showText();
		showNext();
		showStored();
	} else {
		board.show();
		playpiece.show();
		displayPaused();
	}
	

}
function keyDown(){
	if (!paused){
		if (keyIsDown(RIGHT_ARROW) | keyIsDown(68)){
			if (new Date().getTime() - keyTimer > 40){
				keyTimer = new Date().getTime();
				if (!detectColX(1)){
					playpiece.superpos[0]++;
				}
			}
		}  
		if (keyIsDown(LEFT_ARROW) | keyIsDown(65)){
			if (new Date().getTime() - keyTimer > 40){
				keyTimer = new Date().getTime();
				if (!detectColX(-1)){
					playpiece.superpos[0]--;
					keyTimer = new Date().getTime();
				}
			}
		}
	}
}

function keyReleased(){
	if (!paused){
		if (keyCode == DOWN_ARROW | (keyCode == 83)) {
			speed = originspeed;
			goFast = false;
		} 
	}	
}
function keyPressed() {
	if (keyCode == 27 | (keyCode == 80)){
		paused = !paused;
	}
	else if (!paused){
		if (keyCode == UP_ARROW | (keyCode == 87)){	
			playpiece.rotate();
		} 
		if (keyCode == DOWN_ARROW | (keyCode == 83)) {
			goFast = true;
			speed = originspeed + 20;
			playpiece.timer = 0;
		} 
		if (keyCode == RIGHT_ARROW | (keyCode == 68)) {
			if (!detectColX(1)){
				playpiece.superpos[0]++;
				keyTimer = new Date().getTime() + 150;
			}
		} 
		if (keyCode == LEFT_ARROW | (keyCode == 65)) {
			if (!detectColX(-1)){
				playpiece.superpos[0]--;
				keyTimer = new Date().getTime() + 150;
			}
		}

		if (keyCode == 32) {
			playpiece.slam();
		}

		if (keyCode == 67){
			if (!saveCD){
					if (stored == null){
					stored = playpiece.type;
					playpiece = new piece(start);
					saveShape = createShapes(stored);
				} else {
					instore = next;
					next = stored;
					stored = playpiece.type;
					saveShape = createShapes(stored);
					playpiece = new piece(start);
					instore = null;
				}
				saveCD = true;
			}
		}
	}
}
