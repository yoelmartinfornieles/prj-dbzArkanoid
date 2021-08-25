class Brick {
	constructor (game, position){
		this.game = game;
		this.canvasWidth = game.canvasWidth;
		this.canvasHeight = game.canvasHeight;
		this.image = new Image();
		this.image.src = `../assets/images/nube${Math.floor(Math.random() * 6)}.png`
		this.position = position;
		this.width = 80, 
		this.height = 60,
		this.destroyed = false;
	}

	draw (ctx) {
		ctx.drawImage (this.image, this.position.x, this.position.y, this.width, this.height);
	}

	update (deltatime) {
		//console.log (this)
		//console.log ("colision: " + detectCollision (this.game.ball, this))
		if (detectCollision (this.game.ball, this)) {
			this.game.ball.speed.y = -this.game.ball.speed.y;
			//this.game.ball.speed.x = -this.game.ball.speed.x;
			this.destroyed = true;
		}
	}
	
}