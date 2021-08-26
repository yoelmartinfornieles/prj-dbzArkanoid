window.onload = () => {
	game.init();
}
let canvas = document.getElementById("canvas1")

/* // conseguir elemento
let playButton = document.getElementById ("play");

//cuando hago click en play llama a la funcion game.init
playButton.addEventListener ("click", () => game.init ());

//accedo al lienzo y lo guardo en una variable
let canvas = document.getElementById ("canvas1"); */

const game = {
	
	ctx: undefined,
	canvasWidth: undefined,
	canvasHeight: undefined,
	paddle: undefined,
	timestamp: 0,
	intervalId: undefined,
	game: undefined,

	init (){
		console.log("no cotilles la consola...")

		this.ctx = canvas.getContext ("2d");
		this.setCanvasDimensions ();

		this.clearCanvas ();

		this.game = new Game (this.canvasWidth,this.canvasHeight);
		//this.game.start();

		this.gameLoop ();

	},

	clearCanvas (){
		this.ctx.clearRect (0,0,this.canvasWidth,this.canvasHeight);
	},
	
	setCanvasDimensions () {
		this.canvasWidth = 1000;
		this.canvasHeight = 700;
		canvas.setAttribute("width", this.canvasWidth);
		canvas.setAttribute("height", this.canvasHeight);
	},

	//loop del juego, aqui ocurren las cosas
	gameLoop () {

		this.timestamp ++;

//		console.log(this.game)

		this.clearCanvas ();

		this.game.update (this.timestamp);
		this.game.draw (this.ctx);

		this.intervalId = requestAnimationFrame (()=>this.gameLoop())

		if (this.game.gameState === gameState.gameOver){ 
			cancelAnimationFrame (this.intervalId);
			setTimeout ( () => 	game.init(), 5000) 
		}

		if (this.game.gameState === gameState.gameCompleted){ 
			cancelAnimationFrame (this.intervalId);
			setTimeout ( () => 	game.init(), 10000) 
			
		}

		if (this.game.gameState === gameState.pause ){
			this.game.goku.update ();
			this.game.goku.spriteHandler ();
			//console.log (this.game.ctx)
			this.game.goku.draw (this.game.ctx)

/* 			this.game.kame.update ();
			this.game.kame.spriteHandler ();
			//console.log (this.game.ctx)
			this.game.kame.draw (this.game.ctx) */
		}
		
	}

} 