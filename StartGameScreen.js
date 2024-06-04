import React, { useState } from 'react';
import { Button, Text, TextInput, View, StyleSheet } from 'react-native';

export default function StartGameScreen({ navigation }) {
  const [balance, setBalance] = useState(0);

  const startGame = () => {
    navigation.navigate('Game', { initialBalance: balance });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrez votre solde initial</Text>
      <TextInput
        style={styles.input}
        placeholder="Solde initial"
        value={balance}
        onChangeText={setBalance}
        keyboardType="numeric"
      />
      <View style={styles.buttonContainer}>
        <Button title="Commencer le jeu" onPress={startGame} color="#841584" />
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
    width: '100%',
  },
});