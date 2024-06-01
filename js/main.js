import {Cell} from "./Cell.js";
const canvas = document.querySelector('canvas');
export const ctx = canvas.getContext('2d',{alpha : false});
export const cellSize = 10;
const rows = Cell.rows;
const cols = Cell.cols;
const cellsArray = Cell.initCells('toroidal');
const cw = cellSize*cols;
const ch = cellSize*rows;
canvas.width = cw;
canvas.height = ch;
ctx.fillStyle = Cell.color;

requestAnimationFrame(loop);    
function loop(){
    if(Cell.frames%Cell.speed==0 & Cell.Run) updateCanvas();
    requestAnimationFrame(loop);
}
export function updateCanvas(){
    Cell.steps++;
    ctx.clearRect(0,0,cw,ch);
    cellsArray.forEach(row => row.forEach(cell => cell.evalNeighbors()));
    cellsArray.forEach(row => row.forEach(cell => {
        cell.updateCell();
        if(cell.state == 1) ctx.fillRect(cell.pos.x*cellSize,cell.pos.y*cellSize,cellSize,cellSize);
    }))
    //console.log(Cell.steps); //Cell.steps hold real current step of cellsArray.
}   