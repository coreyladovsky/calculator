import React from 'react';
import "../css/Button.css"
const Button = ({sym, handleClick, classStyle}) => {
    return(
        <button className={"Button " + classStyle} onClick={() => handleClick(sym)}>
            {sym}
        </button>
    )
}

export default Button