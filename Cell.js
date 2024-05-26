export class Cell{
    static color = 'yellow';
    constructor(x,y){
        this.state = Math.floor(Math.random()*2);
        this.pos = {
            x : x,
            y : y
        }
        this.lifeAround = 0;
        this.neighbors = [];
    }
    evalNeighbors(){
        let life = 0;
                //Evaluar vecinos =>
        //this.state = Math.ceil(Math.random()*2);
    }
}