import { useState, useEffect } from 'react';
import { Dimensions, Alert } from 'react-native';
import { Audio } from 'expo-av';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const gravity = 3;
const obstacleWidth = 60;
const gapHeight = 200;

export default function useGameLogic() {
  const [birdBottom, setBirdBottom] = useState(screenHeight / 2);
  const birdLeft = screenWidth / 4;

  const [obstacleLeft, setObstacleLeft] = useState(screenWidth);
  const [obstacleHeight, setObstacleHeight] = useState(300);
  const [gapBottom, setGapBottom] = useState(screenHeight / 2);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const birdWidth = 50;
  const birdHeight = 60;
  const obstacleSpeed = 5;

  let gameTimerId;
  let obstacleTimerId;

  // Load jump sound
  async function playJumpSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sounds/jump.mp3')
    );
    await sound.playAsync();
  }

  // Load game over sound
  async function playGameOverSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sounds/gameOver.mp3')
    );
    await sound.playAsync();
  }

  useEffect(() => {
    if (birdBottom > 0 && !isGameOver) {
      gameTimerId = setInterval(() => {
        setBirdBottom(birdBottom => birdBottom - gravity);
      }, 30);
    }

    return () => {
      clearInterval(gameTimerId);
    };
  }, [birdBottom, isGameOver]);

  useEffect(() => {
    if (obstacleLeft > -obstacleWidth && !isGameOver) {
      obstacleTimerId = setInterval(() => {
        setObstacleLeft(obstacleLeft => obstacleLeft - obstacleSpeed);
      }, 30);
    } else if (!isGameOver) {
      setObstacleLeft(screenWidth);
      setObstacleHeight(Math.random() * (screenHeight - gapHeight));
      setScore(score => score + 1);
    }

    return () => {
      clearInterval(obstacleTimerId);
    };
  }, [obstacleLeft, isGameOver]);

  useEffect(() => {
    if (
      (birdBottom < gapBottom - gapHeight / 2 || birdBottom > gapBottom + gapHeight / 2) &&
      obstacleLeft > birdLeft - birdWidth / 2 &&
      obstacleLeft < birdLeft + birdWidth / 2
    ) {
      setIsGameOver(true);
      playGameOverSound(); // Play game over sound
      Alert.alert('Game Over', '', [{ text: 'Restart', onPress: restartGame }]);
    }
  }, [birdBottom, obstacleLeft]);

  const jump = () => {
    if (birdBottom < screenHeight && !isGameOver) {
      setBirdBottom(birdBottom => birdBottom + 50);
      playJumpSound(); // Play jump sound
    }
  };

  const restartGame = () => {
    setBirdBottom(screenHeight / 2);
    setObstacleLeft(screenWidth);
    setScore(0);
    setIsGameOver(false);
  };

  return { birdBottom, birdLeft, obstacleLeft, obstacleHeight, gapBottom, jump, score, isGameOver, restartGame };
}
