const MAX_CHARS = 19;

class App extends React.Component {

    constructor(){
        super();

        this.updateDisplay = this.updateDisplay.bind(this);
        this.state ={
            calc_display: '0'
        };
    }

    updateDisplay(input){
        this.setState({
            calc_display: input
        });
    }

    render() {
        return (
            <div className="calculator">
                <CalculatorDisplay display={this.state.calc_display}/>
                <CalculatorKeys action={this.updateDisplay} />
            </div>

        );
    }
}

class CalculatorDisplay extends React.Component {

    render() {
        return (
          <div className="calculator_display">
              <p id="results_fields">{this.props.display}</p>
          </div>
        );
    }
}

class CalculatorKeys extends React.Component{

    constructor(){
        super();

        this.updateDisplay = this.updateDisplay.bind(this);
        this.state = {
            displayed_num: "0",
            current_num: "0",
            results: 0,
            operation_checker: false,
            decimal_checker: false
        };
    }

    updateDisplay(event){
        let display;
        if(event.target.className === "button") {
            display = this.processButton(event.target.innerHTML, event.target.id, this.state.displayed_num,
                this.state.current_num, this.state.operation_checker);
        }
        else if (event.target.className === "operation"){
            display = this.processOperation(event.target.innerHTML, event.target.id, this.state.result,
                this.state.displayed_num, this.state.current_num, this.state.decimal_checker,
                this.state.operation_checker);
        }
        else{
            display = this.processKey(event.target.innerHTML, event.target.id, this.state.result,
                this.state.displayed_num, this.state.current_num, this.state.decimal_checker);
        }
        this.props.action(display);
    }

    processButton(input, input_id, display, current, operation_check){
        if(input_id === "zero"){
            if(operation_check){
                if(!this.max_text(display.length + 1, display)) {
                    current = input;
                    display += current;
                    operation_check = false;
                }
            }
            else if(current !== "0" && display !== "0") {
                if(!this.max_text(display.length + 1, display)) {
                    current += input;
                    display += input;
                    operation_check = false;
                }
            }
        }
        else {
            if (display === "0") {
                current = input;
                display = current;
            }
            else if (current === "0") {
                if(!this.max_text(display.length + 1, display)) {
                    current = input;
                    display = display.slice(0, display.length - 1) + current;
                }
            }
            else {
                if(!this.max_text(display.length + 1, display)) {
                    current += input;
                    display += input;
                }
            }
            operation_check = false;
        }
        this.setState({
           displayed_num: display,
           current_num: current,
           operation_checker: operation_check,
        });
        return display;

    }

    processOperation(input, input_id, result, display, current,decimal_check, operation_check){
        if(input_id === "equals"){
            result = eval(display);
            if(result % 1 === 0){
                display = result.toString();
                decimal_check = false;
            }
            else{
                result = Number(result.toFixed(4));
                display = result.toString();
                decimal_check = true;
            }
            current = display;

        }
        else if(operation_check){
            display = display.slice(0, display.length - 1) + input;
            current = "";
            decimal_check = false;
        }

        else {
            if(!this.max_text(display.length + 1, display)) {
                display += input;
                operation_check = true;
                current = "";
                decimal_check = false;
            }
        }
        this.setState({
            displayed_num: display,
            current_num: current,
            operation_checker: operation_check,
            decimal_checker: decimal_check,
            result: result

    });
        return display;
    }

    processKey(input, input_id, result, display, current, decimal_check){
        if(input_id === "clear"){
            display = "0";
            result = 0;
            current = "0";
            decimal_check = false;
        }

        else {
            if (!decimal_check && !this.max_text(display.length + 1, display)) {
                current += input;
                display += input;
                decimal_check = true;
            }
        }

        this.setState({
            displayed_num: display,
            current_num: current,
            decimal_checker: decimal_check,
            result: result

        });

        return display;

        }

    max_text(displayed_count, displayed_text){
        if(displayed_count > MAX_CHARS) {
            this.props.action("MAX CHARACTERS");
            setTimeout(function () {
                this.props.action(displayed_text);
            }, 300);
            return true;
        }
        return false;

    };


    render() {
        return(
          <div className="calculator_keys">
              <button className="operation" id="add" onClick={this.updateDisplay}>+</button>
              <button className="operation" id="subtract" onClick={this.updateDisplay}>-</button>
              <button className="operation" id="multiply" onClick={this.updateDisplay}>*</button>
              <button className="operation" id="divide" onClick={this.updateDisplay}>/</button>
              <button className="button" id="seven" onClick={this.updateDisplay}>7</button>
              <button className="button" id="eight" onClick={this.updateDisplay}>8</button>
              <button className="button" id="nine" onClick={this.updateDisplay}>9</button>
              <button className="operation" id="equals" onClick={this.updateDisplay}>=</button>
              <button className="button" id="four" onClick={this.updateDisplay}>4</button>
              <button className="button" id="five" onClick={this.updateDisplay}>5</button>
              <button className="button" id="six" onClick={this.updateDisplay}>6</button>
              <button className="button" id="one" onClick={this.updateDisplay}>1</button>
              <button className="button" id="two" onClick={this.updateDisplay}>2</button>
              <button className="button" id="three" onClick={this.updateDisplay}>3</button>
              <button className="button" id="zero" onClick={this.updateDisplay}>0</button>
              <button className="key" id="decimal" onClick={this.updateDisplay}>.</button>
              <button className="key" id="clear" onClick={this.updateDisplay}>CLEAR</button>
          </div>
        );
    };
}

ReactDOM.render(<App />, document.getElementById('root'));



