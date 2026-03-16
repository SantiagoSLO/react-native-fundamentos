import React from 'react'
import { StyleSheet, View } from 'react-native'

export const RowGap = () => {
  return (
    <View style={styles.container}>

      <View style={[styles.box, styles.box1]} />
      <View style={[styles.box, styles.box2]} />
      <View style={[styles.box, styles.box3]} />
      <View style={[styles.box, styles.box4]} />
      <View style={[styles.box, styles.box5]} />
      <View style={[styles.box, styles.box1]} />
      <View style={[styles.box, styles.box2]} />
      <View style={[styles.box, styles.box3]} />
      <View style={[styles.box, styles.box4]} />
      <View style={[styles.box, styles.box5]} />

    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#a5cea2',
    flexDirection: 'row',
    // flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 20,        // espacio general
    rowGap: 15,     // espacio vertical entre filas
    columnGap: 30,  // espacio horizontal entre columnas
  },

  box: {
    width: 100,
    height: 100,
  },

  box1: {
    backgroundColor: '#35F527',
  },

  box2: {
    backgroundColor: '#27F5EE',
  },

  box3: {
    backgroundColor: '#F227F5',
  },

  box4: {
    backgroundColor: '#F5F527',
  },

  box5: {
    backgroundColor: '#F52727',
  },

})

export default RowGap