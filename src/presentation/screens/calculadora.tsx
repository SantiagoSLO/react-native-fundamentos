import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StyleProp,
  ViewStyle,
  TextStyle
} from 'react-native';

const { width } = Dimensions.get('window');
const BUTTON_SIZE = (width - 50) / 4;

type ButtonType = 'number' | 'operator' | 'function';

interface ButtonData {
  label: string;
  type: ButtonType;
  value?: string;
}
const buttons: ButtonData[][] = [

  [
    { label: 'AC', type: 'function' },
    { label: '+/-', type: 'function' },
    { label: '%', type: 'function' },
    { label: '÷', type: 'operator', value: '/' },
  ],
  [
    { label: '7', type: 'number', value: '7' },
    { label: '8', type: 'number', value: '8' },
    { label: '9', type: 'number', value: '9' },
    { label: '×', type: 'operator', value: '*' },
  ],
  [
    { label: '4', type: 'number', value: '4' },
    { label: '5', type: 'number', value: '5' },
    { label: '6', type: 'number', value: '6' },
    { label: '-', type: 'operator', value: '-' },
  ],
  [
    { label: '1', type: 'number', value: '1' },
    { label: '2', type: 'number', value: '2' },
    { label: '3', type: 'number', value: '3' },
    { label: '+', type: 'operator', value: '+' },
  ],
  [
    { label: '0', type: 'number', value: '0' },
    { label: '.', type: 'number', value: '.' },
    { label: '=', type: 'operator', value: '=' },
  ],
];

export default function CalculadoraScreen() {

  const [display, setDisplay] = useState('0');
  const [previous, setPrevious] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waiting, setWaiting] = useState(false);

  const operations: any = {
    '+': (a:number,b:number)=>a+b,
    '-': (a:number,b:number)=>a-b,
    '*': (a:number,b:number)=>a*b,
    '/': (a:number,b:number)=> b !== 0 ? a/b : 0
  };

  const inputNumber = (num:string)=>{
    if(waiting){
      setDisplay(num);
      setWaiting(false);
    }else{
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = ()=>{
    if(!display.includes('.')){
      setDisplay(display + '.');
    }
  };

  const clear = ()=>{
    setDisplay('0');
    setPrevious(null);
    setOperator(null);
    setWaiting(false);
  };

  const calculate = ()=>{
    if(previous === null || !operator) return;

    const result = operations[operator](previous, parseFloat(display));

    setDisplay(String(result));
    setPrevious(null);
    setOperator(null);
    setWaiting(true);
  };

  const performOperation = (op:string)=>{
    const value = parseFloat(display);

    if(previous === null){
      setPrevious(value);
    }else if(!waiting){
      const result = operations[operator!](previous,value);
      setDisplay(String(result));
      setPrevious(result);
    }

    setOperator(op);
    setWaiting(true);
  };

  const handleButtonPress = (button:ButtonData)=>{

    if(button.type === 'number'){
      if(button.value === '.') return inputDecimal();
      if(button.value) return inputNumber(button.value);
    }

    if(button.type === 'function'){
      if(button.label === 'AC') return clear();
      if(button.label === '+/-') return setDisplay(String(parseFloat(display)*-1));
      if(button.label === '%') return setDisplay(String(parseFloat(display)/100));
    }

    if(button.type === 'operator'){
      if(button.value === '=') return calculate();
      if(button.value) return performOperation(button.value);
    }

  };

  const getButtonStyle = (button: ButtonData): StyleProp<ViewStyle> => {
    const base:StyleProp<ViewStyle>[]=[styles.button];

    if(button.type === 'operator') base.push(styles.operatorButton);
    else if(button.type === 'function') base.push(styles.functionButton);
    else base.push(styles.numberButton);

    if(button.label === '0') base.push(styles.zeroButton);

    return base;
  };

  const getTextStyle = (button: ButtonData): StyleProp<TextStyle> => {
    return [
      styles.buttonText,
      button.type === 'operator' ? styles.operatorText : styles.numberText
    ];
  };

  const formatDisplay = (value:string)=>{
    const num = parseFloat(value);
    if(isNaN(num)) return value;

    const parts = value.split('.');
    const formatted = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return parts[1] ? `${formatted}.${parts[1]}` : formatted;
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.displayContainer}>
        <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>
          {formatDisplay(display)}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        {buttons.map((row,rowIndex)=>(
          <View key={rowIndex} style={styles.buttonRow}>
            {row.map((button,index)=>(
              <TouchableOpacity
                key={index}
                style={getButtonStyle(button)}
                onPress={()=>handleButtonPress(button)}
                activeOpacity={0.7}
              >
                <Text style={getTextStyle(button)}>
                  {button.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:'#000',justifyContent:'flex-end'},
  displayContainer:{flex:1,justifyContent:'flex-end',alignItems:'flex-end',paddingHorizontal:20,paddingBottom:20},
  displayText:{color:'#fff',fontSize:80,fontWeight:'300'},
  buttonContainer:{paddingHorizontal:10,paddingBottom:30},
  buttonRow:{flexDirection:'row',justifyContent:'space-between',marginBottom:12},
  button:{width:BUTTON_SIZE,height:BUTTON_SIZE,borderRadius:BUTTON_SIZE/2,justifyContent:'center',alignItems:'center'},
  zeroButton:{width:(BUTTON_SIZE*2)+12,alignItems:'flex-start',paddingLeft:35},
  numberButton:{backgroundColor:'#333'},
  operatorButton:{backgroundColor:'#FF9F0A'},
  functionButton:{backgroundColor:'#A5A5A5'},
  buttonText:{fontSize:32,fontWeight:'400'},
  operatorText:{color:'#FFF'},
  numberText:{color:'#FFF'},
});