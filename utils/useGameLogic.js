import { useState, useEffect } from 'react';
import { Dimensions, Alert } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const gravity = 3;
const obstacleWidth = 60;
const gapHeight = 200;

export default function useGameLogic() {
  const [birdBottom, setBirdBottom] = useState(screenHeight / 2);
  const birdLeft = screenWidth / 2;

  const [obstacleLeft, setObstacleLeft] = useState(screenWidth);
  const [obstacleHeight, setObstacleHeight] = useState(300);
  const [gapBottom, setGapBottom] = useState(screenHeight / 2);
  const [score, setScore] = useState(0); // Track the player's score

  const birdWidth = 50;
  const birdHeight = 60;
  const obstacleSpeed = 5;

  let gameTimerId;
  let obstacleTimerId;

  useEffect(() => {
    if (birdBottom > 0) {
      gameTimerId = setInterval(() => {
        setBirdBottom(birdBottom => birdBottom - gravity);
      }, 30);
    }

    return () => {
      clearInterval(gameTimerId);
    };
  }, [birdBottom]);

  useEffect(() => {
    if (obstacleLeft > -obstacleWidth) {
      obstacleTimerId = setInterval(() => {
        setObstacleLeft(obstacleLeft => obstacleLeft - obstacleSpeed);
      }, 30);
    } else {
      setObstacleLeft(screenWidth);
      setObstacleHeight(Math.random() * (screenHeight - gapHeight));
      setScore(score => score + 1); // Increment the score when the bird passes an obstacle
    }

    return () => {
      clearInterval(obstacleTimerId);
    };
  }, [obstacleLeft]);

  useEffect(() => {
    if (
      (birdBottom < gapBottom - gapHeight / 2 || birdBottom > gapBottom + gapHeight / 2) &&
      obstacleLeft > birdLeft - birdWidth / 2 &&
      obstacleLeft < birdLeft + birdWidth / 2
    ) {
      Alert.alert('Game Over');
      setBirdBottom(screenHeight / 2);
      setObstacleLeft(screenWidth);
      setScore(0); // Reset score on game over
    }
  }, [birdBottom, obstacleLeft]);

  const jump = () => {
    if (birdBottom < screenHeight) {
      setBirdBottom(birdBottom => birdBottom + 50);
    }
  };

  return { birdBottom, birdLeft, obstacleLeft, obstacleHeight, gapBottom, jump, score };
}
