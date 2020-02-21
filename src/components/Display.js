import React from 'react';
import "../css/Display.css";

const Display = ({num}) => {
    const  format = (num) =>{
        if(num.length > 10) {
            let str =  Number(num).toExponential(9).toString();
            let output = "";
            const plusIdx = str.indexOf("+");

            let encounterPlus = true;

            for(let i = plusIdx - 2; i >= 0; i--) {
                if(str[i] === "0" && encounterPlus) {
                    continue 
                } else {
                    encounterPlus = false;
                    output = str[i]  + output;
                }
            
            }
            return output + "e" +str.slice(plusIdx + 1);
        }
        if(!Number.isInteger(Number(num)) || num[num.length - 1] === ".") {
            return num; 
        }

        let commas = Math.abs(num).toLocaleString();
        return Number(num) < 0 ? "-" + commas : commas

    }  
    return(
        <div className={"display"}>{format(num)}</div>
    )
}

export default Display;