import Button from "./button";
import CalculatorScreen from "./calculatorScreen";
import CalculatorState from "./calculatorState";

export default function Calculator(){
    return <CalculatorState>
        <div className="calculatorContainer">
            <CalculatorScreen />
            <div className="container">

            </div>
        </div>
    </CalculatorState>
}