
/**
 * Powerup super class
 */
function PowerUp() {

	this.visible= true;

	this.pos= {};
	this.randomization= {};
	this.size= { x: 80, y: 130 };
}

PowerUp.prototype.setSprite= function(sprite) {
	this.sprite= sprite;
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

PowerUp.prototype.init= function() {

	this.randomizePos(this.randomization);

	this.toggle();
};

PowerUp.prototype.draw= function() {

	ctx.drawImage(
		Resources.get(this.sprite), 
		this.pos.x, this.pos.y, 
		this.size.x, this.size.y
	);
}




function HealthPowerUp() {

	PowerUp.call(this, null);

	this.setSprite('images/Heart.png');
}

HealthPowerUp.prototype= Object.create(PowerUp.prototype);

HealthPowerUp.prototype.activate= function() {
	player.addHealth(1);
};





function StarPowerUp() {

	PowerUp.call(this, null);

	this.randomization= {
		xMin: 0,
		xMax: 5,
		yMin: 0,
		yMax: 0
	};

	this.setSprite('images/Star.png');
}

StarPowerUp.prototype= Object.create(PowerUp.prototype);

StarPowerUp.prototype.activate= function() {
	myGame.score+= 1;
};
