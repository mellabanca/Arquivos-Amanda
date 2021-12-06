var dinognomo, dinognomofoto;
var solopassado;
var solopassadofoto;
var solotrapaceiro;
var nuvemantiquada,nuvemantiquadaimage;
function preload(){
    dinognomofoto = loadAnimation("trex1.png", "trex3.png", "trex4.png");
    solopassadofoto = loadImage("ground2.png");
    nuvemantiquadaimage=loadImage("cloud.png");
}

function setup(){
createCanvas(600,200);
    dinognomo = createSprite(50,160,20,50);
    dinognomo.addAnimation("correndo", dinognomofoto);
    dinognomo.scale = 0.5;
    borda = createEdgeSprites();
    solopassado = createSprite (200,180,400,20);
    solopassado.addImage("solodoido",solopassadofoto);
    solopassado.x = width/2;
    solotrapaceiro=createSprite(200,190,400,10);
    solotrapaceiro.visible=false;
    //var number = Math.round(random(1,100));
    //console.log(number);
    console.log("Oi"+5);
}

function draw(){
background("darkseagreen");
//console.log(dinognomo.y);
    solopassado.velocityX=-2;
if(solopassado.x<0) {
    solopassado.x=width/2;
}
if(keyDown("space")&&dinognomo.y>=150){
    dinognomo.velocityY = -10;
}
    dinognomo.velocityY = dinognomo.velocityY + 1;
    dinognomo.collide(solotrapaceiro);
createNuvem();
drawSprites();
}

function createNuvem(){
    if(frameCount%60===0){
        nuvemantiquada=createSprite(600,100,40,10);
        nuvemantiquada.addImage(nuvemantiquadaimage);
        nuvemantiquada.y=Math.round(random(10,120));
        nuvemantiquada.velocityX=-3; 
        nuvemantiquada.depth=dinognomo.depth;
        dinognomo.depth=dinognomo.depth+1;
        nuvemantiquada.lifetime = 250;
    }
  
}