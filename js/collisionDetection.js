
function detectCollision (ball, object){

let ballTop = ball.position.y;
let ballLeft = ball.position.x;
let ballRight = ball.position.x + ball.radius
let ballBottom = ball.position.y + ball.radius;

let objectTop = object.position.y;
let objectLeft = object.position.x;
let objectRight = object.position.x + object.width;
let objectBottom = object.position.y + object.height;

/* console.log("1: "+ object.position.x)
console.log("2: "+ object.width)
console.log("3: " )
console.log("4: " )
console.log("5: "+ objectRight)
console.log("6: " ) */

if ((ballBottom >= objectTop) && 
	(ballTop <= objectBottom) &&
	(objectLeft <= ballRight) && 
	(ballLeft <= objectRight)){
	//console.log ("Collision!")
		return (true);
}	else {
		return (false);
}

}