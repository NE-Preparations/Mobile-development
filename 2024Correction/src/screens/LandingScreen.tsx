import React from "react";
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";

export default function LandingScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Library Management App</Text>
            <View style={styles.buttonContainer}>
                <Button title="Login" onPress={() => navigation.navigate('Login')} />
                <Button title="Register" onPress={() => navigation.navigate('Register')} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 20
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 40,
        textAlign: 'center'
    },
    buttonContainer: {
        width: '100%',
        gap: 10
    }
});