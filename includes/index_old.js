
var pontos =  0;
var docPontos = document.getElementById('pontos');
var quadroPrincipal = document.getElementById('quadro_principal');
//var docCactoSimples = document.getElementById("posicaoCactoSimples");

var docCactoSimples = document.createElement("div");
docCactoSimples.classList.add("posicao_cacto");
docCactoSimples.style.left = "76vw";
var imgCacto = document.createElement("img");
imgCacto.src = "./includes/img/cacto.gif";
imgCacto.classList.add("cacto_simples");
docCactoSimples.appendChild(imgCacto);
var fundo = document.getElementById("fundo");
var cactosNaTela = [];
var docDinossauro = document.getElementById("posicaoDinossauro");
var posicaoInicialDinossauro = getComputedStyle(docDinossauro).marginTop;
var posicaoInicialCacto = docCactoSimples.style.marginRight;
var quadroPrincipal = document.getElementById("quadro_principal");
var hiscore = document.getElementById("hiscore");
var contadorPontuacao;
var isDinoStopped = true;
var fimJogo = document.createElement("div");
var moveControl = "move";
fimJogo.classList.add("pontuacao");
fimJogo.style.position="relative";
fimJogo.id="fimJogo";
fimJogo.innerText = "END GAME - PRESS A KEY TO CONTINUE...";
docPontos.innerText = pontos;
var i=1;
loadgame();


function loadgame(){
    
    moveControl= "move";
    
    if(document.getElementById("fimJogo")){
        console.log("achou fimJogo");
        quadroPrincipal.removeChild(fimJogo);
        
    }
    else    
        console.log("Não achou fimJogo");
    
    if(cactosNaTela.length>0){
        console.log("loadgame: cactosNaTela: "+cactosNaTela.length);
        cactosNaTela.forEach(c => {
            document.body.removeChild(c);
        })
        cactosNaTela = [];
    }
    fundo.classList.add("animacao");
    
    console.log("loadgame: posicaoInicialCacto= "+posicaoInicialCacto);
    document.removeEventListener("keypress", loadgame,false);
    document.addEventListener("keydown", dinossauroPular,false);
    //docCactoSimples.style.marginRight = posicaoInicialCacto;
    criarCactos();
    contadorPontuacao = setInterval(()=>{aumentarPontuacao()}, 200);
    
    
}
function endgame(){
    console.log("endgame");
    document.removeEventListener("keydown",dinossauroPular, false) 
    document.addEventListener("keypress",loadgame, false)
    console.log("Entrou no endgame");
    clearInterval(contadorPontuacao);
    quadroPrincipal.appendChild(fimJogo);
    fundo.classList.remove("animacao");
     
     
       
}

function criarCactos(){
    let randomTime =  Math.random();
    if(randomTime>=0.02 && randomTime<0.1)
        randomTime +=0.08;
    randomTime *= 6000;
    
    console.log("randomTime: " + randomTime);
    let cacto = docCactoSimples.cloneNode(true);
    cactosNaTela.push(cacto);
    document.body.appendChild(cacto);
    
    let contadorMoverCacto = setInterval( function() {
        
        if(detectarColisao(cacto, docDinossauro) == true || moveControl=="stop"){
            console.log("Detectou colisão = true e tamanho do cactosNaTela ="+cactosNaTela.length);
            console.log("Posicao cacto colisao = "+ cacto.style.left  + " e posicao dino = "+ getComputedStyle(docDinossauro).marginTop);
            clearInterval(contadorMoverCacto);
            clearTimeout(contadorcriarCactos);
            moveControl="stop";
            endgame();
        }
        else if(moverCacto(cacto) == false){
            clearInterval(contadorMoverCacto);
            document.body.removeChild(cacto);
            console.log("cactosNaTela.original size = "+ cactosNaTela.length);
            cactosNaTela = cactosNaTela.filter( c => c != cacto);
            console.log("cactosNaTela size final: "+ cactosNaTela.length);
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

function dinossauroPular(){
    document.removeEventListener("keypress",()=>{});
    if(isDinoStopped==true){
        isDinoStopped = false;
        puloDinossauro();
    }
    document.addEventListener("keypress", dinossauroPular,false);
 }
 function puloDinossauro(){
        let position = posicaoInicialDinossauro;
        //console.log("posicao inicial = "+position);
        position = parseInt(position.slice(0,position.length-2));
        

        let intervaloSubida = setInterval(
            function(){
                position -=60;
                docDinossauro.style.marginTop = position +"px";
                //console.log("subindo: "+ getComputedStyle(docDinossauro).marginTop);
            }, 100);
        setTimeout(function () { 
            clearInterval(intervaloSubida);
            let intervaloDecida = setInterval(
                function(){
                    position +=60;
                    docDinossauro.style.marginTop = position +"px";
                    //console.log("descendo"+ getComputedStyle(docDinossauro).marginTop);
                }, 100);

            setTimeout(function () {
         clearInterval(intervaloDecida);
         docDinossauro.style.marginTop = posicaoInicialDinossauro;
         isDinoStopped = true;
     }, 300);
        }, 300);
        
}




function moverCacto(cacto){
    let position= -5;
    if(cacto.style.left){
        position = cacto.style.left;
        console.log("moverCacto: position = "+position);
        position = parseInt(position.slice(0,position.length-2));
        if(position >= 0){
            position -= 2;
        }
        else if(position <= -2){
            console.log("moverCacto: position <= -3 =>  " + position);
            cacto.style.left= position +"vw";
            return false;
        }
    }
    else{
        console.log("NO VALID POSITION: ")
        position = 76;        
    }
    
    cacto.style.left= position + "vw";
    //console.log("moverCacto: cacto.style.marginRight: " +cacto.style.marginRight);

    
}
function detectarColisao(cacto, dinossauro){
    let cactoPosition = cacto.style.left;
    //console.log("cactoLeft = " + cacto.style.left);
    cactoPosition = parseInt(cactoPosition.slice(0,cactoPosition.length-2));
    let dinossauroPosition = getComputedStyle(dinossauro).marginTop;
    dinossauroPosition = parseInt(dinossauroPosition.slice(0,dinossauroPosition.length-2));
    //cactoPositionPercentual = parseFloat(cactoPosition/window.innerWidth);
    //dinossauroPositionPercentual = parseFloat(dinossauroPosition/window.innerHeight);
    cactoPositionPercentual = parseFloat(cactoPosition/window.innerWidth);
    dinossauroPositionPercentual = parseFloat(dinossauroPosition/window.innerHeight);
    //console.log("cactoPosition = " + cactoPosition + " dinoPosition=" + getComputedStyle(dinossauro).marginTop);
    if(cactoPosition>=-2 && cactoPosition<=5 && dinossauroPosition>215 ){
        console.log("detectouColisao!!!!!!!!!!!!!!!")
        console.log("cacto: "+ cactoPosition + " dinossauro: " + dinossauroPosition);

        if(parseInt(docPontos.innerText)>parseInt(hiscore.innerText))
            hiscore.innerText=docPontos.innerText;
        docPontos.innerText = 0;
        pontos = 0;
        return true;
    }
    return false;
}
