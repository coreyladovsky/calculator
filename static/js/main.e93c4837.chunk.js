(this.webpackJsonpcalculator=this.webpackJsonpcalculator||[]).push([[0],[,,,,,,,,,,function(e,a,t){e.exports=t(20)},,,,,function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){"use strict";t.r(a);var l=t(0),n=t.n(l),s=t(4),r=t.n(s),i=(t(15),t(16),t(2)),u=t(5),c=t(6),o=t(8),d=t(7),m=t(9),y=(t(17),function(e){var a=e.num;return n.a.createElement("div",{className:"display"},function(e){if(e.length>10){for(var a=Number(e).toExponential(9).toString(),t="",l=a.indexOf("+"),n=!0,s=l-2;s>=0;s--)"0"===a[s]&&n||(n=!1,t=a[s]+t);return t.length?t+"e"+a.slice(l+1):a}if(!Number.isInteger(Number(e))||"."===e[e.length-1])return e;var r=Math.abs(e).toLocaleString();return Number(e)<0?"-"+r:r}(a))}),h=(t(18),function(e){var a=e.sym,t=e.handleClick,l=e.classStyle,s=e.activeSym;return n.a.createElement("button",{className:"Button "+l,id:a===s?"active":null,onClick:function(){return t(a)}},a)}),p=(t(19),t(1)),v={displayValue:"0",previousValue:null,operation:null,waitingForNewValue:!1,justEval:!1,usedDecimal:!1,justCleared:!0},f=function(e){function a(){var e,t;Object(u.a)(this,a);for(var l=arguments.length,n=new Array(l),s=0;s<l;s++)n[s]=arguments[s];return(t=Object(o.a)(this,(e=Object(d.a)(a)).call.apply(e,[this].concat(n)))).state=Object(i.a)({},v),t.handleClear=function(e){var a="C"===e?{displayValue:"0",usedDecimal:!1,justCleared:!0}:v;t.setState(a)},t.handleNumber=function(e){if(t.state.waitingForNewValue)t.setState((function(a){return{previousValue:a.displayValue,displayValue:e,waitingForNewValue:!1,justCleared:!1}}));else{if(9===t.state.displayValue.length)return;t.setState((function(a){var l={justCleared:!1,justEval:!1};return"0"===a.displayValue||t.state.justEval?Object(i.a)({displayValue:e},l):Object(i.a)({displayValue:a.displayValue+e},l)}))}},t.useDecimal=function(){t.state.usedDecimal||(t.state.waitingForNewValue||t.state.justEval?t.setState((function(e){return{previousValue:e.displayValue,displayValue:"0.",waitingForNewValue:!1,usedDecimal:!0,justEval:!1,justCleared:!1}})):t.setState((function(e){return{displayValue:e.displayValue+".",usedDecimal:!0,justCleared:!1}})))},t.flipSign=function(){t.setState((function(e){return{displayValue:-1*e.displayValue}}))},t.percent=function(){t.setState((function(e){return{displayValue:(e.displayValue/100).toString(),justEval:!0}}))},t.evaluate=function(){if(t.state.operation){var e=t.doMath(t.state.operation);t.setState({displayValue:Number.isNaN(e)?t.state.displayValue:e.toString(),previousValue:t.state.justEval?t.state.previousValue:t.state.displayValue,justEval:!0,usedDecimal:!1,justCleared:!1})}},t.operation=function(e){var a=t.state,l=a.operation,n=a.justEval;if(a.waitingForNewValue)t.setState({operation:e});else{if(l&&!n){var s=t.doMath(e);if(isNaN(s))return void t.setState({operation:e,usedDecimal:!1});t.setState({displayValue:s.toString()})}t.setState((function(a){return{operation:e,usedDecimal:!1,waitingForNewValue:!0,previousValue:a.displayValue,justEval:!1}}))}},t.doMath=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:t.state.operation,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:t.state.displayValue,l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:t.state.previousValue,n=parseFloat(a),s=parseFloat(l);if("Error"===t.state.displayValue)return"Error";switch(e){case"+":return p.add(n,s);case"-":return t.state.justEval?p.sub(n,s):p.sub(s,n);case"x":return new p(s).times(n);case"\xf7":return t.state.justEval?"0"===t.state.displayValue?"Error":p.div(n,s):"0"===t.state.displayValue?"Error":p.div(s,n)}},t.handleKeyDown=function(e){switch(e.key){case"0":case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":t.handleNumber(e.key);break;case"*":case"x":case"/":case"+":case"-":t.operation(e.key);break;case"Enter":case"=":t.evaluate();break;case".":t.useDecimal();break;case"%":t.percent();break;case"Backspace":case"c":t.handleClear()}},t}return Object(m.a)(a,e),Object(c.a)(a,[{key:"componentDidMount",value:function(){document.addEventListener("keydown",this.handleKeyDown)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.handleKeyDown)}},{key:"render",value:function(){var e,a=this.state,t=a.displayValue,l=a.justCleared,s=a.waitingForNewValue,r=a.operation,i=a.justEval;return s&&(e=i||r),n.a.createElement("div",{className:"calculator",onKeyDown:this.handleKeyDown},n.a.createElement(y,{num:t}),n.a.createElement(h,{sym:l?"AC":"C",handleClick:this.handleClear,classStyle:"topBar"}),n.a.createElement(h,{sym:"\xb1",handleClick:this.flipSign,classStyle:"topBar"}),n.a.createElement(h,{sym:"%",handleClick:this.percent,classStyle:"topBar"}),n.a.createElement(h,{sym:"\xf7",handleClick:this.operation,classStyle:"operand",activeSym:e}),n.a.createElement(h,{sym:"7",handleClick:this.handleNumber,classStyle:"regNum"}),n.a.createElement(h,{sym:"8",handleClick:this.handleNumber,classStyle:"regNum"}),n.a.createElement(h,{sym:"9",handleClick:this.handleNumber,classStyle:"regNum"}),n.a.createElement(h,{sym:"x",handleClick:this.operation,classStyle:"operand",activeSym:e}),n.a.createElement(h,{sym:"4",handleClick:this.handleNumber,classStyle:"regNum"}),n.a.createElement(h,{sym:"5",handleClick:this.handleNumber,classStyle:"regNum"}),n.a.createElement(h,{sym:"6",handleClick:this.handleNumber,classStyle:"regNum"}),n.a.createElement(h,{sym:"-",handleClick:this.operation,classStyle:"operand",activeSym:e}),n.a.createElement(h,{sym:"1",handleClick:this.handleNumber,classStyle:"regNum"}),n.a.createElement(h,{sym:"2",handleClick:this.handleNumber,classStyle:"regNum"}),n.a.createElement(h,{sym:"3",handleClick:this.handleNumber,classStyle:"regNum"}),n.a.createElement(h,{sym:"+",handleClick:this.operation,classStyle:"operand",activeSym:e}),n.a.createElement(h,{sym:"0",handleClick:this.handleNumber,classStyle:"regNum zero"}),n.a.createElement(h,{sym:".",handleClick:this.useDecimal,classStyle:"regNum"}),n.a.createElement(h,{sym:"=",handleClick:this.evaluate,classStyle:"operand",activeSym:e}))}}]),a}(l.Component);var E=function(){return n.a.createElement("div",{className:"App"},n.a.createElement(f,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(n.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[10,1,2]]]);
//# sourceMappingURL=main.e93c4837.chunk.js.map