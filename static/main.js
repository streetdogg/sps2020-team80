var team_a;
var team_b;
var b;
var start = false;
var playerName;
var clientTeam;
var isLeader = false;
var winningScore = 10;

function setup() {
    //createCanvas(windowWidth-30,windowHeight-50);
    createCanvas(1150,550);
    b = new ball();
    team_a = new team(1);
    team_b = new team(2);
    team_a.setup();
    team_b.setup();
    collideDebug(true);
    isLeader = false;
    winningScore = 20;

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
        if(jQuery.isEmptyObject(json) && teamName=="A") {
            isLeader = true;
            window.setInterval(updateBallPosition, 2000);
        }
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

    socket.on('movePlayer', function(teamName, playerIndex, position) {
        if(teamName=="A") {
            team_a.players[playerIndex].move(position);
        } else {
            team_b.players[playerIndex].move(position);
        }
    })

    socket.on('updateScore', function(teamAScore,  teamBScore) {
        team_a.points = teamAScore;
        team_b.points = teamBScore;
    })

    socket.on('syncBall', function(x, y, vx, vy) {
        b.x = x;
        b.y = y;
        b.vx = vx;
        b.vy = vy;
    })
}

function score() {
    var isChanged = false;
    if(b.x < b.radius) {
        team_b.points++;
        isChanged = true;
    }
    if(b.x + b.radius > width) {
        team_a.points++;
        isChanged = true;
    }
    if(isChanged) {
        socket.emit('scoreChange', {
            A: team_a.points,
            B: team_b.points
        })
    }
}

function preload() {
    //collision_sound = loadSound("pingpong.mp3");
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

    if(b.team_collide(team_a.players) || b.team_collide(team_b.players)){
        b.vx *= -1;
        b.colorChange();
        // collision_sound.play();

    }

    b.move();
    b.show();

    if(isLeader) {
        score();
    }
    //showWinner();
}

// function showWinner(){
   
//     if(team_a.points==winningScore && team_b.points<winningScore){
//         background(0);
//         textSize(50);
//         fill(160,78,180);
//         team_a.points = 0;
//         team_b.points = 0;
//         text("TEAM A WINS!!", width/2-100,height/2);
//         alert("Do you want to play again?");
//         window.location.reload();
//     }

//     else if(team_b.points==winningScore && team_a.points<winningScore){
//         background(0);
//         textSize(50);
//         fill(160,78,180);
//         team_a.points = 0;
//         team_b.points = 0;
//         text("TEAM B WINS!!", width/2-100,height/2);
//         alert("Do you want to play again?");
//         window.location.reload();
//     }

//     else if (team_a.points==winningScore && team_b.points==winningScore){
//         background(0);
//         textSize(100);
//         fill(160,78,180);
//         team_a.points = 0;
//         team_b.points = 0;
//         text("ITS A TIE!!", width/2-100,height/2);
//         alert("Do you want to play again?");
//         window.location.reload();
//     }

// }

function updateBallPosition() {
    console.log('Updating ball position...');
    socket.emit('updateBall', {
        x: b.x,
        y: b.y,
        vx: b.vx,
        vy: b.vy
    });
}