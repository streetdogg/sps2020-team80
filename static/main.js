var team_a;
var team_b;
var b;
var start = false;
var playerName;
var clientTeam;

function setup() {
    createCanvas(windowWidth,windowHeight);
    b = new ball();
    team_a = new team(1);
    team_b = new team(2);
    team_a.setup();
    team_b.setup();
    collideDebug(true);

    socket.on('addToTeam', function something(teamName, player){
        
        console.log('addToTeam: '+teamName+" "+playerName);
        if(teamName=="A") {
            team_a.addPlayer(teamName, playerName);
        } else {
            team_b.addPlayer(teamName, playerName);
        }
        start=true;
    })

    socket.on('connectedPlayers', function addConnectedPlayers(teamName, players, currentPlayer, currentTeam) {
        playerName = currentPlayer;
        clientTeam = currentTeam;
        var json = JSON.parse(players);
        if(teamName=="A") {
            for(var key in json) {
                team_a.addPlayer(teamName, key);
            }
        } else {
            for(var key in json) {
                team_b.addPlayer(teamName, key);
            }
        }
    })
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

    if (start) {
        socket.emit('move', {
            name: playerName,
            team: clientTeam,
            position: mouseY
        })
   }
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
}