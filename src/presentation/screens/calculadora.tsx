import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const BUTTON_SIZE = (width - 50) / 4;

export const CalculadoraScreen = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waiting, setWaiting] = useState(false);

  const inputNumber = (num: string) => {
    if (waiting) {
      setDisplay(num);
      setWaiting(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaiting(false);
  };

  const toggleSign = () => {
    setDisplay(String(parseFloat(display) * -1));
  };

  const percentage = () => {
    setDisplay(String(parseFloat(display) / 100));
  };

  const calculate = () => {
    if (previousValue === null || !operation) return;

    const current = parseFloat(display);
    let result = 0;

    switch (operation) {
      case '+':
        result = previousValue + current;
        break;
      case '-':
        result = previousValue - current;
        break;
      case '*':
        result = previousValue * current;
        break;
      case '/':
        result = current !== 0 ? previousValue / current : 0;
        break;
    }

    setDisplay(String(result));
    setPreviousValue(null);
    setOperation(null);
    setWaiting(true);
  };

  const performOperation = (op: string) => {
    const current = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(current);
    } else if (!waiting) {
      let result = 0;
      switch (operation) {
        case '+':
          result = previousValue + current;
          break;
        case '-':
          result = previousValue - current;
          break;
        case '*':
          result = previousValue * current;
          break;
        case '/':
          result = current !== 0 ? previousValue / current : 0;
          break;
      }
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setOperation(op);
    setWaiting(true);
  };

  const handlePress = (label: string, value: string, type: string) => {
    if (type === 'number') {
      if (value === '.') {
        inputDecimal();
      } else {
        inputNumber(value);
      }
    } else if (type === 'function') {
      if (value === 'AC') clear();
      if (value === '+/-') toggleSign();
      if (value === '%') percentage();
    } else if (type === 'operator') {
      if (value === '=') calculate();
      else performOperation(value);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.display} numberOfLines={1} adjustsFontSizeToFit>
          {display}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.functionButton} onPress={() => handlePress('AC', 'AC', 'function')}>
            <Text style={styles.buttonText}>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.functionButton} onPress={() => handlePress('+/-', '+/-', 'function')}>
            <Text style={styles.buttonText}>+/-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.functionButton} onPress={() => handlePress('%', '%', 'function')}>
            <Text style={styles.buttonText}>%</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.operatorButton} onPress={() => handlePress('÷', '/', 'operator')}>
            <Text style={styles.operatorText}>÷</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.numberButton} onPress={() => handlePress('7', '7', 'number')}>
            <Text style={styles.numberText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.numberButton} onPress={() => handlePress('8', '8', 'number')}>
            <Text style={styles.numberText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.numberButton} onPress={() => handlePress('9', '9', 'number')}>
            <Text style={styles.numberText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.operatorButton} onPress={() => handlePress('×', '*', 'operator')}>
            <Text style={styles.operatorText}>×</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.numberButton} onPress={() => handlePress('4', '4', 'number')}>
            <Text style={styles.numberText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.numberButton} onPress={() => handlePress('5', '5', 'number')}>
            <Text style={styles.numberText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.numberButton} onPress={() => handlePress('6', '6', 'number')}>
            <Text style={styles.numberText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.operatorButton} onPress={() => handlePress('-', '-', 'operator')}>
            <Text style={styles.operatorText}>-</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.numberButton} onPress={() => handlePress('1', '1', 'number')}>
            <Text style={styles.numberText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.numberButton} onPress={() => handlePress('2', '2', 'number')}>
            <Text style={styles.numberText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.numberButton} onPress={() => handlePress('3', '3', 'number')}>
            <Text style={styles.numberText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.operatorButton} onPress={() => handlePress('+', '+', 'operator')}>
            <Text style={styles.operatorText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.zeroButton} onPress={() => handlePress('0', '0', 'number')}>
            <Text style={styles.numberText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.numberButton} onPress={() => handlePress('.', '.', 'number')}>
            <Text style={styles.numberText}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.operatorButton} onPress={() => handlePress('=', '=', 'operator')}>
            <Text style={styles.operatorText}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

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
  },
  numberButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  operatorButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF9F0A',
  },
  functionButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A5A5A5',
  },
  zeroButton: {
    width: (BUTTON_SIZE * 2) + 12,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    justifyContent: 'center',
    paddingLeft: 35,
    backgroundColor: '#333',
  },
  buttonText: {
    fontSize: 32,
    fontWeight: '400',
  },
  numberText: {
    fontSize: 32,
    fontWeight: '400',
    color: '#fff',
  },
  operatorText: {
    fontSize: 32,
    fontWeight: '400',
    color: '#fff',
  },
});
