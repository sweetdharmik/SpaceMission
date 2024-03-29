var rocketAnimation, rocket;
var spacebgImg, spacebg;
var gameState = 0;
var toutorialImg, toutorial;
var playImg, playButton;
var infoButton;
var backImg, backButton;
var meteor, meteorImg, meteorG;
var ufo, ufoImg, ufoG;
var powerBolt, powerBoltImg, powerBoltG;
var space, spaceImg;
var power = 0;
var powerCount = 0;
var level = 0;

function preload() {

    rocketAnimation = loadAnimation("rocket1.png", "rocket2.png", "rocket3.png", "rocket4.png", "rocket5.png", "rocket6.png", "rocket7.png");
    spacebgImg = loadImage("spacebg.png");
    toutorialImg = loadImage("toutorial.png");
    playImg = loadImage("playButton.png");
    backImg = loadImage("backButton.png");
    meteorImg = loadImage("meteor.png");
    powerBoltImg = loadImage("powerbolt.png");
    ufoImg = loadImage("ufo.png");
    spaceImg = loadImage("space.png");
}

function setup() {

createCanvas(800, 600)

  space = createSprite(400,300);
  space.addAnimation("space", spaceImg);
  space.scale = 0.8;
  space.visible = false;

  spacebg = createSprite(400,300);
  spacebg.addImage("space",spacebgImg);
  spacebg.velocityX = -5;
  spacebg.scale = 2;
  

  rocket = createSprite(200,300);
  rocket.addAnimation("rocket", rocketAnimation);
  rocket.scale = 1;
  rocket.visible = false;

  toutorial = createSprite(400, 300);
  toutorial.addImage("toutorial", toutorialImg);
  toutorial.scale = 0.6;
  toutorial.visible = false;

  playButton = createSprite(375, 500);
  playButton.addImage("play", playImg);
  playButton.scale = 0.3;
  playButton.visible = false;
  

  infoButton = createSprite(370, 85, 130, 20);
  infoButton.scale = 3;
  infoButton.visible = false;

  backButton = createSprite(135, 175);
  backButton.addImage("back", backImg);
  backButton.scale = 1;
  backButton.visible = false;

  meteorG = new Group();
  powerBoltG = new Group();
  ufoG = new Group();
}

