import React from 'react';
import { ImageBackground, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Bird from '../components/Bird';
import Obstacle from '../components/Obstacle';
import Score from '../components/Score';
import useGameLogic from '../utils/useGameLogic';

export default function GameScreen() {
  const { birdBottom, birdLeft, obstacleLeft, obstacleHeight, gapBottom, jump, score } = useGameLogic();

  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        {/* Background Image */}
        <ImageBackground
          source={require('../assets/images/background.png')}
          style={styles.background}
          resizeMode="cover"
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
        </ImageBackground>
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
  background: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
