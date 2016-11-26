
// Enemies our player must avoid
function Character(initialPosition, speed) {

	this.speed= speed;

	this.pos= initialPosition || { x: 0, y: 0 };
};

Character.prototype.setSprite= function(sprite) {

	this.sprite= sprite;
};

Character.prototype.draw = function() {
	if(!this.size) {
		ctx.drawImage(Resources.get(this.sprite), this.pos.x, this.pos.y);
	} else {
		ctx.drawImage(
			Resources.get(this.sprite), 
			this.pos.x, this.pos.y, 
			this.size.x, this.size.y
		);
	}
};

Character.prototype.render= function() {
	this.draw();
};

Character.prototype.getRandomNum= function(max, min) {
	return Math.floor(
		Math.random()*(max - min + 1) + min
	) * 101;
};