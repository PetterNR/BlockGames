var totalPlanets = 0;

function planet(){

	this.id = totalPlanets;
	totalPlanets ++;
	this.superpos = currentPoint.slice();
	this.vel = [0.,0.];
	this.gravity = 1;
	this.radius = currentSize;
	this.spent = false;

	if (currentType == "planet"){
		this.mass = Math.pow(this.radius/20,3)*planetDensity;
	} else if (currentType == "sun"){
		this.mass = Math.pow(this.radius/20,3)*sunDensity;
	}
	
	this.force = [0,0];

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
				this.spent = false;
				
			}
		}
	}

	this.collide = function(i){
		var u1 = this.vel.slice();
		var x12 = vecSub(planets[i].superpos, this.superpos);
		var v1 = vecSub(this.vel,planets[i].vel);
		var c1 = -(2.*planets[i].mass)/(this.mass + planets[i].mass)*vecDot(v1,x12)/(Math.pow(vecNorm(x12),2));
		x12 = vecScale(x12,c1);
		this.vel = vecAdd(this.vel, x12);

		var x21 = vecSub(this.superpos, planets[i].superpos);
		var v2 = vecSub(planets[i].vel,u1);
		var c2 = -(2.*this.mass)/(this.mass + planets[i].mass)*vecDot(v2,x21)/(Math.pow(vecNorm(x21),2));
		x21 = vecScale(x21,c2);
		planets[i].vel = vecAdd(planets[i].vel, x21);
	

		this.superpos  = vecAdd(this.superpos, this.vel);
		planets[i].superpos = vecAdd(planets[i].superpos, planets[i].vel);
	}

	this.applyForce = function(){
		this.vel = vecAdd(this.vel, vecScale(this.force,1/this.mass));
	}
}