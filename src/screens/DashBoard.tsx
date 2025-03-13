import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

const DashBoard = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dashboard Page</Text>
            <TextInput placeholder="New" style={styles.input} />
            <TextInput placeholder="DAsh" style={styles.input} secureTextEntry />
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '80%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 5,
    },
});

export default DashBoard