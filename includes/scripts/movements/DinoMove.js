function dinossauroPular(posicaoInicialDinossauro, docDinossauro, endDinoJumpEvent){
    let position = posicaoInicialDinossauro;
    position = parseInt(position.slice(0,position.length-2));
    
   let i = 0; 
    let dinoMoveInterval = setInterval(
        function(){
            if(i<3){
                position -=60;
                docDinossauro.style.marginTop = position +"px";
                i++;
            }
            else if(i>=3 && i<=5){
                position +=60;
                docDinossauro.style.marginTop = position +"px";
                i++;
                if(i==5){document.dispatchEvent(endDinoJumpEvent);} 
            }
            else{
                
                docDinossauro.style.marginTop = posicaoInicialDinossauro;
                clearInterval(dinoMoveInterval);
                console.log("ENDING JUMP---------------------")
            }
    }, 100);
    return dinoMoveInterval;
}

export {dinossauroPular};




