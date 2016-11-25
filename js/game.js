// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player;
var allEnemies= [];
var myGame;

function HealthPowerUp() {

	this.visible= false;

	this.sprite = 'images/Heart.png';
}

HealthPowerUp.prototype.toggle= function() {
	this.visible= !this.visible;
};

HealthPowerUp.prototype.activate= function() {
	player.addHealth(1);
};



function GameRunner() {

	this.difficulty= 1;

	this.score= 0;

	this.powerup= new HealthPowerUp();

	this.powerupTimer();
}

GameRunner.prototype.powerupTimer= function() {

	setInterval(function() {

		allEnemies.push(new Enemy());

	}.bind(this), 1000);


	setInterval(function() {
		
		this.powerup.toggle();

	}.bind(this), Math.floor(Math.random()*8000 + 4000));

	setInterval(function() {

		console.log(allEnemies);

		this.score+= 1;

		this.difficulty= (this.score <= 50)? this.score%10: this.difficulty;

	}.bind(this), 2000);
};


GameRunner.prototype.drawHealthBar= function() {

	for(var i= 0; i< player.health; i++) {
		ctx.drawImage(Resources.get(this.powerup.sprite), canvasDimens.width - (i + 1)*40, 50, 30, 50);
	}
};

GameRunner.prototype.renderLoop= function() {



	// Draw last because it needs to be on top
	this.drawHealthBar();

	// if(this.powerup.visible) {
	// 	ctx.drawImage(Resources.get(this.powerup.sprite), 100, 100);
	// }

};

GameRunner.prototype.calcLoop= function() {

	allEnemies= allEnemies.filter(function(enemy) {
		return enemy.pos.x < canvasDimens.width;
	});
	
};



player= new Player();
myGame= new GameRunner();
