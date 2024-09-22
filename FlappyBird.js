import React from 'react';
import { View, StyleSheet } from 'react-native';
import GameScreen from './screens/GameScreen';

// Renders the main game screen.
export default function FlappyBird() {
  return (
    <View style={styles.container}>
      <GameScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
