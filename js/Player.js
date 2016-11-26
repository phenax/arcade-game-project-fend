
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

function Player(speed) {

	this.INCREMENT= 101;

	this.defaultPos= {};
	this.defaultPos.x= window.canvasDimens.width/2 - this.INCREMENT/2;
	this.defaultPos.y= window.canvasDimens.height - 2*this.INCREMENT;

	Character.call(this, Object.create(this.defaultPos), speed || 0.1);

	this.LOWER_LIMIT= {
		x: 0,
		y: 0
	};
	this.UPPER_LIMIT= {
		x: window.canvasDimens.width - this.INCREMENT,
		y: window.canvasDimens.height - 2*this.INCREMENT
	};

	this.target= {};

	this.reset();

	this.setSprite('images/char-boy.png');
}

Player.prototype= Object.create(Character.prototype);


Player.prototype.reset= function() {

	this.health= 5;

	this.resetPosition();
};

Player.prototype.resetPosition= function() {

	this.attachedItem= null;

	this.pos.x= this.defaultPos.x;
	this.pos.y= this.defaultPos.y;

	this.target.x= this.pos.x;
	this.target.y= this.pos.y;
};

Player.prototype.addHealth= function(increment) {

	if(this.health + increment > 5 || this.health + increment < 0)
		return;

	this.health+= increment;
};

Player.prototype.update= function(dt) {

	if(Math.abs(this.target.x - this.pos.x) >= 0.001)
		this.pos.x+= (this.target.x - this.pos.x) * dt / this.speed;

	if(Math.abs(this.target.y - this.pos.y) >= 0.001)
		this.pos.y+= (this.target.y - this.pos.y) * dt / this.speed;
};

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

Player.prototype.handleInput= function(keyPressed) {

	switch(keyPressed) {
		case 'up': {

			if(this.target.y <= this.LOWER_LIMIT.y)
				return;

			// Move up
			this.target.y -= this.INCREMENT/2;
			break;
		}
		case 'down': {

			if(this.target.y >= this.UPPER_LIMIT.y)
				return;

			// Move down
			this.target.y += this.INCREMENT/2;
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

	if(this.target.y >= 303) {
		this.safeLand= true;
	} else {
		this.safeLand= false;
	}
};
