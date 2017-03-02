function setup() {
	createCanvas(24*scl,36*scl);
	board = new board();
	playpiece = new piece(start);
	var s = "abc";
	var ss = s;
}

function draw() {
	keyDown();
	background(10)
	board.update();
	playpiece.update();
	showText();
	showNext();
	showStored();
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
