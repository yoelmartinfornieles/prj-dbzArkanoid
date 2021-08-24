class Paddle {
	constructor (canvasWidth, canvasHeight) {
		this.width = 150;
		this.height = 20;

		this.position = {
			x: canvasWidth/2 - this.width/2 ,
			y: canvasHeight - this.height - 10
		}

		this.speed = 0;
		this.maxSpeed = 7;

		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;

	
	
	}

	draw(ctx) {
		
	ctx.fillStyle = "green";
	ctx.fillRect (this.position.x, this.position.y, this.width, this.height);
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