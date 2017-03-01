
function grid() {
	this.init = function(){
		this.solved = false;
		this.size = xxx;
		this.grid = new Array(size);
		this.selected = null;

		for (var i = 0; i < this.size; i++)
		{
			this.grid[i] = new Array(this.size).fill(0);
		}

	}

	this.scan = function(){
		this.solved = true;
		for (i in this.grid){
			for (j in this.grid[i]){
				if (this.grid[i][j] != 0) {
					this.solved = false;
					console.log(this.grid[i][j]);
				}
			}
		}
	}
	this.update = function(){
		for (var i = 0; i < this.size; i++){
			for (var j = 0; j < this.size; j++) {
				if (this.grid[i][j] > 3){
					this.grid[i][j] = 0;
				}
				color_pick(this.grid[i][j]);
				rect((i)*scl,(j)*scl,scl,scl,10);
			}
		}
		
	}
	this.select = function(x,y){
		this.x = floor(x/scl);
		this.y = floor(y/scl);
		
		if (this.x < this.size && (this.y < this.size) &&
			(this.x >= 0) && (this.y >= 0)){
			this.selected = [this.x,this.y];
			this.grid[this.selected[0]][this.selected[1]]++;
		}
	}
	this.release = function(){
		if (this.selected != null){
			this.grid[this.selected[0]][this.selected[1]]++;
			this.trigger();
			this.selected = null;
			this.scan();
		}
	}
	this.trigger = function(){
		if (this.selected[0] < this.size-1){
			this.grid[this.selected[0]+1][this.selected[1]] += 2;
		}
		if (this.selected[0] > 0){
			this.grid[this.selected[0]-1][this.selected[1]] += 2;
		}
		if (this.selected[1] < this.size-1){
			this.grid[this.selected[0]][this.selected[1]+1] += 2;
		}
		if (this.selected[1] > 0){
			this.grid[this.selected[0]][this.selected[1]-1] += 2;
		}
	}

}