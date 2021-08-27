const gameState = {
	pause: 0,
	running: 1,
	menu: 2,
	gameOver: 3,
	newLevel: 4, 
	gameCompleted: 5
};

class Game {
	constructor (canvasWidth, canvasHeight) {
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;
		this.gameState = gameState.menu;
		this.paddle = new Paddle (this);
		this.ball = new Ball (this);
		this.goku = new Goku (this);
		//this.kame = new Kame (this);
		new InputHandler (this.paddle, this); 
		this.gameObjects = [];
		this.bricks = [];
		this.lives = 5;
		this.levels = [level1, level2, level3, level4, level5, level6, level7];
		this.currentLevel = 0;
		this.gameCompletedImage = new Image ();
		this.gameCompletedImage.src = "https://raw.githubusercontent.com/yoelmartinfornieles/prj-dbzArkanoid/main/assets/images/Gamecompleted.jpg"
		this.menuImage = new Image ();
		this.menuImage.src = "https://raw.githubusercontent.com/yoelmartinfornieles/prj-dbzArkanoid/main/assets/images/startPicture.jpg";
		this.gameOverImage = new Image ();
		this.gameOverImage.src = "https://raw.githubusercontent.com/yoelmartinfornieles/prj-dbzArkanoid/main/assets/images/GameOver.jpg";
		this.backgroundImage = new Image ();
		//this.backgroundImage.src = `https://raw.githubusercontent.com/yoelmartinfornieles/prj-dbzArkanoid/main/assets/images/background${this.currentLevel}.jpeg`;
		//this.backgroundImage.src = `https://raw.githubusercontent.com/yoelmartinfornieles/prj-dbzArkanoid/main/assets/images/background1.png`;
		this.backgroundImage.src = `https://raw.githubusercontent.com/yoelmartinfornieles/prj-dbzArkanoid/main/assets/images/background1.png`;
		this.liveImage = new Image ();
		this.liveImage.src = "https://raw.githubusercontent.com/yoelmartinfornieles/prj-dbzArkanoid/main/assets/images/lives.png"; 
		this.ctx = undefined;
		this.mainSong = new Audio();
		this.mainSong.src = "https://raw.githubusercontent.com/yoelmartinfornieles/prj-dbzArkanoid/main/assets/sounds/main song.mp3"
		this.startAudio = new Audio();
		this.startAudio.src = "https://raw.githubusercontent.com/yoelmartinfornieles/prj-dbzArkanoid/main/assets/sounds/gamestart.ogg"
		this.gamecompletedAudio = new Audio ();
		this.gamecompletedAudio.src = "https://raw.githubusercontent.com/yoelmartinfornieles/prj-dbzArkanoid/main/assets/sounds/start.mp3"

	}

	start () {
		this.startAudio.play ();
		this.gamecompletedAudio.play();
		if (this.gameState !== gameState.menu && 
			this.gameState !== gameState.newLevel
			)	 
			{ 
				return;
			}
		this.startAudio.play ();
		//crear multiples bricks
		this.bricks = buildLevel (this, this.levels[this.currentLevel]);

		this.ball.reset ();
		this.paddle.reset ();

		this.gameObjects = [this.ball, this.paddle]

		this.gameState = gameState.running;

	}

	update (deltaTime) {

		if (this.lives === 0){
			this.gameState = gameState.gameOver;
		}


		if (
			this.gameState === gameState.pause ||
			this.gameState === gameState.menu ||
			this.gameState === gameState.gameOver ||
			this.gameState === gameState.newLevel
			){
			return; //no actualizamos nada
		}

		if (this.bricks.length === 0) {

			this.currentLevel++;
			this.gameState = gameState.newLevel;

			if (this.levels.length <= this.currentLevel) {
				console.log ("gameFinished")
				this.gameState = gameState.gameCompleted;	
/* 				console.log ("should be gameCompleted: " +this.gameState)
				console.log ("and should match: "+ gameState.gameCompleted)
				console.log ("So it gives: " + (this.gameState === gameState.gameCompleted)) */
				//Gamecompleted draw
				if (this.gameState === gameState.gameCompleted){
					game.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
					game.ctx.drawImage(this.gameCompletedImage,0,0,this.canvasWidth, this.canvasHeight);
					
					this.gamecompletedAudio.play ();

					game.ctx.font = "45px DBZfont";
					game.ctx.strokeStyle = "black";
					game.ctx.lineWidth = 8;
					game.ctx.textAlign = "center";
					game.ctx.strokeText ("CONGRATULATIONS!", this.canvasWidth/2, this.canvasHeight/2);
					game.ctx.strokeText ("You got the seven mystic Dragon Balls...", this.canvasWidth/2, this.canvasHeight/2 + 40);
					game.ctx.strokeText ("What will you ask to Shenron?", this.canvasWidth/2, this.canvasHeight/2 + 80);

					game.ctx.font = "45px DBZfont";
					game.ctx.fillStyle = "red";
					game.ctx.textAlign = "center";
					game.ctx.fillText ("CONGRATULATIONS!", this.canvasWidth/2, this.canvasHeight/2);
					game.ctx.fillText ("You got the seven mystic Dragon Balls...", this.canvasWidth/2, this.canvasHeight/2 + 40);
					game.ctx.fillText ("What will you ask to Shenron?", this.canvasWidth/2, this.canvasHeight/2 + 80);
				}	
				return;
			}

			this.start ();
		}

		//console.log ("deltaTime: " + deltaTime);
		//console.log ("this.game: " + this);

		if (deltaTime % 2000 === Math.floor(Math.random () * 10)){
			//console.log ("HADOUKEN!")
			let powerUp = new PowerUp (this, {x: Math.floor(( Math.random()*(this.canvasWidth-80))), y:Math.floor(( Math.random()*(this.canvasHeight)-80))});
			this.bricks.push (powerUp);
		}

		if (deltaTime % 3000 === Math.floor(Math.random () * 10)){
			let extraLife = new ExtraLife (this, {x: Math.floor(( Math.random()*(this.canvasWidth-80))), y:Math.floor(( Math.random()*(this.canvasHeight)-80))});
			this.bricks.push (extraLife);
		}

		let totalArray  = [...this.gameObjects, ...this.bricks];

		totalArray.forEach ((object) => {object.update(deltaTime)})

		this.bricks = this.bricks.filter((object) => {return !object.destroyed});

	}

