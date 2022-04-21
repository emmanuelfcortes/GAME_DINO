
function moverCacto(cacto){
    let position= -5;
    if(cacto.style.left){
        position = cacto.style.left;
        //console.log("moverCacto: position = "+position);
        position = parseInt(position.slice(0,position.length-2));
        if(position >= 0){
            position -= 2;
        }
        else if(position <= -2){
            //console.log("moverCacto: position <= -3 =>  " + position);
            cacto.style.left= position +"vw";
            return false;
        }
    }
    else{
        //console.log("NO VALID POSITION: ")
        position = 76;        
    }
    
    cacto.style.left= position + "vw";
    //console.log("moverCacto: cacto.style.marginRight: " +cacto.style.marginRight);
}

export {moverCacto};

