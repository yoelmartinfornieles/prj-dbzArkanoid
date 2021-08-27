class ExtraLife {
	constructor (game, position){
		this.game = game;
		this.canvasWidth = game.canvasWidth;
		this.canvasHeight = game.canvasHeight;
		this.image = new Image();
		this.image.src = "https://raw.githubusercontent.com/yoelmartinfornieles/prj-dbzArkanoid/main/assets/images/extraLife.png"
		this.position = position;
		this.width = 40, 
		this.height = 40,
		this.active = false;
		this.extraLifeAudio = new Audio();
		this.extraLifeAudio.src = "https://raw.githubusercontent.com/yoelmartinfornieles/prj-dbzArkanoid/main/assets/sounds/extralife.ogg"
	}

	draw (ctx) {
		ctx.rect(0,0, this.canvasWidth, this.canvasHeight);
		ctx.drawImage (this.image, this.position.x, this.position.y, this.width, this.height);

	}

	update (deltatime) {

		this.position.y += 2 ;

		if (detectCollision (this.game.ball, this)) {
			this.game.ball.speed.y = -this.game.ball.speed.y;
				this.active = true;
				this.destroyed =true;
				this.getLive();
		}

		if (this.position.x > this.canvasWidth || 
			this.position.x < 0 || 
			this.position.y > this.canvasHeight || 
			this.position.y < 0)
			{
				this.destroyed = 1;
			}
	}

	getLive () {
		this.extraLifeAudio.play ();
		this.game.lives++;
	}
	
}