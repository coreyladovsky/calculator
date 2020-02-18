import React, { Component } from 'react';
import Display from './Display';

class Calculator extends Component {
    state = {
        displayValue: '0',
        previousValue: null,
        operation: null,
        waitingForNewValue: false
    }
    render() { 
        const { displayValue } = this.state; 
        return (
        <div>
            <Display num={displayValue}/>
        </div>  );
    }
}
 
export default Calculator;