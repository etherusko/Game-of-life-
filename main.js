import {Cell} from "./Cell.js";
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d',{alpha : false});
const cellSize = 10;
const rows = Cell.rows;
const cols = Cell.cols;
const cellsArray = Cell.initCells();
const cw = cellSize*cols;
const ch = cellSize*rows;
canvas.width = cw;
canvas.height = ch;
ctx.fillStyle = Cell.color;
Cell.initNeighbors();
requestAnimationFrame(loop)
let frame = 0;
function loop(){
    frame++;
    if(frame%4==0){
        ctx.clearRect(0,0,cw,ch);
        cellsArray.forEach(row => row.forEach(cell => cell.evalNeighbors()));
        cellsArray.forEach(row => row.forEach(cell => {
            cell.updateCell();
            if(cell.state == 1) ctx.fillRect(cell.pos.x*cellSize,cell.pos.y*cellSize,cellSize,cellSize);
    }))}
    requestAnimationFrame(loop)
}