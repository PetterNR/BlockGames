

var scl = 25;
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
var linestr= "lines: " + (levelcap - score).toString();
var levelstr = "level: " + (originspeed).toString();
var highscore = 0;
var highstring = "high:";
var scoreString = "score";
var saveCD = false;
var totalScore = 0;
var goFast = false;
var stored = null;
var next = pickPiece();
var nextShape = createShapes(next);
var saveShape;
var instore = null;
var roundness = scl/8;
var paused = false;
var combo = 1;

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}
function showText(){
	textSize(32);
	color_pick(3);
	text(scoreString, (offset*2+14)*scl, 32*scl-10*32);
	text(pad(totalScore,8), (offset*2+14)*scl, 32*scl-9*32);
	color_pick(4);
	text(highstring, (offset*2+14)*scl, 32*scl-8*32);
	text(pad(highscore,8), (offset*2+14)*scl, 32*scl-7*32)
	color_pick(5);
	text(linestr, (offset*2+14)*scl, 32*scl);
	color_pick(7);
	text(levelstr, (offset*2+14)*scl, 32+32*scl);
	color_pick(6);
	text("combo: " + combo, (offset*2+14)*scl, 32*scl-5*32);
}

function showNext(){
	for (i = 0; i < 7; i++){
		textSize(24);
		fill(150);
		text("next", (offset*2+14+2)*scl, 7*scl);
		color_pick(1);
		rect((14 + i + offset)*scl,(offset)*scl, scl, scl, roundness);
		rect((14 + i + offset)*scl,(offset+6)*scl, scl, scl, roundness);
		rect((14 + 6 + offset)*scl,(offset+6 - i)*scl, scl, scl, roundness);
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
			rect((14 + i + offset)*scl,(offset+6+6)*scl, scl, scl, roundness);
			rect((14 + 6 + offset)*scl,(offset+6 - i+ 6)*scl, scl, scl, roundness);

		}
		color_pick(pshapes.indexOf(stored) +2);
		displayPiece(stored,saveShape[0],16,9);
	}
}

function reset(){
	paused = true;
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

function displayPaused(){
	fill(30,30,30,240);
	rect(scl*4,scl*14,scl*8,scl*4,10);
	textSize(24);
	fill(255);
	text("Game Paused", (offset*5)*scl, 16*scl + 6);

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
	switch(this.score){
		case 1: totalScore += 128*Math.pow(2,combo); break;
		case 2: totalScore += 256*Math.pow(2,combo); break;
		case 3: totalScore += 512*Math.pow(2,combo); break;
		case 4: totalScore += 1024*Math.pow(2,combo); break;
	}
	if (this.score == 0){
		combo = 1;
	} else {
		combo += 1;
	}
	return this.score;
}
var perms = null;


function pickPiece(){
	if (perms == null){
		perms = [6,5,3,2,4,1,0];
	}
	perms.push(perms.shift());
	this.select = biasedAverage(7,3);
	var tmp = perms[0];
	perms[0] = perms[select];
	perms[select] = tmp;
	return pshapes[perms[0]];
}

function biasedAverage(maxVal, samples){
	var sum = 0;
	for (var i = 0; i < samples; i++){
		sum += Math.floor(Math.random()*maxVal);
	}
	return Math.round(sum/samples);
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


function color_pick(int){
	switch(int){
		case 0:fill(30);break;
		case 1:fill(255);break;
		case 2:fill(200,33,33,230);break;
		case 3:fill(128,255,0,230);break;
		case 4:fill(255,128,0,230);break;
		case 5:fill(0,60,220,230);break;
		case 6:fill(255,255,0,230);break;
		case 7:fill(0,255,255,230);break;
		case 8:fill(120,51,255,230);break;
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

