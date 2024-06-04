import React, { useState, useEffect } from 'react';
import { Button, Text, View, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GameScreen({ route, navigation }) {
    const { initialBalance } = route.params;
    const [playerMoney, setPlayerMoney] = useState(Number(initialBalance)); const [casinoMoney, setCasinoMoney] = useState(Math.floor(Math.random() * 91) + 10);
    const [diceRoll, setDiceRoll] = useState(null);
    const [winner, setWinner] = useState(null);

    const diceImages = [
        require('./images/dice1.png'),
        require('./images/dice2.png'),
        require('./images/dice3.png'),
        require('./images/dice4.png'),
        require('./images/dice5.png'),
        require('./images/dice6.png'),
    ];

    useEffect(() => {
        const saveBalance = async () => {
            try {
                await AsyncStorage.setItem('playerMoney', playerMoney.toString());
            } catch (e) {
                console.error(e);
            }
        };

        saveBalance();
    }, [playerMoney]);

    const endGame = () => {
        navigation.navigate('Auth'); // Navigate back to the Auth screen
    };

    const rollDice = () => {
        const roll = Math.floor(Math.random() * 6) + 1; // Dice roll between 1 and 6
        setDiceRoll(roll);

        if (roll === 2 || roll === 3) {
            // Player wins
            setPlayerMoney(prevMoney => prevMoney + 1);
            setCasinoMoney(prevMoney => prevMoney - 1);
            setWinner('Joueur');
        } else {
            // Casino wins
            setPlayerMoney(prevMoney => prevMoney - 1);
            setCasinoMoney(prevMoney => prevMoney + 1);
            setWinner('Casino');
        }
    };

    useEffect(() => {
        if (playerMoney <= 0) {
            alert('Le casino gagne !');
            endGame();
        } else if (casinoMoney <= 0) {
            alert('Le joueur gagne !');
            endGame();
        }
    }, [playerMoney, casinoMoney]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Fortune du Joueur: {playerMoney}</Text>
            <Text style={styles.text}>Fortune du Casino: {casinoMoney}</Text>
            <View style={styles.buttonContainer}>
                <Button title="Lancer le dé" onPress={rollDice} color="#841584" />
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>Résultat: {winner}</Text>
                {diceRoll && <Image source={diceImages[diceRoll - 1]} style={{ width: 50, height: 50 }} />}
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Terminer le jeu" onPress={endGame} color="#841584" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 50,
        alignItems: 'flex-start', // Align items to the left
        justifyContent: 'center',
    },
    buttonContainer: {
        width: '100%',
        borderRadius: 25,
        overflow: 'hidden',
        marginBottom: 10,
    },
    text: {
        marginVertical: 10, // This will add space above and below the text
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10, // Add space below the row
    },
});