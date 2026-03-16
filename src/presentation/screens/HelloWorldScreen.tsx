import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const HelloWorldScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
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
});