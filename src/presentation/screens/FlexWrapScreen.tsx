import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export const FlexWrap = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manejo de Flex Wrap 🌸</Text>
      
      <View style={styles.garden}>
        <View style={[styles.flowers, { backgroundColor: '#FFCFD2' }]} />
        <View style={[styles.flowers, { backgroundColor: '#CFBAF0' }]} />
        <View style={[styles.flowers, { backgroundColor: '#aeddf8' }]} />
        <View style={[styles.flowers, { backgroundColor: '#B9FBC0' }]} />
        <View style={[styles.flowers, { backgroundColor: '#FBF8CC' }]} />
        <View style={[styles.flowers, { backgroundColor: '#ffe2e4' }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9FB',
    paddingTop: 100,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8E94F2',
    marginBottom: 20,
  },
  garden: { //Contenedor Interno
    width: 400,
    height: 600,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#E2E2FF',
    borderRadius: 15,
    flexDirection: 'column', 
    flexWrap: 'wrap',     
  },
  flowers: {
    width: 120,
    height: 100,
    margin: 10,
    borderRadius: 10,
  },
});