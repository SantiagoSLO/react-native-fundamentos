import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export const FlexScreenAliniarse = () => {

  const [alinear, setAlinear] = useState("center");

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>AlignSelf</Text>

      <TouchableOpacity onPress={() => setAlinear("flex-start")} style={styles.boton}>
        <Text>Izquierda</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setAlinear("center")} style={styles.boton}>
        <Text>Centro</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setAlinear("flex-end")} style={styles.boton}>
        <Text>Derecha</Text>
      </TouchableOpacity>

      <View style={[styles.caja, { alignSelf: alinear }]} />
    <View style={[styles.caja1]} />

    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20
  },

  titulo:{
    fontSize:24,
    textAlign:"center",
    marginBottom:20
  },

  boton:{
    backgroundColor:"#ddd",
    padding:10,
    marginBottom:10,
    borderRadius:5,
    alignItems:"center"
  },

  caja:{
    width:60,
    height:60,
    backgroundColor:"steelblue",
    marginTop:30
  },
  caja1:{
    width:60,
    height:60,
    backgroundColor:"steelblue",
    marginTop:30,
  }

});