import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const FleexScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box1}></View>
      <View style={styles.box2}></View>
      <View style={styles.box3}></View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7e7e7e',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  box1: {
    flex: 1,
   
    backgroundColor: '#00aaf4'//1 + 2 + 3 = 6
  },
  box2: {
    flex: 2,
   
    backgroundColor: '#2ff5ff',
  },
  box3: {
    flex: 3,
   
    backgroundColor: '#7ed6fc',
  },
  box :{
    width: 100,
    height: 100,
  }
});