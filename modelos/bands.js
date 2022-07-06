const Band = require("./band");

class Bands {

    constructor() {
        this.bands = [];
    }

    addBand( banda = new Band()){
        this.bands.push(banda);
    }

    getBands(){
        return this.bands;
    }

    deleteBand( id = ''){
        this.bands = this.bands.filter( band => band.id != id);
        return this.bands;
    }   

    voteBand( id = ''){ // eliminamos asi por q aun no hay db
         this.bands = this.bands.map( band => {

            if(band.id === id ){
                band.votos ++;
                return band;    
            }else{
                return band;
            }
         })
    }

}

module.exports = Bands;