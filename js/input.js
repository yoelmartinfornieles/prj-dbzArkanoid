class InputHandler {
	constructor (paddle, game){
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

				case 80: 
				game.start();
				break;
			}	
		})
	}
}