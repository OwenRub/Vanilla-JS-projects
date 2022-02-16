function Particle(p){
	this.pos = p.createVector(p.random(p.width),p.random(p.height));
	this.vel = p.createVector(0,0);
	this.acc = p.createVector(0,0);
	this.MAX_SPEED = 3;
	this.p = p;

	this.update = function () {
		this.pos.add(this.vel);
		this.vel.add(this.acc);
		this.vel.limit(this.MAX_SPEED);
		this.acc.mult(0);
	}

	this.follow = function (vec) {
		let x = this.p.floor(this.pos.x / this.p.scale);
		let y = this.p.floor(this.pos.y / this.p.scale);
		let index = x + y * this.p.cols;
		this.applyForce(vec[index]);
	}

	this.applyForce = function (vec) {
		this.acc.add(vec);
	}

	this.show = function () {
		this.p.point(this.pos);
	}

	this.edges = function () {
		if (this.pos.x > this.p.width){
			this.pos.x = 0;
		}
		if(this.pos.x < 0){
			this.pos.x = this.p.width;
		}
		if(this.pos.y > this.p.height){
			this.pos.y = 0;
		}
		if(this.pos.y < 0){
			this.pos.y = this.p.height;
		}
	}

}