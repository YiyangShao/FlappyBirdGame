import React from 'react';
import { View, StyleSheet } from 'react-native';

// Renders the bird character as a simple colored box for now.
export default function Bird({ birdBottom, birdLeft }) {
  const birdWidth = 50;
  const birdHeight = 60;

  return (
    <View
      style={[
        styles.bird,
        { left: birdLeft - birdWidth / 2, bottom: birdBottom - birdHeight / 2 },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  bird: {
    position: 'absolute',
    width: 50,
    height: 60,
    backgroundColor: 'blue', // Temporary color for the bird
  },
});
