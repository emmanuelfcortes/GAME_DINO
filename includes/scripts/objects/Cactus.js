const CACTO_START_POSITION = "76vw";
var cactus = document.createElement("div");
cactus.classList.add("posicao_cacto");
cactus.style.left = "76vw";
var imgCacto = document.createElement("img");
imgCacto.src = "./includes/img/cacto.gif";
imgCacto.classList.add("cacto_simples");
cactus.appendChild(imgCacto);

export {CACTO_START_POSITION, cactus as docCactoSimples}

