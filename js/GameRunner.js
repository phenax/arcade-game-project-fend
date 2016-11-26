

function GameRunner() {

	this.renderGame= false;

	this.SPRITES= [
		'images/char-boy.png',
		'images/char-cat-girl.png',
		'images/char-horn-girl.png',
		'images/char-pink-girl.png',
		'images/char-princess-girl.png',
	];
}

GameRunner.prototype.handleInput= function(key) {

	key-= 49;

	if(!this.renderGame) {

		var sprite= this.SPRITES[key];

		if(sprite) {
			player= new Player();
			player.setSprite(sprite);
		} else
			return;

		this.start();
	}
};

GameRunner.prototype.start= function() {

	this.renderGame= true;

	this.healthUp= new HealthPowerUp();
	this.healthUp.init();

	this.star= new StarPowerUp();

	this.reset();

	this.powerupTimer();
};

GameRunner.prototype.reset= function(enemy) {

	this.score= 0;

	this.star.init();
};

GameRunner.prototype.powerupTimer= function() {

	// Create a new enemy every 1 second
	setInterval(function() {

		var speed= Math.floor(Math.random()*300 + 200);

		allEnemies.push(new Enemy(speed));

	}.bind(this), 1000);


	var timeout= 10000;

	setInterval(function() {
		
		if(!this.healthUp.visible)
			this.healthUp.randomizePos(this.healthUp.randomization);

		this.healthUp.toggle();

		timeout= Math.floor(Math.random()*8000 + 2000);

	}.bind(this), timeout);

};


GameRunner.prototype.drawHealthBar= function() {

	for(var i= 0; i< player.health; i++) {
		ctx.drawImage(Resources.get('images/Heart.png'), canvasDimens.width - (i + 1)*30, 50, 25, 40);
	}
};

GameRunner.prototype.drawScoreBoard= function() {

	ctx.fillStyle= '#fff';
	ctx.font= 'bold 16px Arial';

	ctx.drawImage(Resources.get('images/Star.png'), 20, 49, 25, 40);
	ctx.fillText('x' + this.score, 45, 78);
};

GameRunner.prototype.drawTopbar= function() {

	// ctx.fillStyle= 'rgba(0,0,0,.5)';
	// ctx.fillRect(0, 50, canvasDimens.width, 40);

	this.drawScoreBoard();

	// Draw last because it needs to be on top
	this.drawHealthBar();
};

GameRunner.prototype.isTooClose= function(blob) {

	var dist=
		Math.sqrt(
			Math.pow(player.pos.x - blob.pos.x, 2) + 
			Math.pow(player.pos.y - blob.pos.y, 2)
		);

	return dist <= 50;
};

GameRunner.prototype.saveStar= function() {

	if(player.attachedItem) {

		player.attachedItem= null;

		// Activate star i.e. incr points
		this.star.activate();

		this.star.init();
	}
};

GameRunner.prototype.gameOver= function() {

	alert('Game Over. You scored ' + this.score + ' points.');

	this.reset();
	player.reset();
};


GameRunner.prototype.attachStar= function() {

	player.attachedItem= this.star;

	this.star.visible= false;
};

GameRunner.prototype.renderLoop= function() {

	if(!this.renderGame) {

		ctx.fillStyle= '#27ae60';

		ctx.fillRect(0, 0, canvasDimens.width, canvasDimens.height);

		ctx.fillStyle= '#fff';
		ctx.font= 'bold 30px Arial';
		ctx.fillText("EVIL BUGS", canvasDimens.width/2 - 90, 120);

		ctx.save();

		ctx.font= '16px Arial';
		ctx.fillText('Enter a number to choose the character', 100, 220);

		ctx.restore();

		this.SPRITES.forEach(

			function(sprite, i) {

				ctx.fillText(i + 1, i*101 + 45, 280);

				ctx.drawImage(
					Resources.get(sprite),
					i*100 + 5, 240,
					100, 180
				);
			}
		);

		return;
	}

	/* Loop through all of the objects within the allEnemies array and call
	 * the render function you have defined.
	 */
	allEnemies.forEach(function(enemy) {
		enemy.render();
	});

	player.render();


	if(this.healthUp.visible)
		this.healthUp.draw();

	if(this.star.visible)
		this.star.draw();


	this.drawTopbar();
};

GameRunner.prototype.calcLoop= function(dt) {

	allEnemies.forEach(function(enemy) {
		enemy.update(dt);
	});

	player.update(dt);

	// Skip a frame before calculating the rest of the stuff asynchronously
	requestAnimationFrame(function() {

		// Filter out all the enemies that have moved outside the viewport
		allEnemies= 
			allEnemies
				.filter(function(enemy) {
					return enemy.pos.x < canvasDimens.width;
				});


		// If the player is on the safe land
		if(player.safeLand) {

			// Save any attached star
			this.saveStar();
		} else {

			// For each enemy,
			allEnemies
				.forEach(function(enemy) {

					// If an enemy is too close
					if(this.isTooClose(enemy)) {

						player.addHealth(-1);

						player.resetPosition();

						this.star.init();
					}
				}.bind(this))
		}


		if(this.healthUp.visible && this.isTooClose(this.healthUp)) {

			this.healthUp.activate();

			this.healthUp.visible= false;
		}

		// If the player is close enough to a visible star, attach it to the player
		if(this.star.visible && this.isTooClose(this.star))
			this.attachStar();


		// Game over if health becomes 0
		if(player.health === 0)
			this.gameOver();
	}.bind(this));
};



myGame= new GameRunner();
