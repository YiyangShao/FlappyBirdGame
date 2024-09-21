import React from 'react';
import { Image, StyleSheet } from 'react-native';

// Displays the bird character with a bird image.
export default function Bird({ birdBottom, birdLeft }) {
  const birdWidth = 50;
  const birdHeight = 60;

  return (
    <Image
      source={require('../assets/images/bird.png')}
      style={[
        styles.bird,
        { left: birdLeft - birdWidth / 2, bottom: birdBottom - birdHeight / 2, width: birdWidth, height: birdHeight },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  bird: {
    position: 'absolute',
    resizeMode: 'contain',
  },
});
