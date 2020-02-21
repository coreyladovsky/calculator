import React from 'react';
import "../css/Button.css"
const Button = ({sym, handleClick, classStyle, activeSym}) => {    
    return(
        <button className={"Button " + classStyle} id={sym === activeSym ? "active" : null} onClick={() => handleClick(sym)}>
            {sym}
        </button>
    )
}

export default Button