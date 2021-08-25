function buildLevel (game, level) {
	let bricks = [];
	level.forEach ((row, rowIndex) => {
		row.forEach((brick, brickIndex) => {
			//Si el dato es un uno
			if (brick == 1){
				let position = {x: brickIndex * 80 , y: 75 + (rowIndex * 24) };
				bricks.push(new Brick (game, position))
			}
		});
	});
	return (bricks);
}



//array de arrays --> cada fila 1 para que haya brick, 0 para que no lo haya

/* const level1 = [
[0,1,1,1,1,1,1,1,1,0],
[0,1,1,1,0,0,1,1,1,0],
[0,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,0]
]; */

const level1 = [
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,1,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0]
	];

const level2 = [
	[0,0,0,0,0,0,0,0,0,0],
	[1,1,1,1,1,0,0,0,1,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0]
	];