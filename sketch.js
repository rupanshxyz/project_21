var backgroundImage,bg
var rocket,rocketImage
var obstacle,
alien1,alien2,alien3,alien4,asteroid,
alien1Image,alien2Image,alien3Image,alien4Image,asteroidImage
var play = 0;
var end = 1;
var gamestate = play
var score=0
var gameover,gameoverImage
var reset,resetImage
var obstaclegroup


function preload(){
backgroundImage=loadImage('background.webp')
rocketImage=loadImage('rocket.png')
alien1Image=loadImage('alien1.png')
alien2Image=loadImage('alien2.png')
alien3Image=loadImage('alien3.png')
alien4Image=loadImage('alien4.png')
asteroidImage=loadImage('asteroid.png')
gameoverImage=loadImage('gameover.png')
resetImage=loadImage('restart.png')

}

function setup() {
  createCanvas(800, 600);

 bg = createSprite(600,300)
 bg.addImage('bg',backgroundImage)
 bg.scale=1.1

 rocket= createSprite(300,500,50,50)
 rocket.addImage('rocket',rocketImage)
 rocket.scale=0.25

 gameover=createSprite(400,300)
 gameover.addImage('go',gameoverImage)
gameover.scale=1.35

reset=createSprite(400,550)
reset.addImage('reset',resetImage)

rocket.debug = false;
  rocket.setCollider("circle", 0,0, 100);

 obstaclegroup = new Group ()
}

function draw() {
  background(0);
  drawSprites()

  textSize(30);
  textStyle("bold");
  fill('yellow')
  text('score:'+score,15,25)
  

  if(bg.y>600){
    bg.y=300
  }
  
 
  if(gamestate=== play){
    rocket.x=World.mouseX
    bg.velocityY=8
    score = score + Math.round(random(frameCount % 5 === 0));
    gameover.visible = false;
    reset.visible = false;
    
    if (rocket.isTouching(obstaclegroup)) {
      gamestate = end;
     
    }

  }
else if (gamestate===end){
  gameover.visible = true;
  reset.visible = true;
  bg.velocityY = 0;

  obstaclegroup.setVelocityYEach(0);
  obstaclegroup.destroyEach()

  if ( mousePressedOver(reset)) {
    resetgame();
   
  }
}

createobstacle()
}

function createobstacle(){
  if (frameCount % 50 === 0) {
    obstacle = createSprite(Math.round(random(50, 750)), 0, 10, 20);
    obstacle.velocityY = 6
    obstacle.scale = 0.8;
    obstacle.lifetime = 600;
    obstaclegroup.add(obstacle);
    obstaclegroup.setLifetimeEach(-1);

    var number = Math.round(random(1, 5));

    switch (number) {
      case 1:
        obstacle.addImage("ob1", alien1Image);
        break;
      case 2:
        obstacle.addImage("ob2", alien2Image);
        break;
      case 3:
        obstacle.addImage("ob3", alien3Image);
        break;
      case 4:
        obstacle.addImage("ob4", alien4Image);
        break;
      case 5:
        obstacle.addImage("ob5", asteroidImage);
        break;
      

      default:
        break;
    }
  }


}

function resetgame() {
  
  gamestate = play;
  obstaclegroup.destroyEach();
 
  score = 0;
}
