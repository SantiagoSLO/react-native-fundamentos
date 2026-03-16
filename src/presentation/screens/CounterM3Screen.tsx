import { FAB } from "react-native-paper";
import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";

export const CounterM3Screen = () => {
    const [count, setCount] = useState(0);

    return (
        <View style={styles.centerContainer}>
            <Text style={styles.title}>{count}</Text>
        
            <FAB
            icon="plus"
            onPress={() => setCount(count + 1)}
            onLongPress={() => setCount(0)}
            style={styles.fab}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 80,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});
