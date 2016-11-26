'use strict';

/**
 * Character super class
 *
 * @constructor
 * 
 * @param {Object} initialPosition  The position to draw the character on
 * @param {Number} speed            The speed of movement
 */
function Character(initialPosition, speed) {

	this.speed = speed;

	this.pos = initialPosition || {
		x: 0,
		y: 0
	};
};

/**
 * Setter for the sprite
 */
Character.prototype.setSprite = function(sprite) {

	this.sprite = sprite;
};

/**
 * Draw the character to the canvas
 */
Character.prototype.draw = function() {

	// IF it doesnt have a size, just draw it
	// ELSE scale it to the given size
	if (!this.size) {

		ctx.drawImage(Resources.get(this.sprite), this.pos.x, this.pos.y);
	} else {

		ctx.drawImage(
			Resources.get(this.sprite),
			this.pos.x, this.pos.y,
			this.size.x, this.size.y
		);
	}
};


/**
 * Render loop
 */
Character.prototype.render = function() {
	this.draw();
};

/**
 * Generates random integer between two numbers
 */
Character.prototype.getRandomNum = function(max, min) {

	return Math.floor(
		Math.random() * (max - min + 1) + min
	) * 101;
};
