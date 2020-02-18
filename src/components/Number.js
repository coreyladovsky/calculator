import React from 'react';

const Number = ({num, handleClick}) => {
    return(
        <div className="" onClick={() => handleClick(num)}>
            {num}
        </div>
    )
}

export default Number