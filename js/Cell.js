export class Cell{
    static color = 'yellow';
    static rows = 120;
    static cols = 192;
    static cellsArray = [];
    static #frames = 0;
    static steps = 0;
    static #Run = true;
    static speed = 5;
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
        this.neighbors.forEach(neighbor => this.lifeAround += neighbor.state);
    }
    updateCell(){
        (this.state == 1) ? this.state = (1 < this.lifeAround && this.lifeAround < 4) ? 1 : 0
                          : this.state = (this.lifeAround == 3) ?  1 : 0;
        this.lifeAround = 0;
    }
    
    /*Static Methods*/
    /** static method: initCells()
     * 
     * @param {String} space - defines the type of grid space:
     *                         space = 'limited' by default.
     *                         space = 'cylindrical' joins columns only
     *                         space = 'toroidal' joins rows and colums
     */ 
    static initCells(space = "limited"){
        for(let i=0; i<this.rows; i++){
            this.cellsArray[i]=[]
            for(let j=0; j<this.cols; j++){
                this.cellsArray[i].push(new Cell(j,i));
            }
        }
        this.#initNeighbors(space);
        this.steps = this.#frames = 0;
        return this.cellsArray;
    }
    /**Private Method #initNeighbor
    * call inside initCells() */
    static #initNeighbors(space){
        let arr = this.cellsArray;
        this.cellsArray.forEach(row => row.forEach(cell => {
            //Variables abreviadas para mejor legibilidad
            const x = cell.pos.x;
            const y = cell.pos.y;
            const cylindrical = space=='cylindrical';
            const toroidal = space=='toroidal';
            // [x][y] values considering borderline cases and space type
            const isX0 = (x>0) ? x-1 : (cylindrical+toroidal) ? this.cols-1 : undefined;
            const isY0 = (y>0) ? y-1 : (toroidal) ? this.rows-1 : undefined;
            const isXMax = (x<this.cols-1) ? x+1 : (cylindrical+toroidal) ? 0 : undefined;
            const isYMax = (y<this.rows-1) ? y+1 : (toroidal) ? 0 : undefined;
            // Adding 8 neighbors
            if(isY0+isX0 >= 0) cell.neighbors.push(arr[isY0][isX0]);
            if(isY0+isXMax >= 0) cell.neighbors.push(arr[isY0][isXMax]);
            if(isY0+x >= 0) cell.neighbors.push(arr[isY0][x]);
            if(isYMax+isX0 >= 0) cell.neighbors.push(arr[isYMax][isX0]);
            if(isYMax+isXMax >= 0) cell.neighbors.push(arr[isYMax][isXMax]);
            if(isYMax+x >= 0) cell.neighbors.push(arr[isYMax][x]);
            if(y+isX0 >= 0) cell.neighbors.push(arr[y][isX0]);
            if(y+isXMax >= 0) cell.neighbors.push(arr[y][isXMax]);
        }));
    }
    static get frames() {
        return this.#frames++;
    }

    static get Run(){
        return this.#Run;
    }

    static playPause(){
        this.#Run = this.#Run ? 0 : 1; 
    }
}