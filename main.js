import {Cell} from "./Cell.js";
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d',{alpha : false});
const cellSize = 10;
const rows = 50;
const cols = 80;
const cellsArray = [];
const cw = cellSize*cols;
const ch = cellSize*rows;
canvas.width = cw;
canvas.height = ch;

ctx.fillStyle = Cell.color;
initCells();
initNeighbors();
console.log(cellsArray)

function initCells(){
    for(let i=0; i<rows; i++){
        cellsArray[i]=[]
        for(let j=0; j<cols; j++){
            cellsArray[i].push(new Cell(j,i));
        }
    }
}
function initNeighbors(){
    cellsArray.forEach(row => row.forEach(cell => {
        let x = cell.pos.x;
        let y = cell.pos.y;
        if(x > 0){
            cell.neighbors.push(cellsArray[y][x-1]);
            if(y > 0)cell.neighbors.push(cellsArray[y-1][x-1]);
            if(y < rows-1)cell.neighbors.push(cellsArray[y+1][x-1]);
        }
        if(x < cols-1){
            cell.neighbors.push(cellsArray[y][x+1]);
            if(y > 0)cell.neighbors.push(cellsArray[y-1][x+1]);
            if(y < rows-1)cell.neighbors.push(cellsArray[y+1][x+1]);
        }
        if(y > 0)cell.neighbors.push(cellsArray[y-1][x])
        if(y < rows-1)cell.neighbors.push(cellsArray[y+1][x])
    }));
}

requestAnimationFrame(loop)
let frame = 0;
function loop(){
    frame++;
    if(frame%5==0){
    ctx.clearRect(0,0,cw,ch);
    //Evaluar vecinos
    cellsArray.forEach(row => row.forEach(cell => cell.evalNeighbors()));
    //update cells
    cellsArray.forEach(row => row.forEach(cell => {
        cell.updateCell();
        if(cell.state == 1) ctx.fillRect(cell.pos.x*cellSize,cell.pos.y*cellSize,cellSize,cellSize);
        cell.lifeAround=0;
    }))
    }
    console.log('hola loop');
    requestAnimationFrame(loop)
}