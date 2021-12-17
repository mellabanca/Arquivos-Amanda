var dinognomo, dinognomofoto,dinocommedo;
var solopassado;
var solopassadofoto;
var solotrapaceiro;
var nuvemantiquada,nuvemantiquadaimage;
var obstaculoone,obstaculotwo,obstaculothree,obstaculofour,obstaculofive,obstaculosix;
var nuvensbarraqueiras, obstaculosirritantes;
var jogandofeliz = 1;
var jogandotriste = 0;
var estado = jogandofeliz;
var pertodeseupai=0;
var quedesgosto;
var desgostoimage;
var maisumachancefilho;
var felicidadeimage;

function preload(){
    dinognomofoto = loadAnimation("trex1.png", "trex3.png", "trex4.png");
    solopassadofoto = loadImage("ground2.png");
    nuvemantiquadaimage=loadImage("cloud.png");
    obstaculoone=loadImage("obstacle1.png");
    obstaculotwo=loadImage("obstacle2.png");
    obstaculothree=loadImage("obstacle3.png");
    obstaculofour=loadImage("obstacle4.png");
    obstaculofive=loadImage("obstacle5.png");
    obstaculosix=loadImage("obstacle6.png");
    desgostoimage=loadImage("gameOver.png");
    felicidadeimage=loadImage("restart.png");
    dinocommedo=loadAnimation("trex_collided.png");
}

function setup(){
createCanvas(600,200);
    dinognomo = createSprite(50,160,20,50);
    dinognomo.addAnimation("correndo", dinognomofoto);
    dinognomo.addAnimation("fracasso",dinocommedo);
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
    nuvensbarraqueiras = new Group();
    obstaculosirritantes = new Group();
    dinognomo.setCollider("circle", 0, 0, 40);
    //dinognomo.debug = true;
    quedesgosto=createSprite(300,90);
    quedesgosto.addImage(desgostoimage);
    maisumachancefilho= createSprite(300,140);
    maisumachancefilho.addImage(felicidadeimage);
}

function draw(){
//console.log(dinognomo.y);
background("darkseagreen");
text("Dino perto de seu pai:"+pertodeseupai,450,50);
console.log("Estado do jogo:", estado);
if(estado === jogandofeliz){
    
    solopassado.velocityX=-2;
    if(solopassado.x<0) {
        solopassado.x=width/2;
    }
    if(keyDown("space")&&dinognomo.y>=150){
        dinognomo.velocityY = -12;
    }
        dinognomo.velocityY = dinognomo.velocityY + 1;
        createNuvem();
        createobstaculo();
        pertodeseupai=pertodeseupai+Math.round(frameCount/60);
        if(obstaculosirritantes.isTouching(dinognomo)){
            estado=jogandotriste;
        }
} else if(estado === jogandotriste){
   // background("darkgreen");
    solopassado.velocityX=0;
    dinognomo.velocityY=0;
    dinognomo.changeAnimation("fracasso",dinocommedo);
obstaculosirritantes.setVelocityXEach(0);
nuvensbarraqueiras.setVelocityXEach(0);
obstaculosirritantes.setLifetimeEach(-1);
nuvensbarraqueiras.setLifetimeEach(-1);
}

    


    dinognomo.collide(solotrapaceiro);

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
        nuvensbarraqueiras.add(nuvemantiquada);
        nuvemantiquada.lifetime = 250;
    }
  
}
function createobstaculo(){
    if(frameCount%60===0){
        var obstaculodoidao =createSprite(600,165,10,40);
obstaculodoidao.velocityX=-6;
var numerojurassico=Math.round(random(1,6));
switch (numerojurassico) {
    case 1:obstaculodoidao.addImage(obstaculoone);
        break;
        case 2:obstaculodoidao.addImage(obstaculotwo);
        break;
        case 3:obstaculodoidao.addImage(obstaculothree);
        break;
        case 4:obstaculodoidao.addImage(obstaculofour);
        break;
        case 5:obstaculodoidao.addImage(obstaculofive);
        break;
        case 6:obstaculodoidao.addImage(obstaculosix);
        break;


    default:
        break;
}
obstaculodoidao.scale=0.5;
obstaculosirritantes.add(obstaculodoidao);
obstaculodoidao.lifetime=300;
    }
}
