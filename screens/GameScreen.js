import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Bird from '../components/Bird';
import Obstacle from '../components/Obstacle';
import Score from '../components/Score';
import useGameLogic from '../utils/useGameLogic';

export default function GameScreen() {
  const { birdBottom, birdLeft, obstacleLeft, obstacleHeight, gapBottom, jump, score } = useGameLogic();

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
        <Text style={styles.text}>Flappy Bird Game Coming Soon!</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    position: 'absolute',
    top: 50,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
