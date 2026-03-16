import React from 'react';
// import { Text } from 'react-native-paper'
import { View, StyleSheet } from 'react-native';

export const PositionScreenRelat = () => {
  return (
    <View style={styles.container}>
      <View style={styles.purpleBox}></View>
      <View style={styles.orangeBox}></View>
      <View style={styles.redBox}></View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   backgroundColor: '#28c4d9',
   alignItems: 'center',
   justifyContent: 'center',
  },

  purpleBox: {
    width: 100,
    height: 100,
    backgroundColor: '#5856D6',
    borderColor: 'white',
    borderWidth: 10,
    position: 'relative',
    
    },

  orangeBox: {
    width: 100,
    height: 100,
    backgroundColor: '#FFA500',
    borderWidth: 10,
    borderColor: 'white',
    top: 50,
    // left: 50,
  },
  redBox: {
    width: 100,
    height: 100,
    backgroundColor: '#FF0000',
    borderWidth: 10,
    borderColor: 'white',
    top:-350,
    // left: 50,
  },
},
);