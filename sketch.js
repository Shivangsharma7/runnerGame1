var PLAY = 1;
var END = 0;
var gamestate = "SERVE";
var boyEnd, gameOverImg;
var path, boy, cash, diamonds, jwellery, sword;
var pathImg, boyImg, cashImg, diamondsImg, restartImg, jwelleryImg, swordImg;
var treasureCollection = 0;
var cashG, diamondsG, jwelleryG, swordG;

function preload() {
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png", "runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg = loadAnimation("gameOver.png");
  boyEnd = loadAnimation("runner1.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("gameOver.png");
}


function setup() {

  createCanvas(windowWidth, windowHeight);
  // Moving background
  path = createSprite(windowWidth - windowWidth / 2, windowHeight / 2);
  path.addImage(pathImg);
  path.velocityY = 4;


  //creating boy running
  boy = createSprite(windowWidth - windowWidth / 2, windowHeight - 50, 20, 20);
  boy.addAnimation("boyEnd", boyEnd);
  boy.addAnimation("boy", boyImg);
  boy.scale = 0.08;


  cashG = new Group();
  diamondsG = new Group();
  jwelleryG = new Group();
  swordG = new Group();

}

function draw() {

  background(0);


  edges = createEdgeSprites();
  boy.collide(edges);

  //code to reset the background
  if (path.y > windowWidth / 2) {
    path.y = height / 2;
  }



  if (gamestate === "SERVE") {
    path.velocityY = 0;
  }


  if (boy.isTouching(swordG)) {
    gamestate = "END";
  }
  if (keyDown("f")) {
    gamestate = "PLAY"
  }

  if (gamestate === "PLAY") {
    boy.changeAnimation("boy", boyImg);

    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    path.velocityY = 4;
    boy.x = World.mouseX;

    camera.position.x = boy.x;
    camera.position.y = boy.y;

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection + 50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection + 50;

    } else if (jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection + 50;

    } else {
      if (swordG.isTouching(boy)) {
        swordG.destroyEach();
      }
    }



  }

  if (gamestate === "END") {
    swordG.destroyEach();
    cashG.destroyEach();
    jwelleryG.destroyEach();
    diamondsG.destroyEach();
    boy.velocityY = 0;
    path.velocityY = 0;
    boy.changeAnimation("boyEnd");

    restartImg.visible = "true";


  }

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: " + treasureCollection, 150, 30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
    var cash = createSprite(Math.round(random(20, windowWidth)), 50, 10, 10);
    cash.addImage(cashImg);
    cash.scale = 0.12;
    cash.velocityY = 3;
    cash.lifetime = 250;
    cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
    var diamonds = createSprite(Math.round(random(20, windowWidth)), 50, 10, 10);
    diamonds.addImage(diamondsImg);
    diamonds.scale = 0.03;
    diamonds.velocityY = 3;
    diamonds.lifetime = 250;
    diamondsG.add(diamonds);
  }
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
    var jwellery = createSprite(Math.round(random(20, windowWidth)), 50, 10, 10);
    jwellery.addImage(jwelleryImg);
    jwellery.scale = 0.13;
    jwellery.velocityY = 3;
    jwellery.lifetime = 250;
    jwelleryG.add(jwellery);
  }
}

function createSword() {
  if (World.frameCount % 150 == 0) {
    var sword = createSprite(Math.round(random(20, windowWidth)), 50, 10, 10);
    sword.addImage(swordImg);
    sword.scale = 0.1;
    sword.velocityY = 3;
    sword.lifetime = 250;
    swordG.add(sword);
  }
}