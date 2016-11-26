
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player;
var allEnemies= [];
var myGame;


window.canvasDimens= {
	width: 505,
	height: 606,
};


// Enemies our player must avoid
var Enemy = function(speed) {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started

	this.BLOCKSIZE= 80;

	this.speed= speed || 200;

	this.pos= {
		x: -100,
		y: Math.floor(Math.random()*3 + 1)*this.BLOCKSIZE - 30
	};

	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	
	this.pos.x+= dt*this.speed;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.pos.x, this.pos.y);
};
