class Game {
	constructor (canvasWidth, canvasHeight) {
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;
	}

	start () {
		this.paddle = new Paddle (this);
		this.ball = new Ball (this);


		this.gameObjects = [this.ball, this.paddle];

		new InputHandler (this.paddle); 
	}

	update (deltaTime) {
		this.gameObjects.forEach ((object) => {object.update(deltaTime)})
	}

	draw (ctx) {
		this.gameObjects.forEach ((object) => {object.draw(ctx)})
	}
}


