function ball(){
	this.id = numberballs++;
	this.inplay = false;
	this.superpos = [w/2,h/2];
	this.diameter = 20;
	this.speed = 8;
	this.vel = [0,-this.speed];
	this.gridPos = [Math.floor(this.superpos[0]/scl),Math.floor((this.superpos[1]-ceiling)/scl)];
	this.prevGridPos = this.gridPos.slice();
	this.angle = 0;

	this.getGridPos = function(){
		this.angle = Math.atan2(this.vel[0],this.vel[1]);
		return [Math.floor((Math.sin(this.angle)*this.diameter/2+this.superpos[0])/scl/2),
		Math.floor((Math.cos(this.angle)*this.diameter/2 +this.superpos[1]-ceiling)/scl)];
	}

	this.show = function(){
		color_pick(this.id%7);
		ellipse(this.superpos[0],this.superpos[1],this.diameter);
	}

	this.update = function(){
		ballcount++;
		if (this.inplay){
			this.collide();
			this.move();
			this.gridPos = this.getGridPos();
			if (!this.gridPos.reduce((acc,x,i)=>acc&&(x==this.prevGridPos[i]),true)){
				this.checkGrid();
			}
		} else {
			this.superpos = [player.superpos[0], player.superpos[1] - this.diameter/2-2];
		}
		this.show();
		this.prevGridPos = this.gridPos.slice();
	}

	this.checkGrid = function(){
		if (this.gridPos[1] < playgrid.grid.length && (this.gridPos[1] >= 0)){
			if (playgrid.grid[this.gridPos[1]][this.gridPos[0]]!=0){
				playgrid.grid[this.gridPos[1]][this.gridPos[0]]=0;
				if (this.gridPos[0] - this.prevGridPos[0] != 0){
					this.vel[0] = -this.vel[0];
				} else {
					this.vel[1] = -this.vel[1];
				}
			}
		}
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
	}


	this.collide = function(){
		if (this.superpos[0]-this.diameter/2 + this.vel[0] < 0){
			this.vel[0] = -this.vel[0]
		}
		if (this.superpos[0]+this.diameter/2 + this.vel[0] > w){
			this.vel[0] = -this.vel[0]
		}
		if (this.superpos[1]-this.diameter/2 + this.vel[1] < ceiling){
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