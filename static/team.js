var ID;
var players = [];
var points;

function team(a) {    
    this.setup = function() {
        this.ID = a;
        this.players = [];
        this.points = 0;
    }

    this.show = function() {
        for(p of this.players) {
            p.show();
        }
    }
 
    this.move = function(y) {
        for(p of this.players) {
            p.move(y);
        }
    }

    this.addPlayer = function(teamName, playerName) {
        var newPlayer;
        console.log('adding new player ' + playerName+' to the team '+teamName);
        if(teamName == "A") {
            newPlayer = new player(10,height/2, playerName);
        } else {
            newPlayer = new player(width-10, height/2, playerName);
        }
        this.players.push(newPlayer);
        console.log('Team '+teamName+'has these following players: ');
        console.log(this.players);

    }

    this.remove = function(playerIndex) {
        this.players.splice(playerIndex, playerIndex+1);
    }
} 