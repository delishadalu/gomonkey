
var monkey , monkey_running,monkey_stand
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score=0;
var ground,rand
var gamestate="play"
var points=0;
var eat_sound, jump,backgroundimg,backgrounds
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
 monkey_stand=loadAnimation("sprite_1.png");
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  backgroundimg= loadImage("jungle.jpg")
 
  eat_sound=loadSound("salamisound-8138442-smack-and-chew-chew-biscuit (mp3cut.net).mp3")
  jump=loadSound("salamisound-8883228-sfx-power-up-1-games.mp3")
}



function setup() {
  createCanvas(600,400)
  
  backgrounds=createSprite(100,0,600,100)
   backgrounds.addImage("backing",backgroundimg)
  backgrounds.velocityX=-2
  
monkey=createSprite(100,300,50,50)
  monkey.addAnimation("running",monkey_running)
  monkey.addAnimation("standing",monkey_stand)
  monkey.scale=0.1
  
  
  ground=createSprite(300,300,600,10)
  ground.velocityX=-2
  
  foodGroup = new Group() ;
obstacleGroup= new Group();
 
  
}


function draw() {
  background("skyblue")
  
  monkey.collide(ground)
  if(backgrounds.x<100)
    {
  backgrounds.x=backgrounds.width/2
    }
  console.log(monkey.y)
  if(gamestate=== "play")
 { 
   
   ground.debug=true
   ground.visible=false
   monkey.collide(ground);
  if(ground.x<300)
  {
    ground.x=ground.width/2
  }
  
 
  if(keyDown("space")&&  monkey.y>230)
    {
      monkey.velocityY=-4
      jump.play()
   }
   if (monkey.y<150)
        {
       monkey.velocityY=monkey.velocityY+0.8
        }
  if(foodGroup.isTouching(monkey))
    { 
      switch(monkey.scale)
        {
          case 0.1: monkey.scale=0.15; break;
          case 0.15: monkey.scale=0.17; break;
          case 0.17: monkey.scale=0.2; break;
        }
      foodGroup.destroyEach()
      points= points +1
     eat_sound.play()
    
    }
  
   
     bananas();
    obstacles(); 
   
  
   
   
   score= score+ Math.round(getFrameRate()/60)
   backgrounds.velocityX=-(2+3*score/100)
   
    if(monkey.isTouching(obstacleGroup) && monkey.scale===0.1)
        {
          gamestate="end" 
        }
   
  if(obstacleGroup.isTouching(monkey)&& monkey.scale>0.1)
    {  
      
    
      gamestate="smallsize"
    }
   
  
 }
  
  if(gamestate==="smallsize")
    {
      monkey.scale=0.1
      obstacleGroup.destroyEach()
      gamestate="play"
    }
      
      
    
      
    
 if(gamestate==="end")
  {
     monkey.changeAnimation("standing",monkey_stand)
    
     
    backgrounds.velocityX=0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    monkey.velocityY=0;
   

  }
  
  if(keyDown("r")&& gamestate==="end")
    { monkey.y=ground.y
      points=0;
      score=0;
      gamestate="play";
      obstacleGroup.destroyEach();
      foodGroup.destroyEach();
       monkey.changeAnimation("running",monkey_running)
  
    }

   drawSprites()
  
  stroke("white")
      fill("white")
      textSize(20)
text("LIFETIME: "+score,400,50 )
  text("BANANAS EATEN: "+ points, 100,50)
  if(gamestate==="end")
    {
       text("press R to restart the game",150,250)
   fill("white")
     stroke("white")
      textSize(30)
    text("GAME OVER",200, 200);
    }

  

}
function bananas()
{
  if(frameCount % 80 === 0)
  {
    banana=createSprite(600,250,10,10)
  banana.addImage(bananaImage)
  banana.scale= 0.1
   
  banana.setCollider("rectangle",0,0,100,50) 
    rand=Math.round(random(140,240))
    banana.y=rand;
    banana.velocityX=-(8+3*score/100)
   banana.lifeTime=150
  
  foodGroup.add(banana)
  }
}

function obstacles()
{
  if(frameCount%300 === 0)
{
   obstacle=createSprite(600,280,50,50)
  obstacle.addImage(obstaceImage)
  obstacle.velocityX=-(5+3*score/100)
  obstacle.scale=0.2
  obstacle.lifeTime=120
  
  obstacle.setCollider("circle",0,0,150);
  obstacleGroup.add(obstacle)

}
}


