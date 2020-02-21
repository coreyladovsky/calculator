import React, { Component } from 'react';
import Display from './Display';
import Button from './Button';
import "../css/Calculator.css";
import * as Decimal from 'decimal.js';

const defaultSate = {
        displayValue: '0',
        previousValue: null,
        operation: null,
        waitingForNewValue: false,
        justEval: false,
        usedDecimal: false, 
        justCleared: true
    }

class Calculator extends Component {
    state = {...defaultSate}

    handleClear = (sym) => {
        const nextState = sym === "C" ?
             {displayValue: "0", usedDecimal: false, justCleared: true }
            : defaultSate
        this.setState(nextState)
    }

    handleNumber = (num) => {
        if(this.state.waitingForNewValue) {
            this.setState((prevState) => {
                return {
                    previousValue: prevState.displayValue, 
                    displayValue: num, 
                    waitingForNewValue: false,
                    justCleared: false
                }
            })
        } else {
            if(this.state.displayValue.length === 9) return;
            this.setState((prevState) => {
                const resetJusts = { justCleared: false, justEval: false };
                if(prevState.displayValue === "0" || this.state.justEval) {
                    return {displayValue: num, ...resetJusts}
                } else {
                    return {displayValue: prevState.displayValue + num, ...resetJusts}
                }
            });
        }
    }

    useDecimal = () => {
        if(this.state.usedDecimal)return; 
 
        if(this.state.waitingForNewValue || this.state.justEval) {
            this.setState((prevState) => {
                return {
                    previousValue: prevState.displayValue, 
                    displayValue: "0.", 
                    waitingForNewValue: false,
                    useDecimal: true,
                    justEval: false,
                    justCleared: false
                }
            })
        } else {

            this.setState((prevState) => {
                return {
                    displayValue: prevState.displayValue + ".", 
                    usedDecimal: true,
                    justCleared: false
                }
            })
        }

    }

    flipSign = () => {
        this.setState((prevState) => {
            return {
                displayValue: prevState.displayValue * -1,
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
            let display = this.doMath(this.state.operatione);
            this.setState({
                displayValue: isNaN(display) ? this.state.displayValue : display.toString(),
                 previousValue: this.state.justEval ? this.state.previousValue: this.state.displayValue,
                 justEval: true,
                 usedDecimal: false,
                 justCleared: false
                })
        }        
    }

    operation = (operand) => {
        const { operation, justEval} = this.state; 
        if(operation && !justEval) {
            let display = this.doMath(operand);
            if(isNaN(display)) {
                this.setState({operation: operand, usedDecimal: false})
                return
            } 
            this.setState({displayValue: display.toString()})
        }
        this.setState({
            operation: operand, 
            useDecimal: false,
            waitingForNewValue: true,
            previousValue: this.state.displayValue,
            justEval: false,
        })
    }

    doMath = (operation = this.state.operation,
             displayValue=this.state.displayValue, 
             previousValue = this.state.previousValue) => {
        const display = parseFloat(displayValue) 
        const prev = parseFloat(previousValue)
        switch (operation) {
            case "+":
                return Decimal.add(display, prev)
               
            case "-": 
                if(this.state.justEval) {
                    return Decimal.sub(display, prev)
                }
                return Decimal.sub(prev, display)
            case "x": 
                return new Decimal(prev).times(display)
            case "÷":
              if(this.state.justEval) {
                  return Decimal.div(display, prev)
                }
                return Decimal.div(prev, display)
            default:
               break;
        }
    }

    render() {         
        const { displayValue, justCleared } = this.state; 
        return (
        <div className="calculator">
            <Display num={displayValue}/>
            <Button sym={justCleared ? "AC" : "C"} handleClick={this.handleClear} classStyle={"topBar"}/>
            <Button sym={"±"} handleClick={this.flipSign} classStyle={"topBar"} />
            <Button sym={"%"} handleClick={this.percent} classStyle={"topBar"}/>
            <Button sym={"÷"} handleClick={this.operation} classStyle={"operand"}/>
            <Button sym={'7'} handleClick={this.handleNumber} classStyle={"regNum"}/>
            <Button sym={'8'} handleClick={this.handleNumber} classStyle={"regNum"}/>
            <Button sym={'9'} handleClick={this.handleNumber} classStyle={"regNum"}/>
            <Button sym={"x"} handleClick={this.operation}  classStyle={"operand"}/>
            <Button sym={'4'} handleClick={this.handleNumber} classStyle={"regNum"}/>
            <Button sym={'5'} handleClick={this.handleNumber} classStyle={"regNum"}/>
            <Button sym={'6'} handleClick={this.handleNumber} classStyle={"regNum"}/>
            <Button sym={"-"} handleClick={this.operation}  classStyle={"operand"}/>
            <Button sym={'1'} handleClick={this.handleNumber} classStyle={"regNum"}/>
            <Button sym={'2'} handleClick={this.handleNumber} classStyle={"regNum"}/>
            <Button sym={'3'} handleClick={this.handleNumber} classStyle={"regNum"}/>
            <Button sym={"+"} handleClick={this.operation}  classStyle={"operand"}/>
            <Button sym={'0'} handleClick={this.handleNumber} classStyle={"regNum zero"}/>
            <Button sym={'.'} handleClick={this.useDecimal} classStyle={"regNum"}/>
            <Button sym={'='} handleClick={this.evaluate}  classStyle={"operand"}/>
        </div>  );
    }
}
 
export default Calculator;