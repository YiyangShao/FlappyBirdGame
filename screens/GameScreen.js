import React from 'react';
import { ImageBackground, View, StyleSheet, TouchableWithoutFeedback, Button, Dimensions } from 'react-native';
import Bird from '../components/Bird';
import Obstacle from '../components/Obstacle';
import Score from '../components/Score';
import useGameLogic from '../utils/useGameLogic';

// Get the screen width and height
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function GameScreen() {
  const { birdBottom, birdLeft, obstacles, gapHeight, jump, score, togglePause, isPaused, restartGame, isGameOver } = useGameLogic();

  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        {/* Background image that covers the entire screen */}
        <ImageBackground
          source={require('../assets/images/background.png')}
          style={styles.background} // Ensure background covers the entire screen
          resizeMode="cover"
        >
          {/* Bird Component */}
          <Bird birdBottom={birdBottom} birdLeft={birdLeft} />

          {/* Render all obstacles */}
          {obstacles.map((obstacle, index) => (
            <Obstacle
              key={index}
              obstacleLeft={obstacle.obstacleLeft}
              gapBottom={obstacle.gapBottom}
              gapHeight={gapHeight}
              obstacleWidth={60}
            />
          ))}

          {/* Score Component */}
          <Score score={score} />

          {/* Restart Button */}
          {isGameOver && (
            <View style={styles.restartButton}>
              <Button onPress={restartGame} title="Restart" color="#FF6347" />
            </View>
          )}

          {/* Pause/Resume Button */}
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
    width: screenWidth, // Set container width to screen width
    height: screenHeight, // Set container height to screen height
  },
  background: {
    flex: 1,
    width: screenWidth, // Set background width to screen width
    height: screenHeight, // Set background height to screen height
    justifyContent: 'center',
    alignItems: 'center',
  },
  pauseButton: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  restartButton: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
});
