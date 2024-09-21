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
  const [isPaused, setIsPaused] = useState(false); // New pause state
  const [obstacleSpeed, setObstacleSpeed] = useState(5);

  const birdWidth = 50;
  const birdHeight = 60;

  let gameTimerId;
  let obstacleTimerId;

  async function playJumpSound() {
    const { sound } = await Audio.Sound.createAsync(require('../assets/sounds/jump.mp3'));
    await sound.playAsync();
  }

  async function playGameOverSound() {
    const { sound } = await Audio.Sound.createAsync(require('../assets/sounds/gameOver.mp3'));
    await sound.playAsync();
  }

  // Gravity for the bird
  useEffect(() => {
    if (birdBottom > 0 && !isGameOver && !isPaused) {
      gameTimerId = setInterval(() => {
        setBirdBottom(birdBottom => birdBottom - gravity);
      }, 30);
    }

    return () => {
      clearInterval(gameTimerId);
    };
  }, [birdBottom, isGameOver, isPaused]);

  // Move the obstacle
  useEffect(() => {
    if (obstacleLeft > -obstacleWidth && !isGameOver && !isPaused) {
      obstacleTimerId = setInterval(() => {
        setObstacleLeft(obstacleLeft => obstacleLeft - obstacleSpeed);
      }, 30);
    } else if (!isGameOver && !isPaused) {
      setObstacleLeft(screenWidth);
      setObstacleHeight(Math.random() * (screenHeight - gapHeight));
      setGapBottom(Math.random() * (screenHeight - gapHeight));
      setScore(score => score + 1);
      setObstacleSpeed(obstacleSpeed => obstacleSpeed + 0.5);
    }

    return () => {
      clearInterval(obstacleTimerId);
    };
  }, [obstacleLeft, isGameOver, isPaused]);

  // Collision detection
  useEffect(() => {
    if (
      (birdBottom < gapBottom - gapHeight / 2 || birdBottom > gapBottom + gapHeight / 2) &&
      obstacleLeft > birdLeft - birdWidth / 2 &&
      obstacleLeft < birdLeft + birdWidth / 2
    ) {
      setIsGameOver(true);
      playGameOverSound();
      Alert.alert('Game Over', '', [{ text: 'Restart', onPress: restartGame }]);
    }
  }, [birdBottom, obstacleLeft]);

  const jump = () => {
    if (birdBottom < screenHeight && !isGameOver && !isPaused) {
      setBirdBottom(birdBottom => birdBottom + 50);
      playJumpSound();
    }
  };

  const restartGame = () => {
    setBirdBottom(screenHeight / 2);
    setObstacleLeft(screenWidth);
    setScore(0);
    setObstacleSpeed(5);
    setIsGameOver(false);
  };

  // Pause and resume game
  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return { birdBottom, birdLeft, obstacleLeft, obstacleHeight, gapBottom, jump, score, isGameOver, restartGame, togglePause, isPaused };
}
