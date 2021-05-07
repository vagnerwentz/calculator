import { useState } from 'react';
import './index.css';

import { Button } from '../../components/Button';
import { Display } from '../../components/Display';


type ArrayWithToPosition = [number, number];

export function Calculator() {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [clearDisplay, setClearDisplay] = useState<boolean>(false);
  const [operationState, setOperationState] = useState<string | null>('' || null);
  const [values, setValues] = useState<[number, number]>([0, 0]);
  const [current, setCurrent] = useState<number>(0);

  function clearMemory() {
    setDisplayValue('0');
    setClearDisplay(false);
    setOperationState('');
    setValues([0, 0]);
    setCurrent(0);
  };

  function setOperation(operation: string) {
    if (current === 0) {
      setOperationState(operation);
      setCurrent(1);
      setClearDisplay(true);
    } else if (current === 1) {
      const equals = operation === '=';
      const currentOperation = operationState;

      const clonedValues = [...values];
      const resultOfOperation = clonedValues.reduce((accumulator, current): number => {
        if (currentOperation === '+') {
          accumulator += current;
          clonedValues[0] = accumulator;
        } else if (currentOperation === '-') {
          accumulator -= current;
          clonedValues[0] = accumulator;
        } else if (currentOperation === '/') {
          accumulator /= current;
          clonedValues[0] = accumulator;
        } else if (currentOperation === '*') {
          accumulator *= current;
          clonedValues[0] = accumulator;
        }

        return accumulator;
      });

      values[0] = resultOfOperation;
      values[1] = 0;

      setDisplayValue(String(values[0]));
      setOperationState(equals ? null : operation);
      setCurrent(equals ? 0 : 1);
      setClearDisplay(!equals);
      setValues(values);
    }
  };

  function addDigit(digit: number | string) {
    if (digit === '.' && displayValue.includes('.')) {
      return;
    }

    const isDisplayCleaned = displayValue === '0' || clearDisplay;
    const currentValue = isDisplayCleaned ? '' : displayValue;
    const valueOfDisplay = currentValue + digit;
    setDisplayValue(valueOfDisplay);
    setClearDisplay(false);

    if (digit !== '.') {
      const newValue = parseFloat(valueOfDisplay);
      const arrayOfValues: ArrayWithToPosition = [...values];
      arrayOfValues[current] = newValue;
      setValues(arrayOfValues);
    }
  };

  return (
    <div className="calculator">
      <Display value={displayValue} />
      <Button label="AC" click={() => clearMemory()} triple />
      <Button label="/" click={() => setOperation('/')} operation />
      <Button label="7" click={() => addDigit(7)} />
      <Button label="8" click={() => addDigit(8)} />
      <Button label="9" click={() => addDigit(9)} />
      <Button label="*" click={() => setOperation('*')} operation />
      <Button label="4" click={() => addDigit(4)} />
      <Button label="5" click={() => addDigit(5)} />
      <Button label="6" click={() => addDigit(6)} />
      <Button label="-" click={() => setOperation('-')} operation />
      <Button label="1" click={() => addDigit(1)} />
      <Button label="2" click={() => addDigit(2)} />
      <Button label="3" click={() => addDigit(3)} />
      <Button label="+" click={() => setOperation('+')} operation />
      <Button label="0" click={() => addDigit(0)} double />
      <Button label="." click={() => addDigit('.')} />
      <Button label="=" click={() => setOperation('=')} operation />
    </div>
  );
};