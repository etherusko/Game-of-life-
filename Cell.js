export class Cell{
    static color = 'yellow';
    static rows = 120;
    static cols = 192;
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
    /** static method: initNeighbors()
     * 
     * @param {String} space - defines the type of grid space:
     *                         space = 'limited' by default.
     *                         space = 'cylindrical' joins columns only
     *                         space = 'toroidal' joins rows and colums
     */
    static initNeighbors(space = "limited"){
        let arr = this.cellsArray;
        this.cellsArray.forEach(row => row.forEach(cell => {
            //Variables abreviadas para mejor legibilidad
            const x = cell.pos.x;
            const y = cell.pos.y;
            const ns = cell.neighbors;
            const cylindrical = space=='cylindrical';
            const toroidal = space=='toroidal';

            const isX0 = (x>0) ? x-1 : (cylindrical+toroidal) ? this.cols-1 : undefined;
            const isY0 = (y>0) ? y-1 : (toroidal) ? this.rows-1 : undefined;
            const isXMax = (x<this.cols-1) ? x+1 : (cylindrical+toroidal) ? 0 : undefined;
            const isYMax = (y<this.rows-1) ? y+1 : (toroidal) ? 0 : undefined;

            if(!isNaN(isY0+isX0))ns.push(arr[isY0][isX0]);
            if(!isNaN(isY0+isXMax))ns.push(arr[isY0][isXMax]);
            if(!isNaN(isY0+x))ns.push(arr[isY0][x]);
            if(!isNaN(isYMax+isX0))ns.push(arr[isYMax][isX0]);
            if(!isNaN(isYMax+isXMax))ns.push(arr[isYMax][isXMax]);
            if(!isNaN(isYMax+x))ns.push(arr[isYMax][x]);
            if(!isNaN(y+isX0))ns.push(arr[y][isX0]);
            if(!isNaN(y+isXMax))ns.push(arr[y][isXMax]);
        }));
    }
}
