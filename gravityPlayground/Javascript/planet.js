var totalPlanets = 0;

function planet(){

	this.id = totalPlanets;
	totalPlanets ++;
	this.superpos = currentPoint.slice();
	this.vel = [0.,0.];
	this.gravity = 1;
	this.radius = currentSize;
	this.spent = false;
	this.density = planetDensity;
	this.mass = Math.pow(this.radius,3)*this.density;
	
	this.force = [0,0];
	this.targetradius = this.radius;

	// calculate forces and apply
	

	// update velocity
	this.update = function(){
		if (planets.length > 1) {
			this.calculateForces();
			this.applyForce();
			this.force = [0,0];
		}
		
		// remove if out of bounds
		if (this.outOfBounds()){
			this.remove();
		}
	}

	this.move = function(){
		this.superpos = vecAdd(this.superpos, this.vel);
	}

	this.remove = function(){
		for (var i = 0; i < planets.length;i++){
			if (planets[i].id == this.id){
				planets[i] = planets[planets.length-1];
				planets.pop();
			}
		}
	}
	
	this.outOfBounds = function(){
		if (this.superpos[0] > w + this.radius | 
			(this.superpos[0] < 0 - this.radius) |
			(this.superpos[1] > h + this.radius) |
			(this.superpos[1] < 0 - this.radius)){
			return true;
		}

		return false;
	}

	this.show = function(){
		if (this.radius < this.targetradius){
			this.radius++;
		}
		color_pick(this.id%7);
		noStroke();
		ellipse(this.superpos[0],this.superpos[1], this.radius);
	}

	this.calculateForces = function(){
		for (var i = 0; i < planets.length; i++){
			if (planets[i].id != this.id){
				var d = vecSub(planets[i].superpos,this.superpos);
				var absD = vecNorm(d);
				// yeah turns out radius is actually diameter
				if (absD < (this.radius/2 + planets[i].radius/2)){
					this.collide(i);
				} else if (!this.spent){
					d = vecNormalize(d);
					var gmm = G*this.mass*planets[i].mass/(absD*absD);
					d = vecScale(d, gmm);
					this.force = vecAdd(this.force, d);
				}
				
			}
		}
	}

	this.collide = function(i){
		var that = planets[i];
		if (this.mass >= that.mass){
			this.mass += that.mass;
			this.targetradius = Math.pow(this.mass/this.density,1/3);
			this.vel = vecScale(vecAdd(vecScale(this.vel,this.mass), vecScale(that.vel, that.mass)), 1/(this.mass + that.mass));
			that.remove();
		}
	}

	this.applyForce = function(){
		this.vel = vecAdd(this.vel, vecScale(this.force,1/this.mass));
	}
}
