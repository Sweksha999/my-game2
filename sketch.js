var boy,police,dog,
var  boyImage,policeImage,dogImage,runningImage

function preload(){
boyImage=loadImage("images/idle(1).png","images/idle(2).png","images/idle(3).png","images/idle(4).png")
runningImage=loadImage("images/Run(1).png","images/Run(2).png","images/Run(3).png","images/Run(4).png","images/Run(5).png","images/Run(6).png","images/Run(7).png","images/Run(8).png","images/Run(9).png","images/Run(10).png","images/Run(11).png","images/Run(12).png","images/Run(13).png","images/Run(14).png","images/Run(15).png",)
policeImage=loadImage("images/police1","images/police2","images/police3","images/police4","images/police5","images/police6","images/police7","images/police8")
dogImage=loadImage("images/dog1","images/dog2","images/dog3","images/dog4","images/dog5","images/dog6",)

}


function setup() {
  createCanvas(800,400);
   boy= createSprite(15,15,600,200)
   police= createSprite(15,15,500,200)
   dog= createSprite(15,15,700,200)
   invisible_ground=createSprite(300,470,600,10);
  invisible_ground.visible=false;
  
   gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImage);
  
  restart = createSprite(300,180);
  restart.addImage(restartImage);
  
  obstaclesGroup=new Group();
  
  score=0;
} 

function draw() {
 background("black");
  
 // console.log(boy.y);
   //Gravity
boy.velocityY = boy.velocityY + 0.8;
boy.collide(invisible_ground); 
  
   //Gravity
police.velocityY = police.velocityY + 0.8;
police.collide(invisible_ground); 
  
  
   if (gameState===PLAY){
    gameOver.visible=false;
  restart.visible=false;
    
   score = score + Math.round(getFrameRate()/60);
 
    spawnObstacles();
   if (obstaclesGroup.isTouching(police)){
    police.velocityY=-12;
   }
 ground.velocityX = -(4 + 3* score/100);
     
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
     //if(score>0 && score%100 === 0){
       
    }
    
 if((keyDown("space")&& boy.y >= 220)) {
   boy.velocityY = -12;
    
  }  
  
  if (boy.isTouching(obstaclesGroup)){
    gameState=END;
     
  }
  
else if ( gameState===END) {
  gameOver.visible=true;
  restart.visible=true;
  ground.velocityX = 0;
     boy.velocityY = 0
    
  
  }
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
   obstaclesGroup.setVelocityXEach(0);
  
    if(mousePressedOver(restart)) {
      reset();
    }
 
  
 
  drawSprites();
  fill("lightpink");
  textSize(20);
   text("Score: "+ score, 500,50);
}

function reset(){
  gameState=PLAY;
gameOver.visible=false;
restart.visible=false;
  obstaclesGroup.destroyEach();
  score=0;
  police.x=50;
}

function spawnObstacles() {
   if (frameCount % 60 === 0){
   var obstacle = createSprite(600,450,10,40);
   obstacle.velocityX = -6 ;//+ score/100);
   
    //generate random obstacles
   var rand = Math.round(random(1,6));
     obstacle.addImage(obstacle1);
   obstacle.scale=0.1;
      obstaclesGroup.add(obstacle);
    obstacle.debug=false;
obstacle.setCollider("circle",0,0,1);
   }
     
}

