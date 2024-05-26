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
    /*Méthods*/
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
}