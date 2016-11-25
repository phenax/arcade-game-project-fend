
/**
 * Powerup super class
 */
function PowerUp() {

	this.visible= true;

	this.pos= {};
}

PowerUp.prototype.toggle= function() {
	this.visible= !this.visible;
};

PowerUp.prototype.randomizePos = function() {

	var getRandomNum= function() {
		return Math.floor(Math.random()*4);
	}

	this.pos.x
};



function HealthPowerUp() {

	PowerUp.call(this, null);

	this.sprite = 'images/Heart.png';
}

HealthPowerUp.prototype= Object.create(PowerUp.prototype);

HealthPowerUp.prototype.activate= function() {
	player.addHealth(1);
};
