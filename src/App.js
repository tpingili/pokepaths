import React, { useState } from 'react';
import './App.css';
import Board from './components/Board';
import ConfigOptions from './components/ConfigOptions';

const App = () => {

  const [ sideLength, setSideLength ] = useState('');
  const [ gameStarted, setGameStarted ] = useState(false);
  const [ currentTileType, setCurrentTileType ] = useState('')

  const createBoard = () => {
    if(Number(sideLength) < 2) {
      alert('Please select a valid whole number greater than or equal to 2');
      setSideLength('');
    } else {
      setGameStarted(true);
    }
  }

  const handleTileTypeChange = (newValue) => {
    //sets the current tile type which sets the tile background
    setCurrentTileType(newValue);
  }

  if(!gameStarted) {
    return (
      <div className="App">
          <div className="App-container">
              <p>Enter board size: </p>
              <input className="board-input" type="number" min="2" value={sideLength} 
                onChange={(event) => setSideLength(event.target.value)} /> 
            <button className="board-btn" onClick={createBoard}>Create Board</button>
          </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="App-container">
        <Board sideLength={sideLength} tileType={currentTileType} />
        <ConfigOptions tileTypeChange={handleTileTypeChange}/>
      </div>
    </div>
  )
  
}

export default App;

