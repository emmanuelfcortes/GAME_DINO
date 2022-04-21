function colisionDetection(cacto, dinossauro){
    let cactoPosition = cacto.style.left;
    //console.log("cactoLeft = " + cacto.style.left);
    cactoPosition = parseInt(cactoPosition.slice(0,cactoPosition.length-2));
    let dinossauroPosition = getComputedStyle(dinossauro).marginTop;
    dinossauroPosition = parseInt(dinossauroPosition.slice(0,dinossauroPosition.length-2));
    //cactoPositionPercentual = parseFloat(cactoPosition/window.innerWidth);
    //dinossauroPositionPercentual = parseFloat(dinossauroPosition/window.innerHeight);
    //cactoPositionPercentual = parseFloat(cactoPosition/window.innerWidth);
    //dinossauroPositionPercentual = parseFloat(dinossauroPosition/window.innerHeight);
    //console.log("cactoPosition = " + cactoPosition + " dinoPosition=" + getComputedStyle(dinossauro).marginTop);
    if(cactoPosition>=-2 && cactoPosition<=5 && dinossauroPosition>215 ){
        console.log("detectouColisao!!!!!!!!!!!!!!!")
        console.log("cacto: "+ cactoPosition + " dinossauro: " + dinossauroPosition);  
        return true;
    }
    return false;
}

export { colisionDetection as detectarColisao}
