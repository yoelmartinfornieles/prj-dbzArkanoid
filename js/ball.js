class Ball {
	constructor (canvasWidth, canvasHeight) {
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;
		this.image = new Image;
		this.image.src = `/assets/images/ball${Math.floor(Math.random() * 1)}.png`
		this.speed = {x: 4, y: 2}
		this.position = {x: 10, y:10}
		this.radius = 16;
	}

draw (ctx) {
	ctx.drawImage (this.image, this.position.x, this.position.y, this.radius, this.radius);
}

update (deltatime) {
	this.position.x += this.speed.x ;
	this.position.y += this.speed.y ; 

	console.log (this.position.y)

	if (this.position.x > this.canvasWidth - this.radius || 
		this.position.x < 0 ){
			this.speed.x = -this.speed.x;
		}
	if (this.position.y > this.canvasHeight - this.radius || 
		this.position.y < 0 ){
			this.speed.y = -this.speed.y;
		}
}

}