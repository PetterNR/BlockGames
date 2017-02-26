var scl = 20;
var board;
var offset = 1;
var piece;
var speed = 1;
var originspeed = 1;
var start = [5+offset, 0];
var playpiece;
var pshapes = ["Lsnake", "Rsnake", "L", "LL", "square", "line", "T"];
var delay = 1000;
var score = 0;
var keyTimer = new Date().getTime();
var levelcap = 10;
var linestr= "Lines: " + (levelcap - score).toString();
var levelstr = "Level: " + (originspeed).toString();
var highscore = 0;
var highstring = "High:  " + highscore.toString();
function reset(){
	board.reset();
	playpiece = new piece(start);
	originspeed = 1;
	speed = originspeed;
	levelcap = 10;
	score = 0;
	linestr= "Lines: " + (levelcap - score).toString();
	levelstr = "Level: " + (originspeed).toString();
}

function updateLevel(){
	if (score/levelcap >= 1){
		originspeed ++;
		speed = originspeed;
		score = score%levelcap;
		levelcap += 10;
		console.log(originspeed);
	}
}

function color_Board(){
	for (var i = 0; i < 4; i++){
		board.board[playpiece.superpos[0] + playpiece.currentshape[i][0] ][playpiece.superpos[1]+ playpiece.currentshape[i][1] ]= playpiece.color;
	}
}

function detectColX(int){
	for (var i = 0; i < 4; i++){
		if (board.board[playpiece.superpos[0] + playpiece.currentshape[i][0] + int ][playpiece.superpos[1]+ playpiece.currentshape[i][1] ] != 0){
			return true;
		}
	}
	return false;
}

function detectColY(int){
	for (var i = 0; i < 4; i++){
		if (board.board[playpiece.superpos[0] + playpiece.currentshape[i][0]][playpiece.superpos[1]+ playpiece.currentshape[i][1] + int ] != 0){
			return true;
		}
	}
	return false;
}

function detectScore(){
	this.score = 0;
	for (var i = 0; i < board.board[0].length-1; i++){
		this.rowlog = true;
		for (var j = 1; j < board.board.length-2; j++){
			if (board.board[j][i] == 0){
				this.rowlog = false;
			}
		}
		if (this.rowlog){
			this.score += 1
			for (var j = 1; j < board.board.length-2; j++){
				board.board[j][i] = 0;
			}
			board.rolldown(i);
		}
	}
	
	return this.score*this.score;
}


function pickPiece(){
	this.select = Math.floor(Math.random()*7);
	return pshapes[select];
}
function createShapes(type){
	this.shapes = new Array(4);
	switch(type){
		case "Lsnake":
			this.shapes[0] = [[0,0], [1, 0], [1, 1], [2, 1]];
			this.shapes[1] = [[1,0], [1, 1], [0, 1], [0, 2]];
			this.shapes[2] = [[0,0], [1, 0], [1, 1], [2, 1]];
			this.shapes[3] = [[1,0], [1, 1], [0, 1], [0, 2]];
			break;
		case "Rsnake":
			this.shapes[0] = [[1,0], [2, 0], [1, 1], [0, 1]];
			this.shapes[1] = [[0,0], [0, 1], [1, 1], [1, 2]];
			this.shapes[2] = [[1,0], [2, 0], [1, 1], [0, 1]];
			this.shapes[3] = [[0,0], [0, 1], [1, 1], [1, 2]];
			break;
		case "L":
			this.shapes[0] = [[0,0], [0, 1], [0, 2], [1, 2]];
			this.shapes[1] = [[0,1], [0, 0], [1, 0], [2, 0]];
			this.shapes[2] = [[0,0], [1, 0], [1, 1], [1, 2]];
			this.shapes[3] = [[0,1], [1, 1], [2, 1], [2, 0]];
			break;
		case "LL":
			this.shapes[0] = [[1,0], [1, 1], [1, 2], [0, 2]];
			this.shapes[1] = [[0,0], [0, 1], [1, 1], [2, 1]];
			this.shapes[2] = [[1,0], [0, 0], [0, 1], [0, 2]];
			this.shapes[3] = [[0,0], [1, 0], [2, 0], [2, 1]];
			break;
		case "square":
			this.shapes[0] = [[0,0], [0, 1], [1, 0], [1, 1]];
			this.shapes[1] = [[0,0], [0, 1], [1, 0], [1, 1]];
			this.shapes[2] = [[0,0], [0, 1], [1, 0], [1, 1]];
			this.shapes[3] = [[0,0], [0, 1], [1, 0], [1, 1]];
			break;
		case "line":
			this.shapes[0] = [[0,0], [1, 0], [2, 0], [3, 0]];
			this.shapes[1] = [[1,0], [1, 1], [1, 2], [1, 3]];
			this.shapes[2] = [[0,0], [1, 0], [2, 0], [3, 0]];
			this.shapes[3] = [[1,0], [1, 1], [1, 2], [1, 3]];
			break;
		case "T":
			this.shapes[0] = [[0,1], [1, 1], [1, 0], [2, 1]];
			this.shapes[1] = [[1,0], [1, 1], [1, 2], [2, 1]];
			this.shapes[2] = [[0,1], [1, 1], [2, 1], [1, 2]];
			this.shapes[3] = [[1,0], [1, 1], [1, 2], [0, 1]];
	}
	return this.shapes;
}
function color_pick(int){
	switch(int){
		case 1:fill(255);break;
		case 2:fill(255,33,33);break;
		case 3:fill(128,255,0);break;
		case 4:fill(255,128,0);break;
		case 5:fill(0,60,220);break;
		case 6:fill(255,255,0);break;
		case 7:fill(0,255,255);break;
		case 8:fill(120,51,255);break;
	}
}
