function setup() {
    createCanvas(w,h);
    gamescore = new score();
    gameball = new ball();
    player1 = new paddle([scl*2,22*scl]);
    player2 = new paddle([w-3*scl,22*scl]);
}

function draw() {
    background(10);
    draw_level();
    gamescore.show();
    gameball.update();
    player2ctrl();
    player1ctrl();
    player1.show();
    player2.show();
}
