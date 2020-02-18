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

    handleNumber = (num) => {
        if(this.state.waitingForNewValue) {
            this.setState((prevState) => {
                return {
                    previousValue: prevState.displayValue
                }
            })
            this.setState({displayValue: num, waitingForNewValue: false})
        } else {
            this.setState((prevState) => {
                if(prevState.displayValue === "0") {
                    return {displayValue: num}
                } else {
                    return {displayValue: prevState.displayValue + num}
                }
            });

        }
    }

    operation = (operation) => {
        if(this.state.operation) {
            let display = this.doMath();
            this.setState({displayValue: display.toString()})
        }
        this.setState({ waitingForNewValue: true, operation, previousValue: this.state.displayValue })
    }

    doMath = () => {
        const {displayValue, operation, previousValue} = this.state;
        const display = parseFloat(displayValue) 
        const prev = parseFloat(previousValue)
        switch (operation) {
            case "+":
                return display + prev
                break;
            case "-": 
                return prev - display 
                break 
            case "x": 
                return prev * display 
                break 
            case "÷":
                return prev / display
                break 
            default:
                break;
        }
    }

    render() { 
        console.log(this.state);
        
        const { displayValue } = this.state; 
        return (
        <div className="calculator">
            <Display num={displayValue}/>
            <Number num={"+"} handleClick={this.operation}/>
            <Number num={'1'} handleClick={this.handleNumber}/>
            <Number num={'2'} handleClick={this.handleNumber}/>
            <Number num={'3'} handleClick={this.handleNumber}/>
            <Number num={'4'} handleClick={this.handleNumber}/>
            <Number num={'5'} handleClick={this.handleNumber}/>
            <Number num={'6'} handleClick={this.handleNumber}/>
            <Number num={'7'} handleClick={this.handleNumber}/>
            <Number num={'8'} handleClick={this.handleNumber}/>
            <Number num={'9'} handleClick={this.handleNumber}/>
            <Number num={'0'} handleClick={this.handleNumber}/>
        </div>  );
    }
}
 
export default Calculator;