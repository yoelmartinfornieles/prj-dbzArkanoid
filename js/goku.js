class Goku {
	constructor () {
		this.width = 100;
		this.height = 130;
		this.position = {x: 10 , y: 160};
		this.animation = new Image ();
		this.animation.src = "/assets/animations/goku.png";
		this.spriteWidth = 40;
		this.spriteHeight = 60;
		this.spriteX = 0;
		this.spriteY = 0;
		this.refreshCounter = 0;
		this.speed = 20;
		
	}

	update () {
		console.log ("refreshcounter: " + this.refreshCounter)
		console.log ("frameCounter: " + this.frameCounter)

		this.refreshCounter ++;
	}

	spriteHandler () {
		//console.log ("goku.spritehandler")
		if (this.refreshCounter % this.speed === 0) {
			this.spriteX ++;
			if (this.spriteX === 8){
				this.spriteX = 0;
			}
		}
	}

	draw (ctx){
		//console.log ("goku.draw")
		//console.log ("ctx:" + ctx);
		ctx.drawImage(this.animation, this.spriteX * this.spriteWidth, this.spriteY, this.spriteWidth, this.spriteHeight, 400, 550, this.width, this.height)
	}


}