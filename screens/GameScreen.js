import React from 'react';
import { ImageBackground, View, StyleSheet, TouchableWithoutFeedback, Button } from 'react-native';
import Bird from '../components/Bird';
import Obstacle from '../components/Obstacle';
import Score from '../components/Score';
import useGameLogic from '../utils/useGameLogic';

export default function GameScreen() {
  const { birdBottom, birdLeft, obstacleLeft, gapBottom, gapHeight, jump, score, togglePause, isPaused, restartGame, isGameOver } = useGameLogic();

  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/images/background.png')}
          style={styles.background}
          resizeMode="cover"
        >
          <Bird birdBottom={birdBottom} birdLeft={birdLeft} />
          <Obstacle
            obstacleLeft={obstacleLeft}
            gapBottom={gapBottom}
            gapHeight={gapHeight}
            obstacleWidth={60}
          />
          <Score score={score} />

          {isGameOver && (
            <View style={styles.restartButton}>
              <Button onPress={restartGame} title="Restart" color="#FF6347" />
            </View>
          )}

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
    height: '100%',
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
