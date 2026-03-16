import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const CounterScreen = () => {
  const [contador, setContador] = useState(0);

  const sumar = () => {
    setContador(contador + 1);
  };

  const reiniciar = () => {
    setContador(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{contador}</Text>
      <TouchableOpacity style={styles.boton} onPress={sumar}>
        <Text style={styles.textoBoton}>+1</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botonReiniciar} onPress={reiniciar}>
        <Text style={styles.textoBoton}>Reiniciar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#64c6ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    padding: 20,
  },
  boton: {
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    minWidth: 150,
  },
  botonReiniciar: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    minWidth: 150,
  },
  textoBoton: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
