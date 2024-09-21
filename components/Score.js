import React from 'react';
import { Text, StyleSheet } from 'react-native';

// Displays the current score.
export default function Score({ score }) {
  return <Text style={styles.score}>{score}</Text>;
}

const styles = StyleSheet.create({
  score: {
    position: 'absolute',
    top: 100,
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
});
