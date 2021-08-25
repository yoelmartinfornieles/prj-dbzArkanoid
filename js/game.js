const gameState = {
	pause: 0,
	running: 1,
	menu: 2,
	gameOver: 3,
	newLevel: 4, 
	gameCompleted: 5
};

class Game {
	constructor (canvasWidth, canvasHeight) {
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;
		this.gameState = gameState.menu;
		this.paddle = new Paddle (this);
		this.ball = new Ball (this);
		new InputHandler (this.paddle, this); 
		this.gameObjects = [];
		this.bricks = [];
		this.lives = 5;

		this.levels = [level1, level2];
		this.currentLevel = 0;
	}

	start () {
		if (this.gameState !== gameState.menu && this.gameState !== gameState.newLevel) {
			return;
		}

		//crear multiples bricks
		this.bricks = buildLevel (this, this.levels[this.currentLevel]);

		this.ball.reset ();
		this.paddle.reset ();

		this.gameObjects = [this.ball, this.paddle]

		this.gameState = gameState.running;

	}

	update (deltaTime) {

		if (this.lives === 0){
			this.gameState = gameState.gameOver;
		}

		if (
			this.gameState === gameState.pause ||
			this.gameState === gameState.menu ||
			this.gameState === gameState.gameOver
			){
			return; //no actuaizamos nada
		}

		if (this.bricks.length === 0) {


/* 			if (this.levels.length === this.currentLevel-1) {
				console.log ("gameFinished")
				this.gameState === gameState.gameCompleted;	
			} */

			console.log("No bricks");
			this.currentLevel++;
			this.gameState = gameState.newLevel;
			this.start ();
		}

		let totalArray  = [...this.gameObjects, ...this.bricks];

		totalArray.forEach ((object) => {object.update(deltaTime)})

		this.bricks = this.bricks.filter((object) => {return !object.destroyed});

	}

	draw (ctx) {
		
		let totalArray  = [...this.gameObjects, ...this.bricks];

		totalArray.forEach ((object) => {object.draw(ctx)})

		//Life draw

		if(this.gameState === gameState.running || this.gameState === gameState.pause) {
			let liveImage = new Image ();
			liveImage.src = "https://yoelmartinfornieles.github.io/pry-arkanoid/assets/images/lives.png"; 
			let initialPos = 35;
			for (let i = 0; i<this.lives; i ++){
				ctx.drawImage (liveImage, 20 + i*initialPos, initialPos-30, initialPos -5, initialPos -5);
			}
		}

		//Paused draw 

		if (this.gameState === gameState.pause){
			ctx.rect(0,0, this.canvasWidth, this.canvasHeight);
			ctx.fillStyle = "rgba(0,0,0,0.5)";
			ctx.fill();

			ctx.font = "30px Arial";
			ctx.fillStyle = "white";
			ctx.textAlign = "center";
			ctx.fillText ("Paused", this.canvasWidth/2, this.canvasHeight/2);

		}

		//Menu draw 

		if (this.gameState === gameState.menu){
			ctx.rect(0,0, this.canvasWidth, this.canvasHeight);
			ctx.fillStyle = "rgba(0,0,0,1)";
			ctx.fill();

			ctx.font = "30px Arial";
			ctx.fillStyle = "white";
			ctx.textAlign = "center";
			ctx.fillText ("Press SPACEBAR to start the search", this.canvasWidth/2, this.canvasHeight/2);

		}	

		//GameOver draw

		if (this.gameState === gameState.gameOver){
			ctx.rect(0,0, this.canvasWidth, this.canvasHeight);
			ctx.fillStyle = "rgba(0,0,0,1)";
			ctx.fill();

			ctx.font = "30px Arial";
			ctx.fillStyle = "white";
			ctx.textAlign = "center";
			ctx.fillText ("Game Over!", this.canvasWidth/2, this.canvasHeight/2);

		}	
	
	}

	togglePause () {
		if (this.gameState == gameState.pause){
			this.gameState = gameState.running;
		} else {
			this.gameState = gameState.pause;
		}
	}
}


