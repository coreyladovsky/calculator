import React from 'react';
import "../css/Number.css"
const Number = ({num, handleClick}) => {
    return(
        <div className={"Number"} onClick={() => handleClick(num)}>
            {num}
        </div>
    )
}

export default Number