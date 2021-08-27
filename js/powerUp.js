class PowerUp {
	constructor (game, position){
		this.game = game;
		this.canvasWidth = game.canvasWidth;
		this.canvasHeight = game.canvasHeight;
		this.image = new Image();
		this.image.src = "/assets/images/radar.png"
		//this.image.src = `https://raw.githubusercontent.com/yoelmartinfornieles/prj-dbzArkanoid/main/assets/images/radar.png`
		this.position = position;
		this.width = 30, 
		this.height = 40,
		this.active = false;
		this.powerUpAudio = new Audio ();
		this.powerUpAudio.src = "/assets/sounds/powerup.ogg"
	}

	draw (ctx) {
		ctx.rect(0,0, this.canvasWidth, this.canvasHeight);
		ctx.drawImage (this.image, this.position.x, this.position.y, this.width, this.height);

	}

	update (deltatime) {

		this.position.y += 3 ;

		if (detectCollision (this.game.ball, this)) {
			this.game.ball.speed.y = -this.game.ball.speed.y;
				this.active = true;
				this.destroyed =true;
				this.activatePowerUp();
		}

		if (this.position.x > this.canvasWidth || 
			this.position.x < 0 || 
			this.position.y > this.canvasHeight || 
			this.position.y < 0)
			{
				this.destroyed = 1;
			}
	}

	activatePowerUp () {
		this.powerUpAudio.play ();
		this.game.bricks.forEach ( (brick) => brick.destroyed = true );
	}
	
}