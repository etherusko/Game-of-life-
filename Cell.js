export class Cell{
    static color = 'yellow';
    static rows = 150;
    static cols = 240;
    static cellsArray = [];
    constructor(x,y){
        this.state = Math.floor(Math.random()*2);
        this.pos = {
            x : x,
            y : y
        }
        this.lifeAround = 0;
        this.neighbors = [];
    }
    /*Methods*/
    evalNeighbors(){
        this.neighbors.forEach(n => {if(n.state == 1) this.lifeAround++});
    }
    updateCell(){
        if(this.state == 1){
            if(this.lifeAround != 2 && this.lifeAround != 3) this.state = 0; 
        }else{
            if(this.lifeAround == 3) this.state = 1;
        }
        this.lifeAround = 0;
    }
    /*Static Methods*/  
    static initCells(){
        for(let i=0; i<this.rows; i++){
            this.cellsArray[i]=[]
            for(let j=0; j<this.cols; j++){
                this.cellsArray[i].push(new Cell(j,i));
            }
        }
        return this.cellsArray;
    }
    static initNeighbors(){
        this.cellsArray.forEach(row => row.forEach(cell => {
            let x = cell.pos.x;
            let y = cell.pos.y;
            if(x > 0){
                cell.neighbors.push(this.cellsArray[y][x-1]);
                if(y > 0)cell.neighbors.push(this.cellsArray[y-1][x-1]);
                if(y < this.rows-1)cell.neighbors.push(this.cellsArray[y+1][x-1]);
            }
            if(x < this.cols-1){
                cell.neighbors.push(this.cellsArray[y][x+1]);
                if(y > 0)cell.neighbors.push(this.cellsArray[y-1][x+1]);
                if(y < this.rows-1)cell.neighbors.push(this.cellsArray[y+1][x+1]);
            }
            if(y > 0)cell.neighbors.push(this.cellsArray[y-1][x])
            if(y < this.rows-1)cell.neighbors.push(this.cellsArray[y+1][x])
        }));
    }
}
