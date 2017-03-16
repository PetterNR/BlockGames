function paddle(pos){
    this.superpos = pos;
    this.speed = 5;

    this.moveUp = function(){
        for (var i = 0; i < this.speed; i++){
            if (this.superpos[1] > scl*11){
                this.superpos[1]--;
            }
        }
    }
    this.moveDown = function(){
        for (var i = 0; i < this.speed; i++){
            if (this.superpos[1] < h-scl*5){
                this.superpos[1]++;
            }
        }
    }

    this.show = function(){
        rect(this.superpos[0], this.superpos[1], scl,scl*4);
    }
}