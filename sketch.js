var dinognomo, dinognomofoto;

function preload(){
  dinognomofoto = loadAnimation("trex1.png", "trex3.png", "trex4.png");

}

function setup(){
  createCanvas(600,200);
  dinognomo = createSprite(50,160,20,50);
  dinognomo.addAnimation("correndo", dinognomofoto);
  borda = createEdgeSprites();
}

function draw(){
  background("white");

  if(keyDown("space")){
    dinognomo.velocityY = -10;
  }

  dinognomo.velocityY = dinognomo.velocityY + 1;

  dinognomo.collide(borda[3]);

  drawSprites();

}