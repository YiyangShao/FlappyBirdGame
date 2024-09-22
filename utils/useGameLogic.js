import { useState, useEffect } from 'react';
import { Dimensions, Alert } from 'react-native';
import { Audio } from 'expo-av';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const gravity = 0.5; // Reduced gravity for smoother acceleration
const jumpImpulse = -10; // Upward velocity when the bird jumps
const obstacleWidth = 60;
const gapHeight = 200;

export default function useGameLogic() {
  const [birdBottom, setBirdBottom] = useState(screenHeight / 2);
  const birdLeft = screenWidth / 4;

  const [obstacleLeft, setObstacleLeft] = useState(screenWidth);
  const [gapBottom, setGapBottom] = useState(screenHeight / 2); // Dynamic gap position
  const [birdSpeed, setBirdSpeed] = useState(0); // Vertical speed of the bird (affected by gravity and jump)
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
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

  // Apply gravity with acceleration (falling speed increases over time)
  useEffect(() => {
    if (birdBottom > 0 && !isGameOver && !isPaused) {
      gameTimerId = setInterval(() => {
        setBirdSpeed(speed => speed + gravity); // Gravity increases downward speed
        setBirdBottom(birdBottom => birdBottom - birdSpeed); // Bird moves up or down based on speed
      }, 30);
    }

    return () => {
      clearInterval(gameTimerId);
    };
  }, [birdBottom, birdSpeed, isGameOver, isPaused]);

  // Move the obstacle and adjust the gap position
  useEffect(() => {
    if (obstacleLeft > -obstacleWidth && !isGameOver && !isPaused) {
      obstacleTimerId = setInterval(() => {
        setObstacleLeft(obstacleLeft => obstacleLeft - obstacleSpeed);
      }, 30);
    } else if (!isGameOver && !isPaused) {
      setObstacleLeft(screenWidth);
      setGapBottom(Math.random() * (screenHeight - gapHeight)); // Randomize gap position
      setScore(score => score + 1);
      setObstacleSpeed(obstacleSpeed => obstacleSpeed + 0.5); // Increase speed with score
    }

    return () => {
      clearInterval(obstacleTimerId);
    };
  }, [obstacleLeft, isGameOver, isPaused]);

  // Collision detection with the obstacles
  useEffect(() => {
    const birdTop = birdBottom + birdHeight / 2;
    const birdBottomEdge = birdBottom - birdHeight / 2;

    const gapTop = gapBottom + gapHeight / 2;
    const gapBottomEdge = gapBottom - gapHeight / 2;

    if (
      (birdBottomEdge < gapBottomEdge || birdTop > gapTop) && // Bird hits an obstacle
      obstacleLeft > birdLeft - birdWidth / 2 &&
      obstacleLeft < birdLeft + birdWidth / 2
    ) {
      setIsGameOver(true);
      playGameOverSound();
      Alert.alert('Game Over', '', [{ text: 'Restart', onPress: restartGame }]);
    }
  }, [birdBottom, obstacleLeft]);

  // Make the bird jump by changing its speed
  const jump = () => {
    if (birdBottom < screenHeight && !isGameOver && !isPaused) {
      setBirdSpeed(jumpImpulse); // Set upward velocity
      playJumpSound();
    }
  };

  // Restart the game
  const restartGame = () => {
    setBirdBottom(screenHeight / 2);
    setObstacleLeft(screenWidth);
    setScore(0);
    setObstacleSpeed(5);
    setBirdSpeed(0); // Reset bird speed
    setIsGameOver(false);
  };

  // Pause and resume the game
  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return {
    birdBottom,
    birdLeft,
    obstacleLeft,
    gapBottom,
    gapHeight,
    jump,
    score,
    isGameOver,
    restartGame,
    togglePause,
    isPaused,
  };
}
