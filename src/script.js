let ballY = 580;
let playerSpeed = 4;
let playerWidth = 70;
let playerY = 590;

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

   
}

class Player {
     constructor(){
         this.x = (court.canvas.width / 2) - playerWidth/2;
         this.y = playerY; 
         this.speedX = 0;
         
    }

    drawPlayer(){
        if(this.x >= 0 && this.x <= court.canvas.width - playerWidth ){
            this.x += this.speedX;
        };

        court.ctx.fillStyle = 'white';
        court.ctx.fillRect(this.x , this.y, playerWidth, 10);

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
        this.speedY = 4;
        this.speedX = 2;

    }

    drawBall() {
        court.ctx.fillStyle	= 'yellow';	
        court.ctx.beginPath();	
        court.ctx.arc(this.x, this.y, 10, 0, Math.PI*2,	true);
        court.ctx.fill();
    }

    resetBall(){
        if(this.y > court.canvas.height){
            this.speedY = -this.speedY;
            this.speedX = -this.speedX;
            this.x = court.canvas.width/2;  // reset ball when its 
            this.y = ballY;                 // equal to cavas height
        }
    }

    ballMovement(){
        this.y -= this.speedY;
        this.x -= this.speedX;

        if(this.y < 0){
            this.speedY = -this.speedY;
           

        } else if(this.y > court.canvas.height){
            if((ballY > playerY) && (ballY < playerY + playerWidth)) {
                this.speedY = -this.speedY;
                console.log('hit ball')
            }else{
                ball.resetBall()
            }
           
            // this.speedY = -this.speedY;
            // this.x = court.canvas.width/2;  // reset ball when its 
            // this.y = ballY;                 // equal to cavas height
        }

        if(this.x < 0){
            // this.speedX = -this.speedX;
        } else if(this.x > court.canvas.width){
            this.speedX = -this.speedX;
        }
        
    }

   
        
}

class Target{
    constructor(){
        this.x = (court.canvas.width / 2)-35;
        this.y = 1;
    } 

    drawTarget(){
        court.ctx.fillStyle = 'white';
        court.ctx.fillRect(this.x, this.y, 100, 9);
        court.ctx.fillStyle = 'white';
        court.ctx.fillRect(250, this.y, 100, 9);
        court.ctx.fillStyle = 'white';
        court.ctx.fillRect(950, this.y, 100, 9);
        

    }
}

const court = new Court();
const player = new Player();
const ball = new Ball();
const target = new Target();


function update() {
    court.clear();
    player.drawPlayer();
    ball.drawBall();
    target.drawTarget(); 
    ball.ballMovement();
    requestAnimationFrame(update);
}


document.addEventListener('keydown', (event) => {
    const pressedKey = event.key;
    console.log(pressedKey)

    switch(pressedKey){
        case 'ArrowLeft': player.moveLeft();
              break;
        case 'ArrowRight': player.moveRight();
              break;
       
    }

})