var initialX = 200; //Initial x position
var initialY = 400; //Initial y position
var x = 200; //Speed factor at level 1
var speed = (Math.floor(Math.random() * x) + 100);
var level = 1;
var score = 0;
var yRange = [50, 140, 220]; //Path where enemy should move

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = -50;
    this.y = yRange[Math.floor(Math.random() * yRange.length)];
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (Math.random() * speed * dt);
    //if the enemy crosses the canvas limit it will be launched again using the below code
    if (this.x > 500) {
        this.x = -50;
        this.y = yRange[Math.floor(Math.random() * yRange.length)];
    }
    //the below code runs if the player encounters the enemy
    if (this.x - initialX < 50 && this.x - initialX > -50 && this.y - initialY < 50 && this.y - initialY > -50) {
        initialX = 200;
        initialY = 400;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = initialX;
    this.y = initialY;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
    //code to keep player inside the canvas
    if (initialY > 400) {
        initialY = 400;
    }
    if (initialX > 400) {
        initialX = 400;
    }
    if (initialX < 0) {
        initialX = 0;
    }
    //Code to reward the player and increment the level
    if (initialY < -20) {
        initialX = 200;
        initialY = 400;
        level += 1;
        score += 20;
        x += 10;
        var scr = document.getElementById("score");
        scr.innerHTML = score;
        var lvl = document.getElementById("level");
        lvl.innerHTML = level;
        if (score === 100) {
            document.write("<h1>YOU WIN!</h1>");
        }
    }
    this.x = initialX;
    this.y = initialY;
};
//Drawing player on the canvas
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//Code to move user according to user input
Player.prototype.handleInput = function(key) {
    if (key == "up") {
        initialY -= 25;
    }
    if (key == "down") {
        initialY += 25;
    }
    if (key == "left") {
        initialX -= 25;
    }
    if (key == "right") {
        initialX += 25;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var enemy = new Enemy();
var allEnemies = [];
for (i = 0; i < 5; i++) {
    allEnemies.push(enemy);
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