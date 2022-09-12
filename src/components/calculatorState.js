import { cleanup } from "@testing-library/react";
import { useContext } from "react";
import { createContext, useState } from "react";

const AppContext = createContext({
    /* State */
    memory: null,
    operation: null,
    currentValue: 0,
    isDecimal: false,

    /* Methods */
    addNumber: (value) => {},
    addOperation: (operation) => {},
    getResult: () => {},
    executeAction: (action) =>{},
});

export default function CalculatorState({children}){

    const [memory, setMemory] = useState(null);
    const [operation, setOperation] = useState(null);
    const [currentValue, setCurentValue] = useState(0);
    const [isReset, setIsReset] = useState(true);
    const [isDecimal, setIsDecimal] = useState(false);

    function handleAddNumber(value){
        if(isReset){
            if(value === '.'){
                setIsDecimal(true);
            }else {
                const point = isDecimal ? '.' : '';
                const newValue = currentValue.toString() + point + value.toString();
                setCurentValue(parseFloat(newValue));
                setIsReset(false);
                setIsDecimal(false);
            }
        }else{
            if(value === '.'){
                setIsDecimal(true)
            }else{
                const point = isDecimal ? '.' : '';
                const newValue = currentValue.toString() + point + value.toString();
                setIsDecimal(false);
                setCurentValue(parseFloat(newValue));
            }
        }
    }

    function handleAddOperation(op) {
        if (currentValue) {
            if (operation) {
                //TODO: tenemos que resolver
                handleGetResult()
                setOperation(op);
            } else {
                setOperation(op);
                setMemory(currentValue);
                setCurentValue(0);
                setIsReset(true);
            }
        }
    }

    function handleGetResult() {
        let result = 0;
        if (currentValue && operation && memory) {
            switch (operation) {
                case '+':
                    result = parseFloat(currentValue) + parseFloat(memory);
                    break;

                case '-':
                    result = parseFloat(memory) - parseFloat(currentValue);
                    break;

                case '*':
                    result = parseFloat(currentValue) * parseFloat(memory);
                    break;

                case '/':
                    result = parseFloat(memory) / parseFloat(currentValue);
                    break;

                case '%':
                    result = (parseFloat(memory) /100) * parseFloat(currentValue);
                    break;

                default:
            }
            setCurentValue(result);
            setOperation(null);
            setMemory(result);
            setIsReset(true);
            setIsDecimal(false);
        }
    }

    function clean(){
        setCurentValue(0);
        setOperation(null);
        setMemory(0);
        setIsReset(true);
        setIsDecimal(false);
    }

    function deleteNum(){
        const index = currentValue.toString().indexOf('.');
        if(index > 0){
            const numberOfDecimal = currentValue.toString().slice(index +1).length;
            if(numberOfDecimal === 1){
                const min = Math.floor(currentValue);
                setCurentValue(min);
            }else{
                const newNumber = parseFloat(currentValue).toFixed(
                    numberOfDecimal -1
                );
                setCurentValue(newNumber);
            }
        }else{
            setCurentValue(parseInt(currentValue/10));
        }
    }

    function changeSign(){
        setCurentValue(currentValue * -1);
    }

    function convertToFloat(){
        if(currentValue.toString().indexOf('.') > 0){

        }else{
            handleAddNumber('.')
        }
    }

    function handleExecuteAction(action){
        switch(action){
            case '=':
                handleGetResult();
                break;

            case 'AC':
                clean();
            break;

            case '«':
                deleteNum();
            break;

            case '+/-':
                changeSign();
            break;
            
            case '.':
                convertToFloat();
            break;

            default:
        }
    }

    return <AppContext.Provider value = {{
        memory, 
        operation, 
        currentValue,
        isDecimal,
        addNumber: handleAddNumber,
        addOperation: handleAddOperation,
        getResult: handleGetResult,
        executeAction: handleExecuteAction,
    }}>
        {children}
    </AppContext.Provider>
}

export function useAppContext(){
    return useContext(AppContext);
}