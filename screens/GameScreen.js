import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Button } from 'react-native';
import Bird from '../components/Bird';
import Obstacle from '../components/Obstacle';
import Score from '../components/Score';
import useGameLogic from '../utils/useGameLogic';

export default function GameScreen() {
  const { birdBottom, birdLeft, obstacleLeft, obstacleHeight, gapBottom, jump, score, togglePause, isPaused } = useGameLogic();

  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        <Bird birdBottom={birdBottom} birdLeft={birdLeft} />
        <Obstacle
          obstacleWidth={60}
          obstacleHeight={obstacleHeight}
          obstacleLeft={obstacleLeft}
          gapBottom={gapBottom}
          gapHeight={200}
        />
        <Score score={score} />
        {/* Pause/Resume button */}
        <View style={styles.pauseButton}>
          <Button onPress={togglePause} title={isPaused ? 'Resume' : 'Pause'} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pauseButton: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
});
