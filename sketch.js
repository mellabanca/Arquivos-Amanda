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
var somsaltitante;
var somtristonho;
var somrico;
var mensagemlouca = "Eu sou uma mensagem louca";

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
    somsaltitante=loadSound ("jump.mp3");
    somtristonho=loadSound ("die.mp3");
    somrico=loadSound("checkPoint.mp3");
}

function setup(){
createCanvas(windowWidth,windowHeight);
    dinognomo = createSprite(50,height-70,20,50);
    dinognomo.addAnimation("correndo", dinognomofoto);
    dinognomo.addAnimation("fracasso",dinocommedo);
    dinognomo.scale = 0.5;
    borda = createEdgeSprites();
    solopassado = createSprite (width/2,height-80,width,125);
    solopassado.addImage("solodoido",solopassadofoto);
    solopassado.x = width/2;
    solotrapaceiro=createSprite(width/2,height-10,width,125);
    solotrapaceiro.visible=false;
    //var number = Math.round(random(1,100));
    //console.log(number);
    //console.log("Oi"+5);
    nuvensbarraqueiras = new Group();
    obstaculosirritantes = new Group();
    dinognomo.setCollider("circle", 0, 0, 40);
    //dinognomo.debug = true;
    quedesgosto=createSprite(width/2,height/2-50);
    quedesgosto.addImage(desgostoimage);
    maisumachancefilho= createSprite(width/2,height/2);
    maisumachancefilho.addImage(felicidadeimage);
}

function draw(){
//console.log(mensagemlouca); 
//console.log(dinognomo.y);
background("darkseagreen");
text("Dino perto de seu pai:"+pertodeseupai,50,50);
//console.log("Estado do jogo:", estado);
if(estado === jogandofeliz){
    
    solopassado.velocityX=-(2+pertodeseupai/100);
    if(solopassado.x<0) {
        solopassado.x=width/2;
    }
    if(touches.length > 0 || keyDown("space")&&dinognomo.y>=150){
        dinognomo.velocityY = -12;
        somsaltitante.play();
        touches = [];
    }
        dinognomo.velocityY = dinognomo.velocityY + 1;
        createNuvem();
        createobstaculo();
        pertodeseupai=pertodeseupai+Math.round(frameRate()/60);

        if(pertodeseupai>0 && pertodeseupai%100===0){
            somrico.play();
        }

        if(obstaculosirritantes.isTouching(dinognomo)){
            estado=jogandotriste;
            somtristonho.play();
        }
        quedesgosto.visible=false;
maisumachancefilho.visible=false;

} else if(estado === jogandotriste){

   // background("darkgreen");
    solopassado.velocityX=0;
    dinognomo.velocityY=0;
    dinognomo.changeAnimation("fracasso",dinocommedo);
obstaculosirritantes.setVelocityXEach(0);
nuvensbarraqueiras.setVelocityXEach(0);
if(mousePressedOver(maisumachancefilho)){
    novachance();
}
obstaculosirritantes.setLifetimeEach(-1);
nuvensbarraqueiras.setLifetimeEach(-1);
quedesgosto.visible=true;
maisumachancefilho.visible=true;


}

    


    dinognomo.collide(solotrapaceiro);

    

drawSprites();
}

function novachance(){
    estado=jogandofeliz;
quedesgosto.visible=false;
maisumachancefilho.visible=false;
nuvensbarraqueiras.destroyEach();
obstaculosirritantes.destroyEach();
dinognomo.changeAnimation("correndo",dinognomofoto);
pertodeseupai=0;

}

function createNuvem(){
    if(frameCount%60===0){
        nuvemantiquada=createSprite(width+20,height-300,40,10);
        nuvemantiquada.addImage(nuvemantiquadaimage);
        nuvemantiquada.y=Math.round(random(10,height/2));
        nuvemantiquada.velocityX=-3; 
        nuvemantiquada.depth=dinognomo.depth;
        dinognomo.depth=dinognomo.depth+1;
        nuvensbarraqueiras.add(nuvemantiquada);
        nuvemantiquada.lifetime = 250;
    }
  
}
function createobstaculo(){
    if(frameCount%60===0){
        var obstaculodoidao =createSprite(width,height-95,10,40);
obstaculodoidao.velocityX=-(6+pertodeseupai/100);
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
