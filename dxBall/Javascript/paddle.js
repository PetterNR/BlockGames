
function paddle(){
	this.size = 100;
	this.superpos = [w/2, h-64];
	this.rotationScale = 2;
	this.softening = 8;

	this.show = function(){
		color_pick(3);
		rect(this.superpos[0]-this.size/2,this.superpos[1], this.size, 12,10);
	}

	this.update = function(){
		this.getInput();
		this.show();
		for (i in balls) this.slap(balls[i]);
	}

	this.slap = function(x){
		if (x.superpos[1] +6 > this.superpos[1] - 6 && (x.superpos[1] < this.superpos[1] + 6)) {
			var o = x.superpos[0] - this.superpos[0];
			if (o > -this.size/2 && o < this.size/2){
				o = o/(this.size/2);
				o = Math.sign(o)*(1 -((Math.pow(this.softening,2) - Math.pow(o*this.softening,2)) / Math.pow(this.softening,2)));
				var a = this.size/this.rotationScale;
				var angle = Math.atan2(o,1/this.rotationScale);
				var speed = x.speed;
				x.vel = [Math.sin(angle), -Math.cos(angle)].map(x => x*speed);
				x.superpos[1] = this.superpos[1] - x.diameter/2;
			}
		}
	}

	this.getInput = function(){
		if (mouseX + this.size/2 > w){
			this.superpos[0] = w - this.size/2;
		} else if (mouseX - this.size/2 < 0){
			this.superpos[0] = 0 + this.size/2;
		} else {
			this.superpos[0] = mouseX;
		}
	}
}