class Ball {
	constructor (game) {
		this.game = game;
		this.canvasWidth = game.canvasWidth;
		this.canvasHeight = game.canvasHeight;
		this.image = new Image;
		this.image.src = `../assets/images/ball${Math.floor(Math.random() * 1)}.png`
		this.radius = 16;
		this.reset();
	}

reset () {
	this.speed = {x: 4, y: 8}
	this.position = {x: 280, y:400}
}

draw (ctx) {
	ctx.drawImage (this.image, this.position.x, this.position.y, this.radius, this.radius);
}

update (deltatime) {
	this.position.x += this.speed.x ;
	this.position.y += this.speed.y ; 

	//colision con las paredes laterales

	if (this.position.x > this.canvasWidth - this.radius || 
		this.position.x < 0 ){
			this.speed.x = -this.speed.x;
		}

	//Colision con la pared superior
	if (this.position.y < 0 ){
			this.speed.y = -this.speed.y;
		}

	//Colision con la pared inferior
	if (this.position.y > this.canvasHeight - this.radius){
		this.game.lives --;
		this.reset ();
	}
	
	// Y si se pega contra el paddle?	

	if (detectCollision (this, this.game.paddle)) {
		this.speed.y = -this.speed.y;
		//this.speed.x = -this.speed.x;
		//this.position.y = this.game.paddle.position.y - this.radius;
	}
}

}