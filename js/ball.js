class Ball {
	constructor (game) {
		this.game = game;
		this.canvasWidth = game.canvasWidth;
		this.canvasHeight = game.canvasHeight;
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

	//colision con las paredes
	
	if (this.position.x > this.canvasWidth - this.radius || 
		this.position.x < 0 ){
			this.speed.x = -this.speed.x;
		}
	if (this.position.y > this.canvasHeight - this.radius || 
		this.position.y < 0 ){
			this.speed.y = -this.speed.y;
		}
	
	// Y si se pega contra el paddle?	

	let ballBottom = this.position.y + this.radius;
	let paddleTop = this.game.paddle.position.y;
	let paddleLeft = this.game.paddle.position.x;
	let paddleRight = this.game.paddle.position.x + this.game.paddle.width;

	if ((ballBottom >= paddleTop) && 
		(paddleLeft <= this.position.x) && 
		(this.position.x + this.radius <= paddleRight)){
		console.log ("colision!")
		this.speed.y = -this.speed.y;
		this.position.y = this.game.paddle.position.y - this.radius;
	}
}

}