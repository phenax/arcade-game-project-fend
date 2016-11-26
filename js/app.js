

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {

	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	if(allowedKeys[e.keyCode])
		player.handleInput(allowedKeys[e.keyCode]);

	// Numbers 1 to 5 are allowed
	if((e.keyCode >= 49 && e.keyCode < 54))
		myGame.handleInput(e.keyCode);
});
