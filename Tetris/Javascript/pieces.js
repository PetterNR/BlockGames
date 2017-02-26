function piece(start){
	this.type = pickPiece();
	this.shapes = createShapes(this.type);
	// will have 4 shapes
	this.state = this.select = Math.floor(Math.random()*4);
	// state will indicate shape of piece
	this.superpos = start.slice();
	this.currentshape = this.shapes[this.state];
	this.color = pshapes.indexOf(this.type) + 2;
	this.timer = new Date().getTime() + delay/speed;

	this.update = function(){
		this.show();
		if (new Date().getTime() - this.timer > 1000/speed){
			this.timer = new Date().getTime();
			if (!detectColY(1)){
				this.superpos[1]++;
			} else {
				color_Board();
				score += detectScore();
				
				updateLevel();
				linestr= "Lines: " + (levelcap - score).toString();
				levelstr = "Level: " + (originspeed).toString();
				if (originspeed > highscore){
					highscore = originspeed;
					highstring = "High:  " + (highscore).toString();
				}
				playpiece = new piece(start);
				if (detectColY(0) | detectColX(0)){
					reset();
				}
			}
			
		}
	}

	this.show = function(){
		for (var i = 0; i < 4; i++){
			color_pick(this.color);
			rect((this.superpos[0] + offset + this.currentshape[i][0])*scl, 
				(this.superpos[1] + offset + this.currentshape[i][1])*scl, 
				scl, scl, scl/2-8);
		}
	}

	this.rotate = function(){
		this.state++;
		if (this.state == 4) this.state=0;
		this.currentshape = this.shapes[this.state];
		if (detectColY(0) | detectColX(0)){
			if (this.state == 0){
				this.state = 3;
			} else  {
				this.state --;
			}
			this.currentshape = this.shapes[this.state];
		}
	}
}
