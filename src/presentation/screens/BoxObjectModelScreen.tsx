import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
// import Icon from 'react-native-vector-icons/Ionicons'



export const BoxObjectModelScreen = () => {
    return (

        <View style={styles.container}>
            
           <View style={styles.purpleBox}>
            <Text style={{color: 'white', fontSize: 20}}>Hola</Text>
            </View>
            <View style={styles.purpleBox}>
            <Text style={{color: 'yellow', fontSize: 20}}>Como estas?</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        backgroundColor: 'red',
        // flexDirection: 'row',
        // height: 70,
    },
    title: {
        fontSize: 30,
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderWidth: 5
    },
    purpleBox: {
        // height: 30,
        backgroundColor: 'purple',
        marginHorizontal: 10,
        marginVertical: 90,
        padding: 5,
        flexDirection: 'row'
    },
    

})