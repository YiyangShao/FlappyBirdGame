# Code Structure

### App.js
- Renders the GameScreen component.

### screens/GameScreen.js
- Displays the game components over a background image and manages user interaction.

### components/Bird.js
- Displays the bird character using an image of a bird.

### components/Obstacle.js
- Displays the obstacles (pipes) using pipe images, with one rotated for the bottom pipe.

### components/Score.js
- Displays the player's score based on how long they survive.

### utils/useGameLogic.js
- Manages bird movement, obstacle movement, score tracking, collision detection, game restarting, and plays sound effects (jump and game over).
