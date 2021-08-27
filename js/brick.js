class Brick {
	constructor (game, position, impacts){
		this.game = game;
		this.canvasWidth = game.canvasWidth;
		this.canvasHeight = game.canvasHeight;
		this.image = new Image();
		this.image.src = `https://raw.githubusercontent.com/yoelmartinfornieles/prj-dbzArkanoid/main/assets/images/nube${impacts}.png`
		this.position = position;
		this.width = 80, 
		this.height = 60,
		this.leftImpacts = impacts;
		this.destroyed = false;
		this.collisionAudio = new Audio ();
		this.collisionAudio.src = "/assets/sounds/bRick.wav"
	}

	draw (ctx) {
		ctx.drawImage (this.image, this.position.x, this.position.y, this.width, this.height);
	}

	update (deltatime) {
		//console.log (this)
		//console.log ("colision: " + detectCollision (this.game.ball, this))
		if (detectCollision (this.game.ball, this)) {
			this.collisionAudio.play ();
			this.game.ball.speed.y = -this.game.ball.speed.y;
			//this.game.ball.speed.x = -this.game.ball.speed.x;
			this.leftImpacts--;
			if(this.leftImpacts === 0){
				this.destroyed = true;
			}
		}
	}
	
}