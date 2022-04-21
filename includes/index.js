import {quadroPrincipal, fundo} from "./scripts/objects/Background.js";
import {CACTO_START_POSITION, docCactoSimples} from "./scripts/objects/Cactus.js";
import { POSICAO_INICIAL_DINO, docDinossauro } from "./scripts/objects/Dino.js";
import { fimJogo } from "./scripts/objects/EndgameMsg.js";
import { docPontos, hiscore, START_PONTUATION } from "./scripts/objects/Pontuation.js";
import {moverCacto} from "./scripts/movements/CactusMove.js";
import {dinossauroPular} from "./scripts/movements/DinoMove.js";
import {detectarColisao} from "./scripts/colisionDetection/DinoCactusColisionDetection.js"
let pontos =  START_PONTUATION;
var cactosNaTela = [];
var contadorPontuacao;
var moveControl = "move";
var i=1;

loadgame();


function loadgame(){
    
    moveControl= "move";
    
    if(parseInt(docPontos.innerText)>parseInt(hiscore.innerText)){
        hiscore.innerText = docPontos.innerText;  
    }
    docPontos.innerText = 0;
    pontos = 0;
    if(document.getElementById("fimJogo")){
        //console.log("achou fimJogo");
        quadroPrincipal.removeChild(fimJogo);
        
    }
    else    
        console.log("Não achou fimJogo");
    
    if(cactosNaTela.length>0){
        //console.log("loadgame: cactosNaTela: "+cactosNaTela.length);
        cactosNaTela.forEach(c => {
            document.body.removeChild(c);
        })
        cactosNaTela = [];
    }
    fundo.classList.add("animacao");
    
    //console.log("loadgame: posicaoInicialCacto= "+CACTO_START_POSITION);
    document.removeEventListener("keypress", loadgame,false);
    document.addEventListener("keydown", dinoJump,false);
    criarCactos();
    contadorPontuacao = setInterval(()=>{aumentarPontuacao()}, 200);
    
    
}

function dinoJump(){
    document.removeEventListener("keydown", dinoJump, false);
    let eventNameToEndDinoJump = "endDinoJump";
    let endDinoJumpEvent = new Event(eventNameToEndDinoJump);
    document.addEventListener(eventNameToEndDinoJump,_activateEventListenerToDinoJump, false);
    dinossauroPular(POSICAO_INICIAL_DINO, docDinossauro, endDinoJumpEvent);
}
function _activateEventListenerToDinoJump(){
    document.addEventListener("keydown", dinoJump, false);
}
function endgame(){
    //console.log("endgame");
    document.removeEventListener("keydown", () => {
        dinossauroPular(POSICAO_INICIAL_DINO, docDinossauro)
    }, false) 
    document.addEventListener("keypress",loadgame, false)
    //console.log("Entrou no endgame");
    clearInterval(contadorPontuacao);
    quadroPrincipal.appendChild(fimJogo);
    fundo.classList.remove("animacao");
     
     
       
}

function criarCactos(){
    let randomTime =  Math.random();
    if(randomTime>=0.02 && randomTime<0.1)
        randomTime +=0.08;
    randomTime *= 6000;
    
    //console.log("randomTime: " + randomTime);
    let cacto = docCactoSimples.cloneNode(true);
    cactosNaTela.push(cacto);
    document.body.appendChild(cacto);
    
    let contadorMoverCacto = setInterval( function() {
        
        if(detectarColisao(cacto, docDinossauro) == true || moveControl=="stop"){
            //console.log("Detectou colisão = true e tamanho do cactosNaTela ="+cactosNaTela.length);
            //console.log("Posicao cacto colisao = "+ cacto.style.left  + " e posicao dino = "+ getComputedStyle(docDinossauro).marginTop);
            clearInterval(contadorMoverCacto);
            clearTimeout(contadorcriarCactos);
            moveControl="stop";
            endgame();
        }
        else if(moverCacto(cacto) == false){
            clearInterval(contadorMoverCacto);
            document.body.removeChild(cacto);
            //console.log("cactosNaTela.original size = "+ cactosNaTela.length);
            cactosNaTela = cactosNaTela.filter( c => c != cacto);
            //console.log("cactosNaTela size final: "+ cactosNaTela.length);
        }
        
            
    }, 80);
    
    let contadorcriarCactos = setTimeout(()=>{
        criarCactos();
    } ,randomTime);
}

function aumentarPontuacao(){
    pontos+=1;
    docPontos.innerText = pontos;
}