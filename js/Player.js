
/**
 * Player class
 */
function Player(speed) {

	// Increment i.e. block size
	this.INCREMENT= canvasDimens.width/5;

	// The default position for the player to reset to
	this.defaultPos= {};
	this.defaultPos.x= window.canvasDimens.width/2 - this.INCREMENT/2;
	this.defaultPos.y= window.canvasDimens.height - 2*this.INCREMENT;

	Character.call(this, Object.create(this.defaultPos), speed || 10);


	// Lower and Upper limit for movement
	this.LOWER_LIMIT= {
		x: 0,
		y: 0
	};

	this.UPPER_LIMIT= {
		x: window.canvasDimens.width - this.INCREMENT,
		y: window.canvasDimens.height - 2*this.INCREMENT
	};

	// Target position to animate to
	this.target= {};

	this.reset();
}

Player.prototype= Object.create(Character.prototype);


/**
 * Reset the player's properties(instead of creating a new instance)
 */
Player.prototype.reset= function() {

	this.health= 5;

	this.resetPosition();
};


/**
 * Reset the position of the player back to the safe spot
 */
Player.prototype.resetPosition= function() {

	this.attachedItem= null;

	this.pos.x= this.defaultPos.x;
	this.pos.y= this.defaultPos.y;

	this.target.x= this.pos.x;
	this.target.y= this.pos.y;
};


/**
 * Add some health to the player's health(increment/decrement)
 * 
 * @param {Number} increment  Value to add to the health
 */
Player.prototype.addHealth= function(increment) {

	if(this.health + increment > 5 || this.health + increment < 0)
		return;

	this.health+= increment;
};


/**
 * Calculation loop
 */
Player.prototype.update= function(dt) {

	// 'Ease out' to the target position
	if(Math.abs(this.target.x - this.pos.x) >= 0.001)
		this.pos.x+= (this.target.x - this.pos.x) * dt * this.speed;

	if(Math.abs(this.target.y - this.pos.y) >= 0.001)
		this.pos.y+= (this.target.y - this.pos.y) * dt * this.speed;
};


/**
 * Render loop
 */
Player.prototype.render= function() {

	// Render the player
	this.draw();

	// If theres an attached item, render it too
	if(this.attachedItem)
		ctx.drawImage(
			Resources.get(this.attachedItem.sprite), 
			this.pos.x + this.INCREMENT/2 - this.attachedItem.size.x/4, this.pos.y + 30, 
			this.attachedItem.size.x/2, this.attachedItem.size.y/2
		);
};


/**
 * Key event handler
 * 
 * @param  {String} keyPressed  The name of the key pressed
 */
Player.prototype.handleInput= function(keyPressed) {

	switch(keyPressed) {
		case 'up': {

			if(this.target.y <= this.LOWER_LIMIT.y)
				return;

			// Move up
			this.target.y -= this.INCREMENT;
			break;
		}
		case 'down': {

			if(this.target.y >= this.UPPER_LIMIT.y)
				return;

			// Move down
			this.target.y += this.INCREMENT;
			break;
		}
		case 'right': {
			
			if(this.target.x >= this.UPPER_LIMIT.x)
				return;

			// Move right
			this.target.x += this.INCREMENT;
			break;
		}
		case 'left': {

			if(this.target.x <= this.LOWER_LIMIT.x)
				return;

			// Move left
			this.target.x -= this.INCREMENT;
			break;
		}
	}

	// IF the player is aiming for the safe spot(grass zone)
	this.safeLand= this.target.y >= 303;
};
