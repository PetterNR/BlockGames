function ball(){
	this.id = numberballs++;
	this.inplay = false;
	this.superpos = [w/2,h/2];
	this.diameter = 20;
	this.vel = [0,4];
	this.speed = 10;
	this.show = function(){
		color_pick(this.id%7);
		ellipse(this.superpos[0],this.superpos[1],this.diameter);
	}

	this.update = function(){
		ballcount++;
		this.collide();
		this.move();
		this.show();
	}

	this.remove = function(array){
		for (var i = 0; i < array.length; i++){
			if (array[i].id == this.id){
				var tmp = array[0];
				array[0] = this;
				array[i] = tmp;
				array.shift();
			}
		}
		print("notevenonce");
	}


	this.collide = function(){
		if (this.superpos[0]-this.diameter/2 + this.vel[0] < 0){
			this.vel[0] = -this.vel[0]
		}
		if (this.superpos[0]+this.diameter/2 + this.vel[0] > w){
			this.vel[0] = -this.vel[0]
		}
		if (this.superpos[1]-this.diameter/2 + this.vel[1] < 0){
			this.vel[1] = -this.vel[1]
		} 
		if (this.superpos[1]+this.diameter/2 + this.vel[1] > h){
			this.remove(balls);
		}
	}

	this.move = function(){
		this.superpos = vecAdd(this.superpos,this.vel);
	}
}