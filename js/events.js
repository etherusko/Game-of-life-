import {Cell} from "./Cell.js";
const btnRandom = document.getElementById('btn-random');
btnRandom.addEventListener('click',()=>{
    Cell.initCells("toroidal");
});
