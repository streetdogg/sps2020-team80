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
} 