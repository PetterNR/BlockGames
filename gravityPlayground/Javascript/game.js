// game main functions

function setup() {
	windowResized();
	space = new drawBackGround();
}

function draw() {
	space.show();
	showPreview();

	
	for (var i = 0; i < planets.length; i++){
		planets[i].update();
	}
	
	for (var i = 0; i < planets.length; i++){
		if (planets[i] != null){
			planets[i].move();
			planets[i].show();
		}
	}
	if (mouseIsPressed){
		stroke(255);
		line(currentPoint[0],currentPoint[1], mouseX, mouseY);
		stroke(0);
	}


}
