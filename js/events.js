import {Cell} from "./Cell.js";
import {loop} from "./main.js";
let frame = 0;

const btnRandom = document.getElementById('btn-random');

btnRandom.addEventListener('click',()=>{
    Cell.initCells();
    Cell.initNeighbors('toroidal');
    loop()});