// let ballY = 580;
let playerSpeed = 4;
let playerWidth = 120;
let playerHeight = 10;
let ballSize = 15;
let targetWidth = 200;
let playerScore = 0;
let startGame = false;
let endGame = false;

let missedTarget = 0;

window.onload = () => {
    update();
}

class Court {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    score() {
        this.ctx.fillStyle = 'white';
        this.ctx.font = 'bold 30px serif';
        this.ctx.fillText(`Score: ${playerScore}`, 400, 400)

    }
}

class Player {
    constructor() {
        this.x = (court.canvas.width / 2) - playerWidth / 2;
        this.y = court.canvas.height - playerHeight;
        this.speedX = 0;

    }

    drawPlayer() {
        if (this.x >= 0 && this.x <= court.canvas.width - playerWidth) {
            this.x += this.speedX;
        };

        court.ctx.fillStyle = 'white';
        court.ctx.fillRect(this.x, this.y, playerWidth, playerHeight);
    }

    moveRight() {
        this.x += playerSpeed;
        this.speedX = playerSpeed;
    }

    moveLeft() {
        this.x -= playerSpeed;
        this.speedX = -playerSpeed;
    }
}

class Ball {
    constructor() {
        this.x = court.canvas.width / 2;
        this.y = court.canvas.height - 20;
        this.speedY = 8;
        this.speedX = 4;
        this.direction = -1;

        this.isScoring = false;
    }

    drawBall() {
        court.ctx.fillStyle = 'yellow';
        court.ctx.beginPath();
        court.ctx.arc(this.x, this.y, ballSize, 0, Math.PI * 2, true);
        court.ctx.fill();
    }

    resetBall() {
        if (this.y > court.canvas.height) {
            missedTarget += 1;
            if (missedTarget === 3) {
                return gameOver()
            }
            this.direction = -1;
            this.speedX = -this.speedX;
            this.x = court.canvas.width / 2;  // reset ball when its 
            this.y = this.y - ballSize;                 // equal to cavas height
        }
    }

    ballMovement() {
        this.y += this.speedY * this.direction;
        this.x -= this.speedX; 
        console.log(this.y)

        if (this.y < 0) {
            // this.speedY = -this.speedY;
            this.direction = 1

        } else if (this.y > court.canvas.height) {
            ball.resetBall()
            playerScore = 0;
        }

        if (this.x < 0) {
            this.speedX = -this.speedX;
        } else if (this.x > court.canvas.width) {
            this.speedX = -this.speedX;
        }

    }

    hitPlayer() {
        if (this.y + ballSize >= player.y) {
            if (this.x >= player.x && this.x <= player.x + playerWidth) {
                this.direction = -1
            }
        }
    }

    addScore() {
        if (!this.isScoring) {
            this.isScoring = true;
            playerScore++;
           
            winGame();
        }
    }

    hitTarget() {
        if (this.y - ballSize <= target.h) {
            if (this.x > target.x && this.x < target.x + targetWidth) {
                this.direction = 1
                this.addScore()
                return
            }
            if (this.x > target.lt && this.x <= target.lt + targetWidth) {
                this.direction = 1
                this.addScore()
                return
            }
            if (this.x > target.rt && this.x < target.rt + targetWidth) {
                this.direction = 1
                this.addScore()
                return
            }
        } else {
            this.isScoring = false
        }

    }

}

const winGame = () => {
    if (playerScore === 3) {
        endGame = true;
        court.ctx.fillText('You win!! Djokovic wont have done better', court.canvas.width / 2, court.canvas.height / 2);
    }
}

const gameOver = () => {
    endGame = true;
    court.ctx.fillText('GAME OVER', court.canvas.width / 2, court.canvas.height / 2);
}

class Target {
    constructor() {
        this.x = (court.canvas.width / 2) - targetWidth/2;
        this.y = 0;
        this.h = 9;
        this.lt = this.x - (court.canvas.width /4)- targetWidth/2;
        this.rt = this.x + (court.canvas.width /2.5)- targetWidth/2;
    }

    drawTarget() {
        court.ctx.fillStyle = 'white';
        court.ctx.fillRect(this.x, this.y, targetWidth, this.h);
        court.ctx.fillStyle = 'white';
        court.ctx.fillRect(this.lt, this.y, targetWidth, this.h);
        court.ctx.fillStyle = 'white';
        court.ctx.fillRect(this.rt, this.y, targetWidth, this.h);
    }
}

const court = new Court();
const player = new Player();
const ball = new Ball();
const target = new Target();

function update() {
    !endGame && court.clear();
    player.drawPlayer();
    target.drawTarget();
    ball.drawBall();
    if (startGame && !endGame) {     // if the game start and player didn't win or lose yet
        court.score();
        ball.ballMovement();
        ball.hitPlayer();
        ball.hitTarget();
    } else if (!startGame) {          // if the game didn't start yet
        court.ctx.fillStyle = 'white';
        court.ctx.font = '30px serif';
        court.ctx.fillText('Tap S to start game', court.canvas.width / 2, court.canvas.height / 2)
    }
    requestAnimationFrame(update);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 's') {
        startGame = true;
    } else if (event.key === 'ArrowLeft' && startGame) {
        player.moveLeft();
    } else if (event.key === 'ArrowRight' && startGame) {
        player.moveRight();
    }
});

document.addEventListener('keyup', () => {
    player.speedX = 0;
})