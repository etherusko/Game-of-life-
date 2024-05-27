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
            let x = cell.pos.x;
            let y = cell.pos.y;
            let ns = cell.neighbors;
            if(x > 0){
                ns.push(arr[y][x-1]);
                (y > 0) ? ns.push(arr[y-1][x-1]) : (space == "toroidal") ? ns.push(arr[this.rows-1][x-1]) : 0;
                (y < this.rows-1) ? ns.push(arr[y+1][x-1]) : (space == "toroidal") ? ns.push(arr[0][x-1]) : 0;
            }else{
                (space == "cylindrical" || space == "toroidal") ? ns.push(arr[y][this.cols-1]) : 0;
                (y > 0) ? ns.push(arr[y-1][this.cols-1]) : (space == "toroidal") ? ns.push(arr[this.rows-1][this.cols-1]) : 0;
                (y < this.rows-1) ? ns.push(arr[y+1][this.cols-1]) : (space == "toroidal") ? ns.push(arr[0][this.cols-1]) : 0;
            }
            if(x < this.cols-1){
                ns.push(arr[y][x+1]);
                (y > 0) ? ns.push(arr[y-1][x+1]) : (space == "toroidal") ? ns.push(arr[this.rows-1][x+1]) : 0;
                (y < this.rows-1) ? ns.push(arr[y+1][x+1]) : (space == "toroidal") ? ns.push(arr[0][x+1]) : 0;
            }else{
                (space == "cylindrical" || space == "toroidal") ? ns.push(arr[y][0]) : 0;
                (y > 0) ? ns.push(arr[y-1][0]) : (space == "toroidal") ? ns.push(arr[this.rows-1][0]) : 0;
                (y < this.rows-1) ? ns.push(arr[y+1][0]) : (space == "toroidal") ? ns.push(arr[0][0]) : 0;
            }
            (y > 0) ? ns.push(arr[y-1][x]) : (space == "toroidal") ? ns.push(arr[this.rows-1][x]) : 0;
            (y < this.rows-1) ? ns.push(arr[y+1][x]) : (space == "toroidal") ? ns.push(arr[0][x]) : 0;
        }));
    }
}
