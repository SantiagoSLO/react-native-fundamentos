import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const BUTTON_SIZE = (width - 50) / 4;

export default function CalculadoraScreen() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const toggleSign = () => {
    setDisplay(String(parseFloat(display) * -1));
  };

  const percentage = () => {
    setDisplay(String(parseFloat(display) / 100));
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation && !waitingForOperand) {
      const current = previousValue;
      let result = 0;

      switch (operation) {
        case '+':
          result = current + inputValue;
          break;
        case '-':
          result = current - inputValue;
          break;
        case '*':
          result = current * inputValue;
          break;
        case '/':
          result = inputValue !== 0 ? current / inputValue : 0;
          break;
      }

      setDisplay(String(result));
      setPreviousValue(result);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = () => {
    if (previousValue === null || !operation) return;

    const inputValue = parseFloat(display);
    let result = 0;

    switch (operation) {
      case '+':
        result = previousValue + inputValue;
        break;
      case '-':
        result = previousValue - inputValue;
        break;
      case '*':
        result = previousValue * inputValue;
        break;
      case '/':
        result = inputValue !== 0 ? previousValue / inputValue : 0;
        break;
    }

    setDisplay(String(result));
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(true);
  };

  const renderButton = (label: string, type: 'function' | 'operator' | 'number', value?: string) => {
    const isZero = label === '0';
    const isOperator = type === 'operator';
    const isFunction = type === 'function';

    const handlePress = () => {
      if (value === '=') {
        calculate();
      } else if (value === 'AC') {
        clear();
      } else if (value === '+/-') {
        toggleSign();
      } else if (value === '%') {
        percentage();
      } else if (value === '.') {
        inputDecimal();
      } else if (isOperator && value) {
        performOperation(value);
      } else if (value) {
        inputDigit(value);
      }
    };

    return (
      <TouchableOpacity
        key={label}
        style={[
          styles.button,
          isZero && styles.zeroButton,
          isOperator && styles.operatorButton,
          isFunction && styles.functionButton,
        ]}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.buttonText,
            isOperator && styles.operatorText,
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderRow = (buttons: (string | { label: string; type: 'function' | 'operator' | 'number'; value?: string })[]) => {
    return (
      <View style={styles.row}>
        {buttons.map((btn) => {
          if (typeof btn === 'string') {
            const type = btn === 'AC' || btn === '+/-' || btn === '%' 
              ? 'function' 
              : btn === '÷' || btn === '×' || btn === '-' || btn === '+' || btn === '=' 
                ? 'operator' 
                : 'number';
            const value = btn === '÷' ? '/' : btn === '×' ? '*' : btn;
            return renderButton(btn, type, value);
          }
          return renderButton(btn.label, btn.type, btn.value);
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.display} numberOfLines={1} adjustsFontSizeToFit>
          {display}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        {renderRow([
          { label: 'AC', type: 'function', value: 'AC' },
          { label: '+/-', type: 'function', value: '+/-' },
          { label: '%', type: 'function', value: '%' },
          { label: '÷', type: 'operator', value: '/' },
        ])}
        {renderRow(['7', '8', '9', { label: '×', type: 'operator', value: '*' }])}
        {renderRow(['4', '5', '6', { label: '-', type: 'operator', value: '-' }])}
        {renderRow(['1', '2', '3', { label: '+', type: 'operator', value: '+' }])}
        {renderRow(['0', { label: '.', type: 'number', value: '.' }, { label: '=', type: 'operator', value: '=' }])}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'flex-end',
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  display: {
    color: '#fff',
    fontSize: 80,
    fontWeight: '300',
  },
  buttonContainer: {
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  zeroButton: {
    width: (BUTTON_SIZE * 2) + 12,
    alignItems: 'flex-start',
    paddingLeft: 35,
    borderRadius: BUTTON_SIZE / 2,
  },
  operatorButton: {
    backgroundColor: '#FF9F0A',
  },
  functionButton: {
    backgroundColor: '#A5A5A5',
  },
  buttonText: {
    fontSize: 32,
    fontWeight: '400',
    color: '#fff',
  },
  operatorText: {
    color: '#fff',
  },
});
