function setup() {
	createCanvas(24*scl,36*scl);
	board = new board();
	playpiece = new piece(start);
	console.log(board.board.length);
	console.log(board.board[13]);
}

function draw() {
	keyDown();
	background(30)
	board.update();
	playpiece.update();
	
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
function keyPressed() {
	if (keyCode == UP_ARROW){	
		playpiece.rotate();
	} 
	if (keyCode == DOWN_ARROW) {
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
