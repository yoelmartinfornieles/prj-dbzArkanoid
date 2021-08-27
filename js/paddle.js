class Paddle {
	constructor (game) {
		this.width = 190;
		this.height = 60;

		this.position = {
			x: game.canvasWidth/2 - this.width/2 ,
			y: game.canvasHeight - this.height
		}

		this.speed = 0;
		this.maxSpeed = 12;

		this.canvasWidth = game.canvasWidth;
		this.canvasHeight = game.canvasHeight;

		this.image = new Image;
		this.image.src = `/assets/images/paddle.png`


	}

	reset () {
		this.position = {x: game.canvasWidth/2 - this.width/2, y: game.canvasHeight - this.height}
		//console.log ("aqui")
		this.speed = 0;
	}

	draw(ctx) {
		
	//ctx.fillStyle = "green";
	//ctx.fillRect (this.position.x, this.position.y, this.width, this.height);

	ctx.drawImage (this.image, this.position.x, this.position.y, this.width, this.height);
	}

	moveLeft(){
		this.speed = -this.maxSpeed;
	}

	moveRight(){
		this.speed = this.maxSpeed;
	}

	update(deltaTime) {
		if (!deltaTime) return; 
		this.position.x += this.speed;

		if(this.position.x <0){
			this.position.x = 0;
		}

		if(this.position.x + this.width > this.canvasWidth){
			this.position.x = this.canvasWidth - this.width;
		}
	}

	stop(){
		this.speed = 0;
	}

}