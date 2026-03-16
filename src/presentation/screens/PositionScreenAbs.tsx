import React from 'react';
import { Text } from 'react-native-paper'
import { View, StyleSheet } from 'react-native';

export const PositionScreenAbs = () => {
  return (
    <View style={styles.container}>
      <View style={styles.purpleBox}></View>
      <View style={styles.orangeBox}></View>
      <View style={styles.redBox}></View>
      <View style={styles.greenBox}></View>
      <View style={styles.centerBox}></View>
      
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
    position: 'absolute',
    top: 0,
    left: 0,
    },

  orangeBox: {
    width: 100,
    height: 100,
    backgroundColor: '#FFA500',
    borderWidth: 10,
    borderColor: 'white',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  redBox: {
    width: 100,
    height: 100,
    backgroundColor: '#FF0000',
    borderWidth: 10,
    borderColor: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  greenBox: {
    width: 100,
    height: 100,
    backgroundColor: '#00FF00',
    borderWidth: 10,
    borderColor: 'white',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  centerBox: {
    width: 100,
    height: 100,
    backgroundColor: '#FFFF00',
    borderWidth: 10,
    borderColor: 'white',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -50,
    marginLeft: -50,
  },


},
);