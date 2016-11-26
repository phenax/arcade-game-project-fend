
// Enemies our player must avoid
function Character(initialPosition, speed) {

	this.speed= speed;

	this.pos= initialPosition || { x: 0, y: 0 };
};

Character.prototype.setSprite= function(sprite) {
	this.sprite= sprite;
};

Character.prototype.draw = function() {
	ctx.drawImage(Resources.get(this.sprite), this.pos.x, this.pos.y);
};

Character.prototype.render= function() {
	this.draw();
};