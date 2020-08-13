var player1;
var player2;
var b;

function setup() {
    b = new ball();
    createCanvas(windowWidth, windowHeight);
    player1 = new player(10, height / 2);
    player2 = new player(width - 30, height / 2);
}

function draw() {
    background(0);
    rect(width / 2, 0, 5, windowHeight);
    textSize(30);
    fill(160, 78, 180);
    
    text("Player 1 : " + player1.points, 50, 40);
    text("Player 2 : " + player2.points, width - 300, 40);

    player1.move(mouseY);
    player2.move(mouseY);
    player1.show();
    player2.show();

    b.show();
    b.move();
}