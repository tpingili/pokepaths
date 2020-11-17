# Welcome to Pokepaths!

This project helps pokemon find their path. It has been hosted at https://tpingili.github.io/pokepaths/

## Instructions & functionality

### Home page

- Enter a board size N (>= 2) and click on 'Create Board' to create a board of N x N squares
- Invalid sizes are alerted to the user

### Board page

- Consists of N X N squares board, 3 radio buttons to configure squares, **Find Path** and **Clear Board** buttons
- Choose a radio button and click on a square to configure it. The background of the square changes accordingly.
- **Clear Board** button : clears the board
- **Find Path** button : tries to generate a valid path displayed by squares with grass background
- The board is validated. If more than one squares is configured as Start/Finish, the user is asked to choose only one. Upon clicking ok, the multiple start or finish tiles are cleared
- If a path is not possible, the user is alerted
- If the user tries to configure more squares after calculating a valid path, the previous path is cleared
- Both the **Find Path** and **Clear Board** buttons are disabled when the data is being fetched
- Refresh the page to go back to the Home page and start over.
