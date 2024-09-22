# Code Structure

### App.js
- Renders the GameScreen component.

### screens/GameScreen.js
- Displays the game components, manages user interaction, and provides a button to pause/resume the game. The container width is set to 100% to ensure proper screen positioning.

### components/Bird.js
- Displays the bird character using an image of a bird.

### components/Obstacle.js
- Displays the obstacles (pipes) using pipe images, with one rotated for the bottom pipe.

### components/Score.js
- Displays the player's score based on how long they survive.

### utils/useGameLogic.js
- Manages bird movement, obstacle movement, score tracking, collision detection, game restarting, and includes pause/resume functionality.
