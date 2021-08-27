class InputHandler {
	constructor (paddle, game){
		this.dragonBall = new Audio ();
		this.dragonBall.src = "https://raw.githubusercontent.com/yoelmartinfornieles/prj-dbzArkanoid/main/assets/sounds/start.mp3"
		document.addEventListener('keydown', event => {
			//alert (event.keyCode);
			switch (event.keyCode){
				case 37:
				paddle.moveLeft();
				break;

				case 39:
				paddle.moveRight();
				break;

				//Hidden cheats
				case 51:
				game.lives++;
				break;

				case 54:
					let powerUp = new PowerUp (game, {x: Math.floor(( Math.random()*game.canvasWidth)), y:Math.floor(( Math.random()*game.canvasWidth))});
					//console.log("hello: " + powerUp.position.x)
					game.bricks.push (powerUp);
				break;

				case 57:
				game.currentLevel++;
				break;
			}
		})

		document.addEventListener('keyup', event => {
			//alert (event.keyCode);

			switch (event.keyCode){

				case 37:
				if (paddle.speed < 0){
				paddle.stop();
				}
				break;

				case 39:
				if (paddle.speed > 0){
				paddle.stop();
				}
				break;

				case 27:
				game.togglePause ();
				break;

				case 83: 
				this.dragonBall.play ();
				game.start();
				break;
			}	
		})
	}
}