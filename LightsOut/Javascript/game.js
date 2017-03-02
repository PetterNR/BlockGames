function setup() {
	createCanvas(scl*xxx+2,scl*xxx+2);
	grid = new grid();
	grid.init();
	createButtons();
	randomGame(grid);
}

function draw() {
	grid.update();
	if (grid.solved){
		winner();
	}
}

function mousePressed(){
	if (grid.solved){
		retry = true;
	}
	grid.select(mouseX,mouseY);
}

function mouseReleased(){
	grid.release();
	draw();
	grid.scan();
	if (retry){
		reset();
	}
	retry = false;
}

function winner(){
	color_pick(0);
	rect(xxx*scl/2 - scl,xxx*scl/2 - scl,scl*2,scl*2,50);
	textSize(32);
	fill(50);
	text("WIN", xxx*scl/2-32,xxx*scl/2-32);
	text("NER", xxx*scl/2-32,xxx*scl/2);
	textSize(9);
	fill(70);
	text("click to reset", xxx*scl/2-9*3,xxx*scl/2+32*2);

}