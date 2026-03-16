import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useWindowDimensions } from 'react-native';

export const DimensionScreen = () => {
    const { width, height } = useWindowDimensions();
    return (
        <View style={styles.container}>
            <View style={styles.purpleBox}>
                <View style={styles.innerBox}></View>
            </View>
            <Text style={styles.title}>W: {width} H: {height}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '60%',
        height: '50%',
        backgroundColor: 'black',

    },
    purpleBox: {
        width: '50%',
        height: '50%',
        backgroundColor: '#5856D6',
    },
    innerBox: {
        width: '25%',
        height: '25%',
        backgroundColor: 'blue',
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
    },
})
