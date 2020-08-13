var ID;
var player1;
var player2;
var player3;
var points;

function team(a) {    
    this.setup = function() {
        this.ID = a;
        if(this.ID === 1) {
        this.player1 = new player(10, height / 2);
        this.player2 = new player(50, height / 2);
        this.player3 = new player(100, height / 2);
    }
    else {
        this.player1 = new player(width - 30, height / 2);
        this.player2 = new player(width - 70, height / 2);
        this.player3 = new player(width - 110, height / 2);        
    }
        this.points = 0;
    }

    this.show = function() {
        this.player1.show();
        this.player2.show();
        this.player3.show();
    }
 
    this.move = function(y) {
        this.player1.move(y);
        this.player2.move(y);
        this.player3.move(y);
    }
} 