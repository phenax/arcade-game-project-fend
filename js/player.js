
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

function Player() {

	this.INCREMENT= 101;

	this.health= 5;

	this.LOWER_LIMIT= {
		x: 0,
		y: 0
	};
	this.UPPER_LIMIT= {
		x: window.canvasDimens.width - this.INCREMENT,
		y: window.canvasDimens.height - 2*this.INCREMENT
	};


	this.pos= {
		x: window.canvasDimens.width/2 - this.INCREMENT/2,
		y: window.canvasDimens.height - 2*this.INCREMENT
	};

	this.target= { x: this.pos.x, y: this.pos.y };

	this.sprite= 'images/char-boy.png';
}

Player.prototype.addHealth= function(increment) {

	if(this.health + increment > 5 || this.health + increment < 0)
		return;

	this.health+= increment;
}

Player.prototype.update= function() {

	if(Math.abs(this.target.x - this.pos.x) >= 0.001)
		this.pos.x+= (this.target.x - this.pos.x)/4;

	if(Math.abs(this.target.y - this.pos.y) >= 0.001)
		this.pos.y+= (this.target.y - this.pos.y)/4;
};

Player.prototype.render= function() {

	ctx.drawImage(Resources.get(this.sprite), this.pos.x, this.pos.y);
}

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
}
