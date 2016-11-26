'use strict';

/**
 * All game related functionality wrapper class
 *
 * @constructor
 */
function GameRunner() {

	// Initially the game will not be rendered
	this.renderGame = false;

	// All sprites that a player can have
	this.SPRITES = [
		'images/char-boy.png',
		'images/char-cat-girl.png',
		'images/char-horn-girl.png',
		'images/char-pink-girl.png',
		'images/char-princess-girl.png',
	];
}

/**
 * Render the menu on the screen with all the options
 */
GameRunner.prototype.renderMenu = function() {

	ctx.fillStyle = 'rgba(0,0,0,.8)';

	ctx.fillRect(0, 50, canvasDimens.width, canvasDimens.height - 70);

	ctx.fillStyle = '#fff';
	ctx.font = 'bold 30px Arial';
	ctx.fillText('EVIL BUGS', canvasDimens.width / 2 - 90, 120);

	ctx.save();

	ctx.font = '16px Arial';
	ctx.fillText('Pick a character for this adventure', 115, 210);

	ctx.restore();

	this.SPRITES.forEach(

		function(sprite, i) {

			ctx.fillText(i + 1, i * 101 + 45, 280);

			ctx.drawImage(
				Resources.get(sprite),
				i * 100 + 5, 240,
				100, 180
			);
		}
	);
}

/**
 * Key press event handler for the menu
 * 
 * @param {Number} key  The keycode of the key pressed
 */
GameRunner.prototype.handleInput = function(key) {

	if (!this.renderGame) {

		if (key === 27)
			return;

		// key code for 1 is 49
		var sprite = this.SPRITES[key - 49];

		// If a sprite exists
		if (sprite) {

			// Create a new player
			player = new Player();

			// Set his sprite to the one selected by the user
			player.setSprite(sprite);

			// Start the game
			this.start();
		}
	} else {

		// No pause menu for now
		if (key === 27) {

			// Action for the escape key during the game

		}
	}
};


/**
 * Start the game(Initial setup)
 */
GameRunner.prototype.start = function() {

	// Stop rendering the menu and start rendering game stuff
	this.renderGame = true;


	// Both the powerups initialized
	this.healthUp = new HealthPowerUp();
	this.healthUp.init();

	this.star = new StarPowerUp();

	// Reset the game to the default
	this.reset();

	// Start the different timers
	this._timerInit();
};


/**
 * Reset all the game options(Score, Stars)
 */
GameRunner.prototype.reset = function() {

	// Score becomes 0
	this.score = 0;

	// randomize stars position and make it visible
	this.star.init();
};


/**
 * Helper function to write setInterval(with a pass by name timeout)
 * 
 * @param {Function}  callback  The callback function
 * @param {Function}  getTime   Function that returns the timeout
 * @param {List}      args      List of all the arguements to pass to the callback(just in case)
 */
GameRunner.prototype._setInterval = function(callback, getTime, args) {

	setTimeout(function() {

		// Execute callback with this context and arguements
		callback.apply(this, args);

		// Recursively call itself
		this._setInterval(callback, getTime);

	}.bind(this), getTime());
};


/**
 * Start the timers for stuff
 */
GameRunner.prototype._timerInit = function() {

	var difficulty;

	// Create a new enemy after every `enemyTimeout`ms
	this._setInterval(function() {

		// The difficulty level for the game
		difficulty = (this.score < 20) ? this.score : 21;

		// Speed of each bug
		var speed = player.getRandomNum(100, 400) / 101 + 20 * difficulty;

		// Add the new bug to the list of bugs
		allEnemies.push(new Enemy(speed));

	}, function() {
		return player.getRandomNum(800, 1200) / (101 + difficulty * 5);
	});


	// Change the visibility and position of the health powerup
	this._setInterval(function() {

		// If its not visible, randomize position
		if (!this.healthUp.visible)
			this.healthUp.randomizePos(this.healthUp.randomization);

		// Toogle powerup visibility
		this.healthUp.toggle();

	}, function() {
		return player.getRandomNum(4000, 15000) / 101;
	});

};


/**
 * Draws the health bar on the top of the canvas
 */
