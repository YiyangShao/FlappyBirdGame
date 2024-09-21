# Code Structure

### App.js
- Renders the GameScreen component.

### screens/GameScreen.js
- Displays the game components, allows the user to tap anywhere on the screen to make the bird jump, and provides a button to pause/resume the game.

### components/Bird.js
- Displays the bird character using an image of a bird.

### components/Obstacle.js
- Displays the obstacles (pipes) using pipe images, with one rotated for the bottom pipe.

### components/Score.js
- Displays the player's score based on how long they survive.

### utils/useGameLogic.js
- Manages bird movement, obstacle movement, score tracking, collision detection, game restarting, and includes pause/resume functionality.
