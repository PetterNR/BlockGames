function board() {
	this.board = new Array(14);
	for (var i = 0; i < 14; i++) {
		this.board[i] = new Array(34).fill(0);
		this.board[i][33] = 1;
	}
	this.board[0].fill(1);
	this.board[13].fill(1);
	
	this.reset = function(){
		this.board = new Array(14);
		for (var i = 0; i < 14; i++) {
			this.board[i] = new Array(34).fill(0);
			this.board[i][33] = 1;
		}
		this.board[0].fill(1);
		this.board[13].fill(1);
	}
	this.update = function(){
		this.show()
	}

	this.show = function(){
		for (var i = 0; i < this.board.length; i++){
			for (var j = 0; j < this.board[0].length; j++){
				if (this.board[i][j] != 0){
					color_pick(this.board[i][j]);
					rect((i+offset)*scl , (j+offset)*scl ,scl,scl,scl/2-8);
				}
			}
		}
	}
	this.rolldown = function(int){
		for (var j = 1; j < 13; j++){
			for (var i = int; i > 1; i--){
				this.board[j][i] = this.board[j][i-1];
			}
			this.board[j][0] = 0;
		}
	}
}
