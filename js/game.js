// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player;
var allEnemies= [];
var myGame;



function GameRunner() {

	this.reset();

	this.powerup= new HealthPowerUp();

	this.star= {
		sprite: 'images/Star.png',
		visible: true,
		pos: { x: 0, y: 0 },
		size: { x: 80, y: 130 }
	};

	this.powerupTimer();
}

GameRunner.prototype.reset= function(enemy) {

	this.score= 0;
};

GameRunner.prototype.powerupTimer= function() {

	setInterval(function() {

		allEnemies.push(new Enemy());

	}.bind(this), 1000);


	setInterval(function() {
		
		this.powerup.toggle();

	}.bind(this), Math.floor(Math.random()*8000 + 4000));

};


GameRunner.prototype.drawHealthBar= function() {

	for(var i= 0; i< player.health; i++) {
		ctx.drawImage(Resources.get('images/Heart.png'), canvasDimens.width - (i + 1)*30, 50, 25, 40);
	}
};

GameRunner.prototype.drawScoreBoard= function() {

	ctx.fillStyle='#fff';
	ctx.font="bold 16px Arial";

	ctx.drawImage(Resources.get('images/Star.png'), 20, 49, 25, 40);
	ctx.fillText('x' + this.score, 45, 78);
};

GameRunner.prototype.isTooClose= function(enemy) {

	var dist=
		Math.sqrt(
			Math.pow(player.pos.x - enemy.pos.x, 2) + 
			Math.pow(player.pos.y - enemy.pos.y, 2)
		);

	return dist <= 50;
};


GameRunner.prototype.renderLoop= function() {

	if(this.powerup.visible) {
		ctx.drawImage(Resources.get(this.powerup.sprite), this.powerup.pos.x, this.powerup.pos.y, 80, 120);
	}

	ctx.drawImage(Resources.get(this.star.sprite), this.star.pos.x, this.star.pos.y, this.star.size.x, this.star.size.y);

	this.drawScoreBoard();

	// Draw last because it needs to be on top
	this.drawHealthBar();
};

GameRunner.prototype.calcLoop= function() {

	// Filter out all the enemies that have moved outside the viewport
	allEnemies= 
		allEnemies
			.filter(function(enemy) {
				return enemy.pos.x < canvasDimens.width;
			});


	if(player.safeLand) {

		if(player.attachedItem) {

			player.attachedItem= null;

			this.score+= 1;
		}

	} else {

		allEnemies
			.forEach(function(enemy) {

				// If an enemy is too close
				if(this.isTooClose(enemy)) {

					player.addHealth(-1);

					player.resetPosition();
				}
			}.bind(this))
	}



	if(this.isTooClose(this.star)) {
		player.attachedItem= this.star.sprite;
	}


	if(player.health === 0) {

		alert("You Loose");

		this.reset();
		player.reset();
	}
};



player= new Player();
myGame= new GameRunner();
