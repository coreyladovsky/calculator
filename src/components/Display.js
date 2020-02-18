import React from 'react';
import "../css/Display.css";

const Display = ({num}) => {
    const  numberWithCommas = (x) =>  x.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
    return(
        <div className={"display"}>{numberWithCommas(num)}</div>
    )
}

export default Display;