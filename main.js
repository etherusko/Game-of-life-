const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d',{alpha : false});
const cellSize = 10;
const rows = 50;
const cols = 80;
const cw = cellSize*cols;
const ch = cellSize*rows;
canvas.width = cw;
canvas.height = ch;



ctx.fillStyle = 'yellow'
ctx.fillRect(0,0,cellSize,cellSize);
