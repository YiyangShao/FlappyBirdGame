import React from 'react';
import { View, StyleSheet } from 'react-native';

// Renders an obstacle (pipe) with dynamic position and size.
export default function Obstacle({ obstacleWidth, obstacleHeight, obstacleLeft, gapBottom, gapHeight }) {
  return (
    <>
      {/* Upper obstacle */}
      <View
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
      <View
        style={[
          styles.obstacle,
          {
            width: obstacleWidth,
            height: obstacleHeight,
            left: obstacleLeft,
            bottom: gapBottom - gapHeight / 2,
          },
        ]}
      />
    </>
  );
}

const styles = StyleSheet.create({
  obstacle: {
    position: 'absolute',
    backgroundColor: 'green', // Temporary color for the pipes
  },
});
