import {Cell} from "./Cell.js";
import {ctx,cellSize,updateCanvas} from "./main.js";
const btnRandom = document.getElementById('btn-random');
const btnPlay = document.getElementById('play-pause');
const play = btnPlay.getElementsByTagName('img').item(0);
const pause = btnPlay.getElementsByTagName('img').item(1);
const btnNext = document.getElementById('btn-next');
const iptSpeed = document.getElementById('speed');

btnRandom.addEventListener('click',()=>{
    ctx.clearRect(0,0,cellSize*Cell.cols,cellSize*Cell.rows);
    Cell.initCells("toroidal");
    Cell.cellsArray.forEach(row => row.forEach(cell => {
        if(cell.state == 1) ctx.fillRect(cell.pos.x*cellSize,cell.pos.y*cellSize,cellSize,cellSize);
    }));
});
btnPlay.addEventListener('click',()=>{
    Cell.playPause();
    play.hasAttribute('hidden') ? changePlaybtn(play,pause) : changePlaybtn(pause,play);
});
btnNext.addEventListener('click',()=>{
    updateCanvas();
});
iptSpeed.addEventListener('input',()=> {
    Cell.speed = 16-iptSpeed.value;
})

function changePlaybtn(a,b){
    a.removeAttribute('hidden');
    b.setAttribute('hidden',"");
}
