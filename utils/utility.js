import { dirname } from "path"; 
import { fileURLToPath } from "url";

class Utility{
    static getUID(){
        return Date.now().toString()+(100+(Math.floor(Math.random()*100))).toString().substring(-3) ;
    }

    static currencyFormat(number) {
        const fixedNumber = Number.parseFloat(number).toFixed(2);
        return String(fixedNumber).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    

    static getDirName( filePath ){
        return dirname(fileURLToPath(import.meta.url))+filePath ;
    }
}

export default Utility;