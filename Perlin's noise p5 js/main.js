/* This sketch draws the values obtained by the noise function
   for a set of 1 dimention */
const sketch1 = function (p) {
	p.inc = 0.01;
	document.getElementById('placeholder').innerHTML = p.inc;
	document.forms["myform"]["noise"].addEventListener('click', () => {
		p.inc = Number(document.forms["myform"]["noise"].value);
		document.getElementById('placeholder').innerHTML = p.inc;
	})
	p.start = 0;

	p.setup = function() {
		p.cnv = p.createCanvas(360, 300);
		p.cnv.parent('sketch1-holder');
	}

	p.draw = function() {
		p.background(40, 74, 102);
		p.stroke(0);
		p.noFill();
		p.beginShape();
		p.xoff = p.start;
		for(let x = 0; x < p.width; x++){
			p.stroke(255);
			p.y = p.noise(p.xoff) * p.height;
			p.vertex(x, p.y);
			p.xoff += p.inc;
		}
		p.endShape();
		p.start += 0.01;
	}
}

/* This sketch creates particles from the particle constructor function and a vector
field that influence the particles */
const sketch2 = function (p) {
	p.inc = 0.05;
	p.zoff = 0;
	p.scale = 20;
	p.particles = [];
	p.forceField = [];

	p.setup = function() {
		p.cnv = p.createCanvas(360, 300);
		p.cnv.parent('sketch2-holder');
		p.cols = p.floor(p.width/p.scale);
		p.rows = p.floor(p.height/p.scale);
		for(let i=0; i < 400; i++){
			p.particles[i] = new Particle(p);
		}
		p.forceField = new Array(p.cols * p.rows);
	}

	p.draw = function() {
		p.background(255);
		p.yoff = 0;
		for(let r = 0; r < p.rows; r++){
			p.xoff = 0; 
			for(let c = 0; c < p.cols; c++){
				p.angle = p.noise(p.xoff, p.yoff, p.zoff) * p.TWO_PI;
				p.v = p5.Vector.fromAngle(p.angle);
				p.v.setMag(0.015);
				p.index = c + r * p.cols;
				p.forceField[p.index] = p.v;
				p.push();
				p.stroke(0, 20);
				p.translate(c*p.scale, r*p.scale);
				p.rotate(p.v.heading());
				p.line(0, 0, p.scale, 0);
				p.pop();	

				p.xoff += p.inc;
			}
			p.yoff += p.inc;
		}
		p.zoff += 0.01;
		p.strokeWeight(2);
		for(let part of p.particles){
			part.follow(p.forceField);
			part.update();
			part.show();
			part.edges();
		}
	}
}

let fisrtSketch = new p5(sketch1);
let secondSketch = new p5(sketch2);







// ORIGINAL GLOBAL ALGORITHM FOR PARTICLES CASE (NOT INSTANCED)
// function setup(){
// 	let cnv = createCanvas(400, 400);
// 	cnv.parent('sketch-holder');
// 	cols = floor(width/scale);
// 	rows = floor(height/scale);
// 	for(let i=0; i < 400; i++){
// 		p[i] = new Particle();
// 	}
// 	forceField = new Array(cols * rows);
// }

// function draw(){
// 	background(180);
// 	let yoff = 0;
// 	for(let y = 0; y < rows; y++){
// 		let xoff = 0; 
// 		for(let x = 0; x < cols; x++){
// 			let angle = noise(xoff, yoff, zoff) * TWO_PI;
// 			let v = p5.Vector.fromAngle(angle);
// 			v.setMag(0.1);
// 			let index = x + y * cols;
// 			forceField[index] = v;
// 			push();
// 			stroke(0, 20);
// 			translate(x*scale, y*scale);
// 			rotate(v.heading());
// 			line(0, 0, scale, 0);
// 			pop();

// 			xoff += inc;
// 		}
// 		yoff += inc;
// 	}
// 	zoff += 0.01;
// 	strokeWeight(2);
// 	for(let part of p){
// 		part.follow(forceField);
// 		part.update();
// 		part.show();
// 		part.edges();
// 	}
// }