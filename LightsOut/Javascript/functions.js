
var scl = 120;
var xxx = 4;
var offset = 1;
var grid;
var mouseEdge = false;
var button1;
var button2;
var button3;
var retry = false;

function color_pick(int){
	switch(int){
		case 0:fill(230);break;
		case 1:fill(255);break;
		case 2:fill(255,255,153);break;
		case 3:fill(255,255,190);break;
	}
}

function createButtons() {
	button1 = createButton('3x3');
	button1.position(scl*(xxx)+10,0);
	button1.mouseReleased(x3);

	button2 = createButton('4x4');
	button2.position(scl*(xxx)+10,scl);
	button2.mouseReleased(x4);

	button3 = createButton('5x5');
	button3.position(scl*(xxx)+10,2*scl);
	button3.mouseReleased(x5);
}
function reset(){
	createCanvas(scl*xxx+2,scl*xxx+2);
	background(255);
	button1.remove();
	button2.remove();
	button3.remove();
	grid.init();
	createButtons();
	randomGame(grid);
}

function randomGame(grid){
	this.maxval = grid.size**2/2;
	for (var i = 0; i < grid.size; i++) {
		for (var j = 0; j < grid.size; j++) {
			if (Math.random() >= 0.5 && (this.maxval >= 0)){
				grid.grid[i][j] = 2;
				this.maxval --;
			}
		}
	}
}
function x5() {
	console.log("what")
	xxx = 5;
	reset();
}
function x4() {
	console.log("what")
	xxx = 4;
	reset();
}
function x3() {
	xxx = 3;
	reset();
}