import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';

export const AlinearContenido = () => {
    return (
         <View style={styles.container}>
      <View style={[styles.box, {backgroundColor: 'orangered'}]} />
      <View style={[styles.box, {backgroundColor: 'orange'}]} />
      <View style={[styles.box, {backgroundColor: 'mediumseagreen'}]} />
      <View style={[styles.box, {backgroundColor: 'deepskyblue'}]} />
      <View style={[styles.box, {backgroundColor: 'mediumturquoise'}]} />
      <View style={[styles.box, {backgroundColor: 'mediumslateblue'}]} />
      <View style={[styles.box, {backgroundColor: 'purple'}]} />
      <View style={[styles.box, {backgroundColor: 'yellow'}]} />
      <View style={[styles.box, {backgroundColor: 'white'}]} />
      <View style={[styles.box, {backgroundColor: 'black'}]} />
      <View style={[styles.box, {backgroundColor: 'gray'}]} />
      <View style={[styles.box, {backgroundColor: 'lightgray'}]} />
      
</View>
  );
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
    alignContent: 'flex-start', // 'flex-start', 'flex-end', 'center', 'stretch', 'space-between', 'space-around'
    flexWrap: 'wrap',
    marginTop: 8,
    backgroundColor: '#c9f7bc',
    maxHeight: 350,
    flexDirection: 'column',

    
  },
  box: {
    width: 60,
    height: 80,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: 'oldlace',
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    marginBottom: 6,
    minWidth: '48%',
    textAlign: 'center',
  },
  selected: {
    backgroundColor: 'coral',
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: 'coral',
  },
  selectedLabel: {
    color: 'white',
  },
  label: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 24,
  },
});
