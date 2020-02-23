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

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    handleClear = (sym) => {
        const nextState = sym === "C" ?
             {displayValue: "0", usedDecimal: false, justCleared: true }
            : defaultSate
        this.setState(nextState)
    }

    handleNumber = (num) => {
        if(this.state.waitingForNewValue) {
            this.setState((prevState) => ({
                    previousValue: prevState.displayValue, 
                    displayValue: num, 
                    waitingForNewValue: false,
                    justCleared: false          
            }))
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
                    usedDecimal: true,
                    justEval: false,
                    justCleared: false
                }
            })
        } else {
            this.setState((prevState) => ({
                    displayValue: prevState.displayValue + ".", 
                    usedDecimal: true,
                    justCleared: false
            }))
        }

    }

    flipSign = () => {
        this.setState((prevState) => ({
                displayValue: prevState.displayValue * -1,
        }))
    }

    percent = () => {
        this.setState((prevState) => ({
            displayValue: (prevState.displayValue / 100).toString(),
            justEval: true
        }))
    }

    evaluate = () => {
        if(this.state.operation) {
            let display = this.doMath(this.state.operation);
            this.setState({
                displayValue: Number.isNaN(display) ? this.state.displayValue : display.toString(),
                previousValue: this.state.justEval ? this.state.previousValue: this.state.displayValue,
                justEval: true,
                usedDecimal: false,
                justCleared: false
            })
        }        
    }

    operation = (operand) => {
        const { operation, justEval, waitingForNewValue} = this.state; 
        if(waitingForNewValue) {
            this.setState({operation: operand})
            return; 
        }
        if(operation && !justEval) {
            let display = this.doMath(operand);
            if(isNaN(display)) {
                this.setState({operation: operand, usedDecimal: false})
                return
            } 
            this.setState({displayValue: display.toString()})
        }
        this.setState((prevState) => ({
            operation: operand, 
            usedDecimal: false,
            waitingForNewValue: true,
            previousValue: prevState.displayValue,
            justEval: false,
        }))
    }

    doMath = (operation = this.state.operation,
             displayValue=this.state.displayValue, 
             previousValue = this.state.previousValue) => {
        const display = parseFloat(displayValue) 
        const prev = parseFloat(previousValue)
        if(this.state.displayValue === "Error") return "Error"
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
                  if(this.state.displayValue === "0"){

                     return "Error"
                  }
                  return Decimal.div(display, prev)
                }         
                  if(this.state.displayValue === "0"){

                     return "Error"
                  }
                return Decimal.div(prev, display)
            default:
               break;
        }
    }

    handleKeyDown = (e) => { 
        switch (e.key) {
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                this.handleNumber(e.key)
                break;
            case "*":
            case "x":
            case "/":
            case "+":
            case "-":
                this.operation(e.key)
                break;
            case "Enter":
            case "=":
                this.evaluate()
                break;
            case ".":
                this.useDecimal();
                break;
            case "%":
                this.percent();
                break;
            case "Backspace":
            case "c":
                this.handleClear()
                break;
            default:
                break;
        }
    }

    render() {                           
        const { displayValue, justCleared, waitingForNewValue, operation, justEval } = this.state; 
        let activeSym;
        if( waitingForNewValue) {
             activeSym = justEval || operation
        }
    
        return (
        <div className="calculator"  onKeyDown={this.handleKeyDown}>
            <Display num={displayValue}/>
            <Button sym={justCleared ? "AC" : "C"} handleClick={this.handleClear} classStyle={"topBar"}/>
            <Button sym={"±"} handleClick={this.flipSign} classStyle={"topBar"} />
            <Button sym={"%"} handleClick={this.percent} classStyle={"topBar"}/>
            <Button sym={"÷"} handleClick={this.operation} classStyle={"operand"} activeSym={activeSym}/>
            <Button sym={'7'} handleClick={this.handleNumber} classStyle={"regNum"}/>
            <Button sym={'8'} handleClick={this.handleNumber} classStyle={"regNum"}/>
            <Button sym={'9'} handleClick={this.handleNumber} classStyle={"regNum"}/>
            <Button sym={'x'} handleClick={this.operation}  classStyle={"operand"} activeSym={activeSym}/>
            <Button sym={'4'} handleClick={this.handleNumber} classStyle={"regNum"}/>
            <Button sym={'5'} handleClick={this.handleNumber} classStyle={"regNum"}/>
            <Button sym={'6'} handleClick={this.handleNumber} classStyle={"regNum"}/>
            <Button sym={"-"} handleClick={this.operation}  classStyle={"operand"} activeSym={activeSym}/>
            <Button sym={'1'} handleClick={this.handleNumber} classStyle={"regNum"}/>
            <Button sym={'2'} handleClick={this.handleNumber} classStyle={"regNum"}/>
            <Button sym={'3'} handleClick={this.handleNumber} classStyle={"regNum"}/>
            <Button sym={"+"} handleClick={this.operation}  classStyle={"operand"} activeSym={activeSym}/>
            <Button sym={'0'} handleClick={this.handleNumber} classStyle={"regNum zero"}/>
            <Button sym={'.'} handleClick={this.useDecimal} classStyle={"regNum"}/>
            <Button sym={'='} handleClick={this.evaluate}  classStyle={"operand"} activeSym={activeSym}/>
        </div>  );
    }
}
 
export default Calculator;