var team_a;
var team_b;
var b;

function setup() {
    createCanvas(windowWidth,windowHeight);
    b = new ball();
    team_a = new team(1);
    team_b = new team(2);
    team_a.setup();
    team_b.setup();
}

function score() {
    if(b.x < b.radius) {
        team_b.points++;
    }
    if(b.x + b.radius > width) {
        team_a.points++;
    }
}

function preload() {
    collision_sound = loadSound("pingpong.mp3");
}

function draw() {
    background(0);
    rect(width/2, 0, 5, windowHeight)
    textSize(30);
    fill(160, 78, 180);

    text("Team A : " + team_a.points, 50, 40);
    text("Team B : " + team_b.points, width - 300, 40);

    team_a.move(mouseY);
    team_b.move(mouseY);
    team_a.show();
    team_b.show();

    if(b.collide(team_a.player1) || b.collide(team_b.player1) || b.collide(team_a.player2) || b.collide(team_b.player2) || b.collide(team_a.player3) || b.collide(team_b.player3)){
        b.vx *= -1;
        b.colorChange();
        collision_sound.play();
    }

    b.move();
    b.show();

    score();
    showWinner();
}

function showWinner(){
   
    if(team_a.points==3 && team_b.points<3){
        background(0);
        textSize(50);
        fill(160,78,180);
        text("TEAM A WINS!!", width/2-100,height/2);
        alert("Do you want to play again?");
        window.location.reload();
    }

    else if(team_b.points==3 && team_a.points<3){
        background(0);
        textSize(50);
        fill(160,78,180);
        text("TEAM B WINS!!", width/2-100,height/2);
        alert("Do you want to play again?");
        window.location.reload();
    }

    else if (team_a.points==3 && team_b.points==3){
        background(0);
        textSize(100);
        fill(160,78,180);
    
        text("ITS A TIE!!", width/2-100,height/2);
        alert("Do you want to play again?");
        window.location.reload();
    }

}

