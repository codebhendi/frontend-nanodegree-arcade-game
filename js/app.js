// Character class, to be the class with basic functionality to render a
// Character
class Character {
  constructor(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
  }

  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}


// Enemies our player must avoid
class Enemy extends Character {
  constructor(y, rate) {
    super(0, y, 'images/enemy-bug.png');
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
    // Move the enemy
    this.x += dt * 50 * this.rate;

    // Check the enemy has reached the end of screen
    if (this.x >= 550) {
      var index = allEnemies.indexOf(this);
      if (index !== -1) {
        // remov the enemy
        allEnemies.splice(index, 1);
      }
    } else if (Math.abs(player.x - this.x) < 50 &&
    Math.abs(player.y - this.y) < 41) {
        player.collided = true;
    }
  }
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends Character {
  constructor() {
    super(50, 350, "images/char-boy.png");
    this.collided = false;
  }
  // Handle input will change the position based on user
  // input.
  // Will also prevent user from going off the screen.
  handleInput(keyPressed) {
      var x = this.x;
      var y = this.y;
      if (keyPressed === "left") {
          x -= 50;
      } else if (keyPressed === "right") {
          x += 50;
      } else if (keyPressed === "up") {
          y -= 41;
      } else if (keyPressed === "down") {
          y += 41;
      }

      if (x < 450 && x > -50 && y > -25 && y < 360) {
          this.x = x;
          this.y = y;
      } else {
        console.log(x, y);
      }
  }

  // Updates the player based on the current state of the game
  // This involves checking if the user has won the game.
  update () {
    if (this.y <= 0) {
      this.win = true;
    }
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
