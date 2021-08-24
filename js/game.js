class Game {
	constructor (canvasWidth, canvasHeight) {
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;
	}

	start () {
		this.paddle = new Paddle (this);
		this.ball = new Ball (this);
		//crear multiples bricks
		let bricks = buildLevel (this, level1)



		this.gameObjects = [this.ball, this.paddle, ...bricks];

		new InputHandler (this.paddle); 
	}

	update (deltaTime) {
		this.gameObjects.forEach ((object) => {object.update(deltaTime)})
	}

	draw (ctx) {
		this.gameObjects.forEach ((object) => {object.draw(ctx)})
	}
}


