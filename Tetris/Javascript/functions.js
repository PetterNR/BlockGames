

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
var highstring = "High:";
var scoreString = "Score";
var saveCD = false;
var totalScore = 0;

var stored = null;
var next = pickPiece();
var nextShape = createShapes(next);
var saveShape;
var instore = null;
function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}
function showText(){
	textSize(32);
	color_pick(3);
	text(scoreString, (offset*2+14)*scl, 32*scl-10*32);
	text(pad(totalScore,6), (offset*2+14)*scl, 32*scl-9*32);
	color_pick(4);
	text(highstring, (offset*2+14)*scl, 32*scl-8*32);
	text(pad(highscore,6), (offset*2+14)*scl, 32*scl-7*32)
	color_pick(5);
	text(linestr, (offset*2+14)*scl, 32*scl);
	color_pick(7);
	text(levelstr, (offset*2+14)*scl, 32+32*scl);
}

function showNext(){
	for (i = 0; i < 7; i++){
		textSize(24);
		fill(150);
		text("next", (offset*2+14+2)*scl, 7*scl);
		color_pick(1);
		rect((14 + i + offset)*scl,(offset)*scl, scl, scl, 2);
		rect((14 + i + offset)*scl,(offset+6)*scl, scl, scl, 2);
		rect((14 + 6 + offset)*scl,(offset+6 - i)*scl, scl, scl, 2);
	}
	color_pick(pshapes.indexOf(next) +2);
	displayPiece(next,nextShape[0],16,3);
}

function showStored(){
	if (stored != null){
		for (i = 0; i < 7; i++){
			textSize(24);
			fill(150);
			text("save", (offset*2+14+2)*scl, 13*scl);
			color_pick(1);
			rect((14 + i + offset)*scl,(offset+6+6)*scl, scl, scl, 2);
			rect((14 + 6 + offset)*scl,(offset+6 - i+ 6)*scl, scl, scl, 2);

		}
		color_pick(pshapes.indexOf(stored) +2);
		displayPiece(stored,saveShape[0],16,9);
	}
}

function reset(){
	totalScore = 0;
	board.reset();
	stored = null;
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
		for (var j = 1; j < board.board.length-1; j++){
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
	console.log(this.score)
	switch(this.score){
		case 1: totalScore += 100; break;
		case 2: totalScore += 300; break;
		case 3: totalScore += 500; break;
		case 4: totalScore += 1000; break;
	}
	return this.score;
}


function pickPiece(){
	this.select = Math.floor(Math.random()*7);
	return pshapes[select];
}

function displayPiece(xtype,xshape,x,y){
	if (xtype == "line"){
		for (var i=0;i<4;i++){
			rect((x+xshape[i][0])*scl,(y+xshape[i][1]+1)*scl,scl,scl,2);
		}
	} else {
		for (var i=0;i<4;i++){
			rect((x+xshape[i][0]+1)*scl,(y+xshape[i][1])*scl,scl,scl,2);
		}
	}
	
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