function draw() {
    background(20);
    drawSprites();

    edges= createEdgeSprites();
    rocket.collide(edges);

    if(gameState === 0){
       
       if(mousePressedOver(playButton)){
        start();
       }
       if(mousePressedOver(infoButton)){
        infoPage();
       }
       if(mousePressedOver(backButton)){
        back();
       }
    
       space.visible = true;
       spacebg.visible = false;
      

       }

    if(gameState === 1){

        image(powerBoltImg, 200, 30, 30, 50);
        fill("white");
        rect(300, 50, 200, 20);
        fill("#ffa500");
        rect(300, 50, power, 20);
        noStroke();

        if(spacebg.x < 300){
            spacebg.x = 500
        }
        if(keyDown(UP_ARROW)){
            rocket.position.y -= 10;
        }
        if(keyDown(DOWN_ARROW)){
            rocket.position.y += 10;
        }
       

        toutorial.visible = false;
        rocket.visible = true;
        spacebg.visible = true;
        infoButton.visible = false;
        space.visible = false;
       
        
      
        if(level === 0){

        
            if(frameCount % 60 === 0){
            spawnPowerBolts();
            }
            if(powerBoltG.collide(rocket)){
                power += 10;
                powerBoltG.destroyEach();
            }

            if(power === 10){
                swal({
                    title: "Level 2",
                    text: "Congratulations! You passed the 1st level!",
                    imageUrl: "https://www.publicdomainpictures.net/pictures/410000/nahled/image-1627467126wPM.png",
                    imageSize: "200x200",
                    confirmButtonText:"OK"
                })
                level = 1;
                //meteorG.destroyEach();
                powerBoltG.destroyEach();
                //ufoG.destroyEach();
            }
            
        }

        if(level === 1){
            
            //power = 0;

             if(frameCount % 100 === 0){     
                spawnPowerBolts();
             }
             if(frameCount % 60 === 0){     
                spawnMeteors();
             }

             if(powerBoltG.collide(rocket)){
                power += 10;
                powerBoltG.destroyEach();
            }

            if(meteorG.collide(rocket)){
                power -= 50;
                meteorG.destroyEach();
            }

            if(power === 30){
                swal({
                    title: "Level 3",
                    text: "Congratulations! You passed the 2nd level!",
                    imageUrl: "https://www.publicdomainpictures.net/pictures/410000/nahled/image-1627467126wPM.png",
                    imageSize: "200x200",
                    confirmButtonText:"OK"
                })
                level = 2;
                meteorG.destroyEach();
                //powerBoltG.destroyEach();
                ufoG.destroyEach();
            }
            
            if(power <= 0){
               gameOver();
            }
        }

        if(level === 2){

            if(frameCount % 100 === 0){                 
                spawnPowerBolts(); 
            }
            if(frameCount % 60 === 0){      
                spawnMeteors(); 
            }
            if(frameCount % 60 === 0){     
                spawnUFOs(); 
            }

            if(powerBoltG.collide(rocket)){
                power += 10;
                powerBoltG.destroyEach();
            }
            if(meteorG.collide(rocket)){
                power -= 50;
                meteorG.destroyEach();
            }
            if(ufoG.collide(rocket)){
                power -= 70;
                ufoG.destroyEach();
            }

            if(power === 50){
                swal({
                    title: "You won!",
                    text: "Congratulations! You have successfully journeyed through space!",
                    imageUrl: "https://www.publicdomainpictures.net/pictures/410000/nahled/image-1627467126wPM.png",
                    imageSize: "200x200",
                    confirmButtonText:"Play Again"
                },
                function(isConfirm){
                  if(isConfirm){
                    location.reload()
                  }
                }
               )

                meteorG.destroyEach();
                powerBoltG.destroyEach();
                ufoG.destroyEach();
            }

            if(power <= 0){
                gameOver();
             }
            
        }
      

      
    }

 
}

function start(){
    playButton.destroy();
    gameState = 1;
    
}

function infoPage(){
    toutorial.visible = true;
    infoButton.visible = false;
    playButton.visible = false;
    backButton.visible = false;

   
}

function back(){
    toutorial.visible = false;
    infoButton.visible = false;
    playButton.visible = false;
   
}

function spawnMeteors(){
   
    meteor = createSprite(850);
    meteor.addImage(meteorImg);
    meteor.y = Math.round(random(50, 550));
    meteor.scale = 0.2;
    meteor.velocityX = -7;
    meteorG.add(meteor);
    meteorG.setLifetimeEach(170);
    meteorG.setColliderEach("rectangle", 0, 0, 50, 50);
    
}

function spawnUFOs(){
  
    ufo = createSprite(850);
    ufo.addImage(ufoImg);
    ufo.y = Math.round(random(50, 550));
    ufo.scale = 0.2;
    ufo.velocityX = -11;
    ufoG.add(ufo);
    ufoG.setLifetimeEach(170);
    ufoG.setColliderEach("rectangle", 0, 0, 50, 50);
    
}

function spawnPowerBolts(){
 
    powerBolt = createSprite(850);
    powerBolt.addImage(powerBoltImg);
    powerBolt.y = Math.round(random(100, 500));
    powerBolt.scale = 0.15;
    powerBolt.velocityX = -10;
    powerBoltG.add(powerBolt);
    powerBoltG.setLifetimeEach(170);
    powerBoltG.setColliderEach("rectangle", 0, 0, 50, 50);
    
}

function gameOver(){
    swal({
        title: "Game Over!",
        text: "The obstacles have damaged the rocket completly!",
        imageUrl: "https://media.tenor.com/DNrNoBnfz4cAAAAC/game-over.gif",
        imageSize: "200x200",
        confirmButtonText:"Play Again"
    },
     function(isConfirm){
       if(isConfirm){
         location.reload()
       }
     }
    )

    meteorG.destroyEach();
    powerBoltG.destroyEach();
    ufoG.destroyEach();
    rocket.destroy();
    playButton.destroy();
}