// conseguir elemento
let playButton = document.getElementById ("play");

//cuando hago click en play llama a la funcion game.init
playButton.addEventListener ("click", () => game.init ());

//accedo al lienzo y lo guardo en una variable
let canvas = document.getElementById ("canvas1");

const game = {
	
	ctx: undefined,
	canvasWidth: undefined,
	canvasHeight: undefined,
	paddle: undefined,
	lastTime: 0,
	deltaTime: 0,
	timestamp: 0,
	intervalId: undefined,
	game: undefined,


	init (){

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
		this.canvasWidth = 800;
		this.canvasHeight = 600;
		canvas.setAttribute("width", this.canvasWidth);
		canvas.setAttribute("height", this.canvasHeight);
	},

	//loop del juego, aqui ocurren las cosas
	gameLoop () {
		this.timestamp ++;
//		console.log("frameCounter: " + this.timestamp)
		this.deltaTime = this.timestamp - this.lastTime;
		this.lastTime = this.timestamp;

//		console.log(this.game)

		this.clearCanvas ();

		this.game.update (this.deltaTime);
		this.game.draw (this.ctx);

		this.intervalId = requestAnimationFrame (()=>this.gameLoop())
	}

} 