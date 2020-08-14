function ball() {
    this.x = width / 2;
    this.y = height / 2;
    this.radius = 20;
    var r = floor(random(2));
    this.vx = (r===0) ? -5:5;
    this.vy = 5;
    this.hit = false;
    this.color = {r: 160, g: 78, b: 180};

    this.show = function() {
        fill(b.color.r, b.color.g, b.color.b);
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

    this.collide = function(p) {
        this.hit = collideRectCircle(p.x, p.y, p.w, p.h, this.x, this.y, this.radius * 2);
        return this.hit;
    }

    this.colorChange = function() {
        const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
        this.color.r =  randomBetween(0, 255);
        this.color.g =  randomBetween(0, 255);
        this.color.b =  randomBetween(0, 255);
    }
}