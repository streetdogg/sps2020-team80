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

        if (this.x < this.radius|| this.x > width - this.radius) {
            this.vx *= -1;
        }
        if (this.y < this.radius || this.y > height - this.radius*2) {
            this.vy *= -1;
        }
    }
}