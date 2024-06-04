import React, { useState } from 'react';
import { Button, Text, TextInput, View, StyleSheet, Alert } from 'react-native';
import users from './users.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        // Check if the user exists
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            try {
                // Save login info to AsyncStorage
                await AsyncStorage.setItem('username', username);
                await AsyncStorage.setItem('password', password);
        
                // Navigate to the game screen
                navigation.navigate('StartGame');
            } catch (e) {
                // Saving error
                console.error(e);
            }
        } else {
            // Show an error message
            Alert.alert('Erreur', 'Coordonnées erronées ou utilisateur inexistant');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Authentification</Text>
            <TextInput
                style={styles.input}
                placeholder="Nom d'utilisateur"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                value={password}
                secureTextEntry
                onChangeText={setPassword}
            />
            <View style={styles.buttonContainer}>
                <Button title="Connexion" onPress={handleLogin} color="#841584" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
    buttonContainer: {
        width: '100%', // This will make the button take up the full width
    },
});

export default AuthScreen;