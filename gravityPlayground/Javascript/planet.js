var totalPlanets = 0;

function planet(){
	this.id = totalPlanets;
	totalPlanets ++;
	this.superpos = currentPoint.slice();
	this.vel = [0.,0.];
	this.gravity = 1;
	this.radius = currentSize;
	this.mass = Math.pow(this.radius/20,3)*planetDensity;
	this.force = [0,0];

	// calculate forces and apply
	

	// update velocity
	this.update = function(){
		vecAdd(this.superpos, this.vel);
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
				var d = planets[i].superpos.slice();
				vecSub(d,this.superpos);
				var absD = Math.sqrt(d[0]*d[0] + d[1]*d[1]);
				// yeah turns out radius is actually diameter
				if (absD < (this.radius/2 + planets[i].radius/2)){
					this.collide(i);
				} else {
					vecNormalize(d);
					var gmm = G*this.mass*planets[i].mass/(absD*absD);
					vecScale(d, gmm);
					vecAdd(this.force, d);
				}
			}
		}
	}

	this.collide = function(i){
		var u1 = this.vel.slice();
		var u2 = planets[i].vel.slice();
		var x21 = this.superpos.slice();
		vecSub(x21, planets[i].superpos);
		var x12 = planets[i].superpos.slice();
		vecSub(x12, this.superpos);

		var v1 = u1.slice();
		vecSub(v1,u2);
		var v2 = u2.slice();
		vecSub(v2,u1);

		var c1 = -2*planets[i].mass/(this.mass + planets[i].mass)*vecDot(v1,x12)/(vecNorm(x12)*vecNorm(x12));
		var c2 = -2*this.mass/(this.mass + planets[i].mass)*vecDot(v2,x21)/(vecNorm(x21)*vecNorm(x21));

		console.log(c1);
		console.log(c2);
		vecScale(x12,c1);
		vecScale(x21,c2);

		vecAdd(this.vel, x12);
		vecAdd(planets[i].vel, x21);

		vecAdd(this.superpos, this.vel);
		vecAdd(planets[i].superpos, planets[i].vel);
	}

	this.applyForce = function(){
		vecScale(this.force, 1./this.mass);
		vecAdd(this.vel, this.force);
	}
}