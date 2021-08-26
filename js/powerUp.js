class PowerUp {
	constructor (game, position){
		this.game = game;
		this.canvasWidth = game.canvasWidth;
		this.canvasHeight = game.canvasHeight;
		this.image = new Image();
		this.image.src = "/assets/images/radar.png"
		//this.image.src = `https://raw.githubusercontent.com/yoelmartinfornieles/prj-dbzArkanoid/main/assets/images/radar.png`
		this.position = position;
		this.width = 60, 
		this.height = 70,
		this.active = false;
	}

	draw (ctx) {
		ctx.drawImage (this.image, this.position.x, this.position.y, this.width, this.height);

	}

	update (deltatime) {
		if (detectCollision (this.game.ball, this)) {
			this.game.ball.speed.y = -this.game.ball.speed.y;
				this.active = true;
				this.destroyed =true;
				this.activatePowerUp();
				
		}
	}

	activatePowerUp () {
		this.game.bricks.forEach ( (brick) => brick.destroyed = true );
	}
	
}
