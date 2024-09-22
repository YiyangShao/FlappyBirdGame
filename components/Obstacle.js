import React from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';

// Displays obstacles (pipes) using the pipe image and ensures proper height and position.
export default function Obstacle({ obstacleLeft, gapBottom, gapHeight, obstacleWidth }) {
  const screenHeight = Dimensions.get('window').height;

  const topObstacleHeight = screenHeight - (gapBottom + gapHeight / 2); // Height of the top obstacle
  const bottomObstacleHeight = gapBottom - gapHeight / 2; // Height of the bottom obstacle

  return (
    <>
      {/* Top pipe (stretches from the ceiling) */}
      <Image
        source={require('../assets/images/pipe.png')} // Replace with your actual pipe image path
        style={[
          styles.obstacle,
          {
            width: obstacleWidth,
            height: topObstacleHeight,
            left: obstacleLeft,
            bottom: screenHeight - topObstacleHeight, // Positioned at the top
            transform: [{ rotate: '180deg' }], // Rotate for the top pipe
          },
        ]}
        resizeMode="stretch"
      />
      
      {/* Bottom pipe (stretches from the ground) */}
      <Image
        source={require('../assets/images/pipe.png')}
        style={[
          styles.obstacle,
          {
            width: obstacleWidth,
            height: bottomObstacleHeight,
            left: obstacleLeft,
            bottom: 0, // Positioned at the bottom
          },
        ]}
        resizeMode="stretch"
      />
    </>
  );
}

const styles = StyleSheet.create({
  obstacle: {
    position: 'absolute',
    resizeMode: 'stretch', // Ensures the pipe stretches properly
  },
});
