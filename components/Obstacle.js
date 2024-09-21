import React from 'react';
import { Image, StyleSheet } from 'react-native';

// Renders an obstacle (pipe) using an image.
export default function Obstacle({ obstacleWidth, obstacleHeight, obstacleLeft, gapBottom, gapHeight }) {
  return (
    <>
      {/* Upper obstacle */}
      <Image
        source={require('../assets/images/pipe.png')}
        style={[
          styles.obstacle,
          {
            width: obstacleWidth,
            height: obstacleHeight,
            left: obstacleLeft,
            bottom: gapBottom + gapHeight / 2,
          },
        ]}
      />
      {/* Lower obstacle */}
      <Image
        source={require('../assets/images/pipe.png')}
        style={[
          styles.obstacle,
          {
            width: obstacleWidth,
            height: obstacleHeight,
            left: obstacleLeft,
            bottom: gapBottom - gapHeight / 2,
            transform: [{ rotate: '180deg' }], // Rotate for the bottom pipe
          },
        ]}
      />
    </>
  );
}

const styles = StyleSheet.create({
  obstacle: {
    position: 'absolute',
    resizeMode: 'contain',
  },
});
