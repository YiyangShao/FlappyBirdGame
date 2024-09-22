import React from 'react';
import { ImageBackground, View, StyleSheet, TouchableWithoutFeedback, Button } from 'react-native';
import Bird from '../components/Bird';
import Obstacle from '../components/Obstacle';
import Score from '../components/Score';
import useGameLogic from '../utils/useGameLogic';

export default function GameScreen() {
  const { birdBottom, birdLeft, obstacleLeft, obstacleHeight, gapBottom, jump, score, togglePause, isPaused } = useGameLogic();

  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        {/* Add the background image */}
        <ImageBackground
          source={require('../assets/images/background.png')} // Path to your background image
          style={styles.background}
          resizeMode="cover" // Ensures the background covers the screen
        >
          <Bird birdBottom={birdBottom} birdLeft={birdLeft} />
          <Obstacle
            obstacleWidth={60}
            obstacleHeight={obstacleHeight}
            obstacleLeft={obstacleLeft}
            gapBottom={gapBottom}
            gapHeight={200}
          />
          <Score score={score} />
          <View style={styles.pauseButton}>
            <Button onPress={togglePause} title={isPaused ? 'Resume' : 'Pause'} />
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%', // Ensure the background covers the entire height of the screen
    justifyContent: 'center',
    alignItems: 'center',
  },
  pauseButton: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
});
