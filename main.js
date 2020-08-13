var b;

function setup() {
    b = new ball();
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(0);
    rect(width / 2, 0, 5, windowHeight);
    textSize(30);
    fill(160, 78, 180);
    b.show();
    b.move();
}