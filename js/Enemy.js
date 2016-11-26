// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player;
var allEnemies = [];
var myGame;

// The dimensions
window.canvasDimens = {
    width: 505,
    height: 606,
};

/**
 * The enemy class (The bugs)
 * 
 * @param {Number} speed  The bugs movement speed
 */
function Enemy(speed) {

    Character.call(this, {
        x: -100,
        y: Math.floor(Math.random() * 3 + 1) * 83 - 30
    }, speed || 200);

    this.setSprite('images/enemy-bug.png');
};

Enemy.prototype = Object.create(Character.prototype);

// Calculation loop
Enemy.prototype.update = function(dt) {

    this.pos.x += dt * this.speed;
};