GameRunner.prototype.drawHealthBar = function() {

	for (var i = 0; i < player.health; i++) {
		ctx.drawImage(Resources.get('images/Heart.png'), canvasDimens.width - (i + 1) * 30, 50, 25, 40);
	}
};

/**
 * Draw the score on the top section
 */
GameRunner.prototype.drawScoreBoard = function() {

	ctx.fillStyle = '#fff';
	ctx.font = 'bold 16px Arial';

	ctx.drawImage(Resources.get('images/Star.png'), 20, 49, 25, 40);
	ctx.fillText('x' + this.score, 45, 78);
};


/**
 * Draw the score and the top bar with the score and health
 */
GameRunner.prototype.drawTopbar = function() {

	// ctx.fillStyle= 'rgba(0,0,0,.5)';
	// ctx.fillRect(0, 50, canvasDimens.width, 40);

	this.drawScoreBoard();

	this.drawHealthBar();
};


/**
 * Check if an object is too close to the player
 * 
 * @param  {Character}  blob   The character object
 * 
 * @return {Boolean}           True if the object is too close
 */
GameRunner.prototype._isTooClose = function(blob) {

	// Euclidean distance between the two objects
	var dist =
		Math.sqrt(
			Math.pow(player.pos.x - blob.pos.x, 2) +
			Math.pow(player.pos.y - blob.pos.y, 2)
		);

	// 50 is kinda arbitrary
	return dist <= 50;
};


/**
 * Save a star that was attached to the player
 */
GameRunner.prototype.saveStar = function() {

	// If the player had an attached item
	if (player.attachedItem) {

		// Unattach the star
		player.attachedItem = null;

		// Activate star i.e. incr points
		this.star.activate();

		// Reset the position of the star
		this.star.init();
	}
};


/**
 * Shows GAME OVER message and resets the game
 */
GameRunner.prototype.gameOver = function() {

	alert('Game Over. You scored ' + this.score + ' points.');

	this.reset();
	player.reset();
};


/**
 * Attach a star to the player
 */
GameRunner.prototype.attachStar = function() {

	player.attachedItem = this.star;

	this.star.visible = false;
};


/**
 * The game render loop
 */
GameRunner.prototype.renderLoop = function() {

	// If the game is not being rendered, render the menu
	if (!this.renderGame) {

		this.renderMenu();

		return;
	}


	/* Loop through all of the objects within the allEnemies array and call
	 * the render function you have defined.
	 */
	allEnemies.forEach(function(enemy) {
		enemy.render();
	});

	// Render the player on to the screen
	player.render();

	// If the health is visible, draw it
	if (this.healthUp.visible)
		this.healthUp.draw();

	// If the star is visible, draw it
	if (this.star.visible)
		this.star.draw();

	// Draw the topbar last so that it shows up on top of other drawings
	this.drawTopbar();
};



/**
 * Calculation loop for the game
 * 
 * @param  {Number} dt  Time delta
 */
GameRunner.prototype.calcLoop = function(dt) {

	// Update the states of all the bugs, i.e. 
	// calculate the next state of the bugs
	allEnemies.forEach(function(enemy) {
		enemy.update(dt);
	});

	// Update the state of the player
	player.update(dt);

	// Skip a frame before calculating the rest of the stuff asynchronously
	requestAnimationFrame(function() {

		// Filter out all the enemies that have moved outside the viewport
		allEnemies =
			allEnemies
			.filter(function(enemy) {
				return enemy.pos.x < canvasDimens.width;
			});


		// If the player is on the safe land
		if (player.safeLand) {

			// Save any attached star
			this.saveStar();
		} else {

			// For each enemy,
			allEnemies
				.forEach(function(enemy) {

					// If an enemy is too close
					if (this._isTooClose(enemy)) {

						player.addHealth(-1);

						player.resetPosition();

						this.star.init();
					}
				}.bind(this))
		}


		if (this.healthUp.visible && this._isTooClose(this.healthUp)) {

			this.healthUp.activate();

			this.healthUp.visible = false;
		}

		// If the player is close enough to a visible star, attach it to the player
		if (this.star.visible && this._isTooClose(this.star))
			this.attachStar();


		// Game over if health becomes 0
		if (player.health === 0)
			this.gameOver();
	}.bind(this));
};


// Instantiate the game runner
myGame = new GameRunner();