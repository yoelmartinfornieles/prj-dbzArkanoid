class Brick {
	constructor (game, position){
		this.game = game;
		this.canvasWidth = game.canvasWidth;
		this.canvasHeight = game.canvasHeight;
		this.image = new Image();
		this.image.src = "/assets/images/block.png"
		this.position = position;
		this.size = {width: 80, height: 24}
	}

	draw (ctx) {
		ctx.drawImage (this.image, this.position.x, this.position.y, this.size.width, this.size.height);
	}

	update (deltatime) {

	}
	
}