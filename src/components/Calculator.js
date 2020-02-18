import React, { Component } from 'react';
import Display from './Display';
import Number from './Number';
import "../css/Calculator.css";

class Calculator extends Component {
    state = {
        displayValue: '0',
        previousValue: null,
        operation: null,
        waitingForNewValue: false,
        justEval: false,
        usedDecimal: false
    }

    handleNumber = (num) => {
        if(this.state.waitingForNewValue) {
            this.setState((prevState) => {
                return {
                    previousValue: prevState.displayValue, 
                    displayValue: num, 
                    waitingForNewValue: false
                }
            })
        } else {
            this.setState((prevState) => {
                if(prevState.displayValue === "0" || this.state.justEval) {
                    return {displayValue: num, justEval: false}
                } else {
                    return {displayValue: prevState.displayValue + num, justEval: false}
                }
            });
        }
    }

    useDecimal = () => {
        if(this.state.usedDecimal) {
            return; 
        } 
        // if(this.state.justEval) {

        // }
          if(this.state.waitingForNewValue || this.state.justEval) {
            this.setState((prevState) => {
                return {
                    previousValue: prevState.displayValue, 
                    displayValue: "0.", 
                    waitingForNewValue: false,
                    useDecimal: true,
                    justEval: false
                }
            })
        } else {

            this.setState((prevState) => {
                return {
                    displayValue: prevState.displayValue + ".", 
                    usedDecimal: true
                }
            })
        }

    }

    flipSign = () => {
        this.setState((prevState) => {
            return {
                displayValue: prevState.displayValue * -1
            }
        })
    }

    percent = () => {
        this.setState((prevState) => ({
            displayValue: (prevState.displayValue / 100).toString()
        }))
    }

    evaluate = () => {
        if(this.state.operation) {
            let display = this.doMath();
            this.setState({
                displayValue: isNaN(display) ? this.state.displayValue : display.toString(),
                 waitingForNewValue: false, 
                 previousValue: null, 
                 operation: null, 
                 justEval: true,
                 usedDecimal: false
                })
        }        
    }

    operation = (operation) => {
        if(this.state.operation) {
            let display = this.doMath();
            if(isNaN(display)) {
                this.setState({operation, usedDecimal: false})
                return
            }
            this.setState({displayValue: display.toString()})
        }
        this.setState((prevState) => (
            { waitingForNewValue: true, 
                operation, 
            previousValue: null ,
            usedDecimal: false
        }
            ))
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
            <Number num={"±"} handleClick={this.flipSign}/>
            <Number num={"÷"} handleClick={this.operation}/>
            <Number num={"%"} handleClick={this.percent}/>
            <Number num={'7'} handleClick={this.handleNumber}/>
            <Number num={'8'} handleClick={this.handleNumber}/>
            <Number num={'9'} handleClick={this.handleNumber}/>
            <Number num={"x"} handleClick={this.operation}/>
            <Number num={'4'} handleClick={this.handleNumber}/>
            <Number num={'5'} handleClick={this.handleNumber}/>
            <Number num={'6'} handleClick={this.handleNumber}/>
            <Number num={"-"} handleClick={this.operation}/>
            <Number num={'1'} handleClick={this.handleNumber}/>
            <Number num={'2'} handleClick={this.handleNumber}/>
            <Number num={'3'} handleClick={this.handleNumber}/>
            <Number num={"+"} handleClick={this.operation}/>
            <Number num={'0'} handleClick={this.handleNumber}/>
            <Number num={'.'} handleClick={this.useDecimal}/>
            <Number num={'='} handleClick={this.evaluate}/>
        </div>  );
    }
}
 
export default Calculator;