	draw (ctx) {

		this.ctx = ctx;
		
		let totalArray  = [...this.gameObjects, ...this.bricks];

		if (this.gameState !== gameState.gameCompleted){

		this.backgroundImage.src = `https://raw.githubusercontent.com/yoelmartinfornieles/prj-dbzArkanoid/main/assets/images/background${this.currentLevel+1}.png`;

		game.ctx.drawImage(this.backgroundImage,0,0,this.canvasWidth, this.canvasHeight);

		totalArray.forEach ((object) => {object.draw(ctx)})


		}

		//Life draw

		if(this.gameState === gameState.running || this.gameState === gameState.pause) {
			let initialPos = 35;
			for (let i = 0; i<this.lives; i ++){
				ctx.drawImage (this.liveImage, 20 + i*initialPos, initialPos-30, initialPos -5, initialPos -5);
			}
		}

		//Level draw

		if(this.gameState === gameState.running || this.gameState === gameState.pause) {

 			ctx.font = "30px DBZfont";
			ctx.strokeStyle = "black";
			game.ctx.lineWidth = 8;
			ctx.textAlign = "center";
			ctx.strokeText (`Level: ${this.currentLevel+1}`, 930, 30); 
			
			
			ctx.font = "30px DBZfont";
			ctx.fillStyle = "red";
			ctx.textAlign = "center";
			ctx.fillText (`Level: ${this.currentLevel+1}`, 930, 30);

		}

		//Paused draw 

		if (this.gameState === gameState.pause){
			ctx.rect(0,0, this.canvasWidth, this.canvasHeight);
			ctx.fillStyle = "rgba(0,0,0,0.5)";
			ctx.fill();

			ctx.font = "200px DBZfont";
			ctx.strokeStyle = "black";
			game.ctx.lineWidth = 8;
			ctx.textAlign = "center";
			ctx.strokeText ("Kame...", this.canvasWidth/2, this.canvasHeight/2);
			ctx.strokeText ("...Hame", this.canvasWidth/2, this.canvasHeight/2 + 160);

			ctx.font = "200px DBZfont";
			ctx.fillStyle = "red";
			ctx.textAlign = "center";
			ctx.fillText ("Kame...", this.canvasWidth/2, this.canvasHeight/2);
			ctx.fillText ("...Hame", this.canvasWidth/2, this.canvasHeight/2 + 160);


		}

		//Menu draw 

		if (this.gameState === gameState.menu){
			ctx.rect(0,0, this.canvasWidth, this.canvasHeight);

			ctx.fillStyle = "rgba(0,0,0,1)";
			ctx.fill(); 

			game.ctx.drawImage(this.menuImage,-200,200,this.canvasWidth, this.canvasHeight);

			ctx.font = "80px DBZfont";
			ctx.strokeStyle = "rgb(240,198,97)";
			game.ctx.lineWidth = 8;
			ctx.textAlign = "center";
			ctx.strokeText (`Press the "s" key`, this.canvasWidth/2 +150, this.canvasHeight/2-200);
			ctx.strokeText (`to start the search`, this.canvasWidth/2 +150, this.canvasHeight/2-100);

			ctx.font = "80px DBZfont";
			ctx.fillStyle = "rgb(172,60,49)";
			ctx.textAlign = "center";
			ctx.fillText (`Press the "s" key`, this.canvasWidth/2 +150, this.canvasHeight/2-200);
			ctx.fillText (`to start the search`, this.canvasWidth/2 +150, this.canvasHeight/2-100);

		}	

		//GameOver draw

		if (this.gameState === gameState.gameOver){
			ctx.rect(0,0, this.canvasWidth, this.canvasHeight);

			ctx.fillStyle = "rgba(0,0,0,1)";
			ctx.fill(); 

			game.ctx.drawImage(this.gameOverImage,0,0,this.canvasWidth +20, this.canvasHeight+20);

			ctx.font = "80px DBZfont";
			ctx.strokeStyle = "black";
			game.ctx.lineWidth = 8;
			ctx.textAlign = "center";
			ctx.strokeText (`GAME OVER!`, this.canvasWidth/2 -120, this.canvasHeight/2+200);
			ctx.strokeText (`You should train more...`, this.canvasWidth/2 -120, this.canvasHeight/2+100);

			ctx.font = "80px DBZfont";
			ctx.fillStyle = "rgb(172,60,49)";
			ctx.textAlign = "center";
			ctx.fillText (`GAME OVER!`, this.canvasWidth/2 -120, this.canvasHeight/2+200);
			ctx.fillText (`You should train more...`, this.canvasWidth/2 -120, this.canvasHeight/2+100);

		}	


	
	}

	togglePause () {
		if (this.gameState == gameState.pause){
			this.gameState = gameState.running;
		} else {
			this.gameState = gameState.pause;
		}
	}
}


