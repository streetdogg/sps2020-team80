var x;
var y;
var velocity;
var w;
var h;
var points;

function player(a,b) {
    this.x = a;
    this.y = b;
    this.velocity = 4;
    this.w = 10;
    this.h = 80;
    this.points = 0;

    this.show = function() {
        rectMode(CENTER);
        rect(this.x,this.y,this.w,this.h);
    }

    this.move = function(y) {
        this.y = min(height, max(y, 0));
    }
}