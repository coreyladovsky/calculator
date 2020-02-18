import React, { Component } from 'react';
import Display from './Display';
import Number from './Number';
import "../css/Calculator.css";

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
        <div className="calculator">
            <Display num={displayValue}/>
            <Number num={1}/>
            <Number num={2}/>
            <Number num={3}/>
            <Number num={4}/>
            <Number num={5}/>
            <Number num={6}/>
            <Number num={7}/>
            <Number num={8}/>
            <Number num={9}/>
            <Number num={0}/>
        </div>  );
    }
}
 
export default Calculator;