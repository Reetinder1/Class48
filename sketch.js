var police,thief,policeImage,thiefImage,bulletFlag = 0,bullet;
var edge;
var gameState = 0;
var playbutton,playbuttonImage;
var bulletGroup;
var thief1,kill1 =0,gameOver;

function preload() {
  policeImage = loadImage("police.png");
  thiefImage = loadImage("thief.png");
  playbuttonImage = loadImage("Play Button.png");
  Background = loadImage("Bg1.png");
  gameOver = loadImage("gmo.png");
  thief1img = loadImage("Thief1Image.png");
  youwinImg = loadImage("youwin.png");
}
function setup() {
  //createCanvas(800, 400);
  createCanvas(windowWidth,windowHeight);
 //police = createSprite(40, 200,20,20);
 police = createSprite(40,height/2,20,20);
 //thief = createSprite(200,300,20,20);
 thief =createSprite(200,height/2,20,20);
 bulletFlag = 0;
 bullet = createSprite(75,196,5,5);
 police.addImage(policeImage);
 thief.addImage(thiefImage);
 thief1 = createSprite(200,-1,20,20);
 thief1.addImage(thief1img);
 thief1.visible = false;
 police.scale = 0.1;
 thief.scale = 0.07;
 thief1.scale = 0.07;
 edge = createEdgeSprites()
 playbutton = createSprite(width/2,height-100);
 playbutton.addImage(playbuttonImage);
 playbutton.scale = 0.1;
 bulletGroup = new Group();
}


 
 function draw() {
if(gameState===0){
  background("black");
  text("controls:",width/2,100);
  text("Press up,down,left,right arrow keys for movement of police",width/2,150);
  text("Press Space to fire the bullet on the  theif",width/2,200);
  text("Click oN PLAy BUttOn tO stARt tHe GaMe",width/2,250);
  if (mousePressedOver(playbutton)){
    gameState = 1;

  }
}
if(gameState===1){



background(Background);
playbutton.visible = false;
  if(keyDown(UP_ARROW)){
    police.y = police.y-2;
  }
  if(keyDown(DOWN_ARROW)){
    police.y = police.y+2;
  }
  if(keyDown(RIGHT_ARROW)){
    
    police.x = police.x+2;
  }
  if(keyDown(LEFT_ARROW)){
    police.x = police.x-2;
  }
  if(touches.length>0 ||keyDown("SPACE")&&bulletFlag===0){
    fire();
    bulletFlag =1;
    
  }
  if(bullet.x>width/2){
    bulletFlag = 0;

  }
  thief.velocityX = 2;
 thief.velocityY = Math.round(random(-2,2));
 thief.y = Math.round(random(100,height-300))
   //thief.bounceOff(edge[0]);
   //thief.bounceOff(edge[3]);
   if(bullet.isTouching(thief)){
     thief.remove()
     kill1 =1;
     bulletFlag = 0;
   }
   if(thief.x>width||thief1.x>width){
     
     gameState = 3;
     
   }
    if(kill1===1){
     thief1.visible = true;
     
     bullet.velocityX = 5;

     thief1.velocityX = 4;
     console.log("x"+thief1.velocityX)
     thief1.velocityY = Math.round(random(-2,2));
     thief1.y = Math.round(random(100,height-300))
    }
    if(bullet.isTouching(thief1)){
      thief1.remove()
        gameState = 2

      
      
    }
    if(thief.x>width||thief1.x>width){
      gameState = 3;
    }
  }
  if(gameState===2){
    background(youwinImg);
    bulletGroup.destroyEach();
    
   
  }
  if(gameState===3){
    background(gameOver);
    bulletGroup.destroyEach();
    textSize(30);
    
  }
  drawSprites();
}
function fire() {
  bullet = createSprite(75,196,5,5);
  bullet.shapeColor = "red";
  bullet.x = police.x+35;
  bullet.y = police.y-4;
  bullet.velocityX = 3;
  bulletGroup.add(bullet);
}