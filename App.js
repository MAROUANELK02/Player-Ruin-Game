import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from './AuthScreen';
import GameScreen from './GameScreen';
import StartGameScreen from './StartGameScreen'; 
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen name="Auth" component={AuthScreen} options={{ title: 'Authentification' }} />
        <Stack.Screen name="StartGame" component={StartGameScreen} options={{ title: 'Commencer le jeu' }} />
        <Stack.Screen name="Game" component={GameScreen} options={{ title: 'Jeu' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}