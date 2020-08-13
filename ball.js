function ball() {
    this.x = width / 2;
    this.y = height / 2;
    this.radius = 20;
    var r = floor(random(2));
    this.vx = (r===0) ? -5:5;
    this.vy = 5;

    this.show = function() {
        ellipse(this.x,this.y,this.radius,this.radius);
    }

    this.move = function() {
        this.y += this.vy;
        this.x += this.vx;
    }
}