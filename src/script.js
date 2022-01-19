let ballY = 580;
let playerSpeed = 4;
let playerWidth = 120;
let playerHeight = 10;
// let playerY = 590;
let ballSize = 15;
let targetWidth = 200;
let playerScore = '';
let startGame = false;

window.onload = () => {

    update();
}

class Court {
    constructor(){
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
     constructor(){
         this.x = (court.canvas.width / 2) - playerWidth/2;
         this.y = court.canvas.height - playerHeight; 
         this.speedX = 0;
         
    }

    drawPlayer(){
        if(this.x >= 0 && this.x <= court.canvas.width - playerWidth ){
            this.x += this.speedX;
        };

        court.ctx.fillStyle = 'white';
        court.ctx.fillRect(this.x , this.y, playerWidth, playerHeight);
    }

    moveRight(){
        this.x += playerSpeed;
        this.speedX = playerSpeed;
    }
    
    moveLeft(){
        this.x -= playerSpeed;
        this.speedX = -playerSpeed;
    }
}

class Ball{
    constructor(){
        this.x = court.canvas.width/2;
        this.y = ballY;
        this.speedY = 6;
        this.speedX = 4;
    }

    drawBall() {
        court.ctx.fillStyle	= 'yellow';	
        court.ctx.beginPath();	
        court.ctx.arc(this.x, this.y, ballSize, 0, Math.PI*2,	true);
        court.ctx.fill();
    }

    resetBall(){
        if(this.y > court.canvas.height){
            this.speedY = -this.speedY;
            this.speedX = -this.speedX;
            this.x = court.canvas.width/2;  // reset ball when its 
            this.y = ballY - ballSize;                 // equal to cavas height
        }
    }

    ballMovement(){
        this.y -= this.speedY;
        this.x -= this.speedX; //
        console.log(this.y)

        if(this.y < 0){
            this.speedY = -this.speedY;
           
        } else if(this.y > court.canvas.height){
            ball.resetBall()
            playerScore = '';
           
            // this.speedY = -this.speedY;
            // this.x = court.canvas.width/2;  // reset ball when its 
            // this.y = ballY;                 // equal to cavas height
        }

        if(this.x < 0){
            this.speedX = -this.speedX;
        } else if(this.x > court.canvas.width){
            this.speedX = -this.speedX;
        }
        
    }

    hitPlayer(){
        if(this.y + ballSize >= player.y ){
            if(this.x >=  player.x && this.x <= player.x + playerWidth) {
                this.speedY = -this.speedY
            
            }
        }
    }

    hitTarget(){
        if(this.y - ballSize <= target.y + 9 ){
            if(this.x >=  target.x && this.x <= target.x + targetWidth) {
                this.speedY = -this.speedY
                playerScore++
            }
        }

        if(this.y - ballSize <= target.y + 9 ){
            if(this.x >=  200 && this.x <= 200 + targetWidth) {
                this.speedY = -this.speedY
                playerScore++
            }
        }

        if(this.y - ballSize <= target.y + 9 ){
            if(this.x >=  950 && this.x <= 950 + targetWidth) {
                this.speedY = -this.speedY
                playerScore++
            }
        }

    }
   
}

class Target{
    constructor(){
        this.x = (court.canvas.width / 2)-50;
        this.y = 1;
    } 

    drawTarget(){
        court.ctx.fillStyle = 'white';
        court.ctx.fillRect(this.x, this.y, targetWidth, 9);
        court.ctx.fillStyle = 'white';
        court.ctx.fillRect(200, this.y, targetWidth, 9);
        court.ctx.fillStyle = 'white';
        court.ctx.fillRect(950, this.y, targetWidth, 9);
        
    }
   
}

const court = new Court();
const player = new Player();
const ball = new Ball();
const target = new Target();


function update() {
    court.clear();
    court.score();
    player.drawPlayer();
    ball.drawBall();
    target.drawTarget(); 
    ball.ballMovement();
    ball.hitPlayer();
    ball.hitTarget();
    requestAnimationFrame(update);
}


document.addEventListener('keydown', (event) => {
    if (event.key === 's') {
        startGame = true;
        return;
    }

    const pressedKey = event.key;
    console.log(pressedKey)

    switch(pressedKey){
        case 'ArrowLeft': player.moveLeft();
              break;
        case 'ArrowRight': player.moveRight();
              break;
       
    }

});

document.addEventListener('keyup', (event) => {
    player.speedX = 0;

})