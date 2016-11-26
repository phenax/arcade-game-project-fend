
/**
 * Powerup super class
 */
function PowerUp() {

	Character.call(this);

	this.visible= true;
	this.randomization= {};
	this.size= { x: 80, y: 130 };
}

PowerUp.prototype= Object.create(Character.prototype);


PowerUp.prototype.init= function() {

	this.randomizePos(this.randomization);

	this.toggle();
};

PowerUp.prototype.toggle= function() {
	this.visible= !this.visible;
};

PowerUp.prototype.randomizePos = function(limits) {

	var getRandomNum= function(max, min) {
		return Math.floor(Math.random()*(max - min + 1) + min)*101;
	}

	this.pos.x= getRandomNum(limits.xMin, limits.xMax);
	this.pos.y= getRandomNum(limits.yMin, limits.yMax) + 20;
};




/**
 * Adds life to the player
 */
function HealthPowerUp() {

	PowerUp.call(this, null);

	this.setSprite('images/Heart.png');

	this.randomization= {
		xMin: 0,
		xMax: 5,
		yMin: 1,
		yMax: 3
	};
}

HealthPowerUp.prototype= Object.create(PowerUp.prototype);

HealthPowerUp.prototype.activate= function() {
	player.addHealth(1);
};




/**
 * Increases the points
 */
function StarPowerUp() {

	PowerUp.call(this, null);

	this.setSprite('images/Star.png');

	this.randomization= {
		xMin: 0,
		xMax: 5,
		yMin: 0,
		yMax: 0
	};
}

StarPowerUp.prototype= Object.create(PowerUp.prototype);

StarPowerUp.prototype.activate= function() {
	myGame.score+= 1;
};
