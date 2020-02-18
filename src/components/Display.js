import React from 'react';
import "../css/Display.css";

const Display = ({num}) => {
    return(
        <div className={"display"}>{num}</div>
    )
}

export default Display;