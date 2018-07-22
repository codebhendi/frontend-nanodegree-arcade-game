// Enemies our player must avoid
class Enemy {
    constructor(y, rate) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        this.x = 0;
        this.y = y;
        this.rate = rate;
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    // Increase the position of enemies by 50 and mutliply it with the 
    // rate fixed for that enmemy.
    // After the user has reached certain distance remove it from screen
    // and from enemyArray as this can cause a large amount of enemies to be stored
    // in the memory.
    update(dt) {

      this.x += dt * 50 * this.rate;
      if (this.x >= 550) {
            var index = allEnemies.indexOf(this);
            if (index !== -1) {
                allEnemies.splice(index, 1);
            }
      }
    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}




// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.sprite = "images/char-boy.png";
        this.x = 50;
        this.y = 350;
        this.collided = false;
        // Handle input will change the position based on user
        // input.
        // Will also prevent user from going off the screen.
        this.handleInput = function (keyPressed) {
            var x = this.x;
            var y = this.y;
            if (keyPressed === "left") {
                x -= 50;
            } else if (keyPressed === "right") {
                x += 50;
            } else if (keyPressed === "up") {
                y -= 50;
            } else if (keyPressed === "down") {
                y += 50;
            }

            if (x < 450 && x > -50 && y > -1 && y < 360) {
                this.x = x;
                this.y = y;
            }
        };

        // render the sprite using the give image and location.
        this.render = function () {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        };

        // Updates the player based on the current state of the game
        // This involves checking if the user has won the game or lost
        // due to collision.
        this.update = function () {
            var that = this;
        
            if (this.y <= 0) {
                this.win = true;
            }
            allEnemies.forEach(function(enemy) {
                if (Math.abs(that.x - enemy.x) < 50 && Math.abs(that.y - enemy.y) < 50) {
                    that.collided = true;
                }
            });
        };
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player();


// function to get Y position of enemies on the map
// It will be in the range from 50 - 200
function getPosition() {
    var position = Math.random() * 3 + 0;
    return 50 + 50 * position;
}

// getSpeed function to generate a random rate at which 
// enemies will move
// It will be in the range from 1-3
function getSpeed() {
    return Math.random() * 2 + 1;
}

// Spawn function to spawn enemies
// This function will add enemies at an interval of 1.5 seconds
// For position and speed we will use two random number generators
// A new object for enemy will be created and be added to allEnemies array.
function spawn() {
    setInterval(function() {
        var position = getPosition();
        var speed = getSpeed();
        if (allEnemies.length <= 10) {
            var enemy = new Enemy(position, 3);
            allEnemies.push(enemy);
        }
    }, 1500);
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

spawn();
