function ball(){
    this.vel = [Math.pow(-1,Math.round(Math.random())),1];
    this.speed = 5;
    this.superpos = [w/2-scl/2,h/2 -scl/2 + 5*scl];
    this.deleted = false;
    this.inplay = false;

    this.show = function(){
        rect(this.superpos[0],this.superpos[1],scl,scl);
    }
    this.update = function(){
        if (this.inplay){
            for (var i = 0; i < this.speed; i++){
                if (!this.deleted){
                    this.scan();
                    this.move();
                }
            }  
            this.show();
        }
    }


    this.move = function(){
        this.superpos[0] += this.vel[0];
        this.superpos[1] += this.vel[1]; 
        this.scan();
    }

    this.scan = function(){
        if (this.superpos[1]+this.vel[1] > h - 2*scl){
            this.vel[1] = -this.vel[1];
        }
        if (this.superpos[1]+this.vel[1] < 11*scl){
            this.vel[1] = -this.vel[1];
        }
        if (this.superpos[0]+this.vel[0] > w-4*scl &&
            (this.superpos[0]+this.vel[0] < w-3*scl)){
            if (this.superpos[1] > player2.superpos[1] &&
                (this.superpos[1] < player2.superpos[1] + scl*5)){
                this.superpos[0] = player2.superpos[0]-scl;
                this.vel[0] = -this.vel[0];
                console.log("player2"); 
            }
            
        }
        if (this.superpos[0]+this.vel[0] < 0+3*scl &&
            (this.superpos[0]+this.vel[0] > 2*scl)){
            if (this.superpos[1] > player1.superpos[1] &&
                (this.superpos[1] < player1.superpos[1] + scl*5)){
                this.superpos[0] = player1.superpos[0]+scl;
                this.vel[0] = -this.vel[0];
                console.log("player1");
            }
        }

        if (this.superpos[0]+this.vel[0] > w+scl){
            gameball = new ball(); 
            gamescore.player1++;
            this.deleted = true;
        }
        if (this.superpos[0]+this.vel[0] < 0-2*scl){
            gameball = new ball();
            gamescore.player2++;
            this.deleted = true;
        }

    }
}