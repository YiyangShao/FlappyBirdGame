import { useState, useEffect } from 'react';
import { Dimensions, Alert } from 'react-native';
import { Audio } from 'expo-av';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const gravity = 0.5;
const jumpImpulse = -10;
const obstacleWidth = 60;
const gapHeight = 250; // Fixed gap height between obstacles
const obstacleSpawnInterval = 3000; // Increased time between spawning new obstacles (3 seconds)

export default function useGameLogic() {
  const [birdBottom, setBirdBottom] = useState(screenHeight / 2);
  const birdLeft = screenWidth / 4;

  const [obstacles, setObstacles] = useState([]); // Array to store multiple obstacles
  const [birdSpeed, setBirdSpeed] = useState(0); // Bird's vertical speed
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [obstacleSpeed, setObstacleSpeed] = useState(5);

  const birdWidth = 50;
  const birdHeight = 60;

  let gameTimerId;
  let obstacleTimerId;
  let spawnObstacleTimerId;

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
    if (!isGameOver && !isPaused) {
      gameTimerId = setInterval(() => {
        setBirdSpeed(speed => speed + gravity); // Gravity increases downward speed
        setBirdBottom(prevBottom => {
          // Prevent bird from falling below the screen bottom
          const newBottom = prevBottom - birdSpeed;
          return newBottom <= 0 ? 0 : newBottom; // Ensure birdBottom doesn't go below 0
        });
      }, 30);
    }

    return () => {
      clearInterval(gameTimerId);
    };
  }, [birdBottom, birdSpeed, isGameOver, isPaused]);

  // Spawn new obstacles at regular intervals
  useEffect(() => {
    if (!isGameOver && !isPaused) {
      spawnObstacleTimerId = setInterval(() => {
        const gapBottom = Math.random() * (screenHeight - gapHeight); // Randomize gap position
        setObstacles(obstacles => [
          ...obstacles,
          { obstacleLeft: screenWidth, gapBottom }, // Add new obstacle
        ]);
      }, obstacleSpawnInterval); // Spawn new obstacle every 3 seconds
    }

    return () => {
      clearInterval(spawnObstacleTimerId);
    };
  }, [isGameOver, isPaused]);

  // Move all obstacles and check for out-of-bounds obstacles
  useEffect(() => {
    if (!isGameOver && !isPaused) {
      obstacleTimerId = setInterval(() => {
        setObstacles(obstacles =>
          obstacles
            .map(obstacle => ({
              ...obstacle,
              obstacleLeft: obstacle.obstacleLeft - obstacleSpeed,
            }))
            .filter(obstacle => obstacle.obstacleLeft > -obstacleWidth) // Remove obstacles that are off-screen
        );
        setScore(score => score + 1); // Increase score as time progresses
      }, 30);
    }

    return () => {
      clearInterval(obstacleTimerId);
    };
  }, [obstacles, isGameOver, isPaused]);

  // Collision detection with each obstacle
  useEffect(() => {
    const birdTop = birdBottom + birdHeight / 2;
    const birdBottomEdge = birdBottom - birdHeight / 2;

    obstacles.forEach(obstacle => {
      const gapTop = obstacle.gapBottom + gapHeight / 2;
      const gapBottomEdge = obstacle.gapBottom - gapHeight / 2;

      if (
        (birdBottomEdge < gapBottomEdge || birdTop > gapTop) && // Bird hits an obstacle
        obstacle.obstacleLeft > birdLeft - birdWidth / 2 &&
        obstacle.obstacleLeft < birdLeft + birdWidth / 2
      ) {
        setIsGameOver(true);
        playGameOverSound();
        Alert.alert('Game Over', '', [{ text: 'Restart', onPress: restartGame }]);
      }
    });
  }, [birdBottom, obstacles]);

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
    setObstacles([]);
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
    obstacles,
    gapHeight,
    jump,
    score,
    isGameOver,
    restartGame,
    togglePause,
    isPaused,
  };
}
