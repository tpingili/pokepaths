import React, { useEffect, useState } from 'react';
import '../App.css';
import Tile from './Tile';
import lodash from 'lodash';
import axios from 'axios';

const Board = ({sideLength, tileType }) => {

    const [ board, setBoard ] = 
            useState(new Array(Number(sideLength))
                        .fill(null)
                        .map(() => new Array(Number(sideLength)).fill('null'))
            );
    const [ pathObj, setPathObj ] = useState({});
    const [ pathArray, setPathArray ] = useState([]);
    const [ dataFetching, setDataFetching ] = useState(false);

    //set the tile background 
    const handleTileClick = (x, y, type) => {
        const copy = [...board];
        //when the user is configuring start, finish or impassables, type is not passed
        if(!type) {
            //clear the previous path configured
            lodash.forEach(pathArray, item  => {
                //use the y as row index and x as col index
                copy[item.y][item.x] = 'null';
            });
        }
        //use y as row index and x as col index
        copy[y][x] = type ? type: tileType;
        setBoard(copy);
    }

    //clear the board, previous path configured, path object used in the post request
    const clearBoard = () => {
        setBoard(new Array(Number(sideLength))
                .fill(null)
                .map(() => new Array(Number(sideLength)).fill('null')));
        setPathArray([]);
        setPathObj({});
    }

    //clear the backgrounds (reset the tiles)
    //used to clear start and finish tiles when user selects more than 1
    const clearTile = (tilesList) => {
        const boardCopy = [...board];
        lodash.forEach(tilesList, (tile) => {
            //use the y as row index and x as col index
            boardCopy[tile.y][tile.x] = 'null';
        });
        setBoard(boardCopy);
    }

    const validateBoard = () => {
        const impassablesCopy = [];
        const startCopy = [];
        const endCopy = [];
        //create the object to be passed in for the post request
        lodash.forEach(board, (arrItem, rowIndex) => {
            lodash.forEach(arrItem, (item, colIndex) => {
                ////use the y as row index and x as col index
                if(item === 'rock') {
                    impassablesCopy.push({ x: colIndex, y: rowIndex });
                }
                if(item === 'start') {
                    startCopy.push({ x: colIndex, y: rowIndex})
                }
                if(item === 'finish') {
                    endCopy.push({ x: colIndex, y: rowIndex })
                }
            });
        });
        //if the user selected more than one start tile or finish tile
        if(lodash.size(startCopy)!==1 || lodash.size(endCopy)!==1) {
            //alert the user, clear the start and finish tiles
            //clear the path object
            alert('Please choose one start and one finish tile');
            if(lodash.size(startCopy)!==1) {
                clearTile(startCopy);
            }
            if(lodash.size(endCopy)!==1) {
                clearTile(endCopy);
            }
            setPathObj({});
            return;
        } 

        //configure the path object properties
        setPathObj({...pathObj, 'sideLength': Number(sideLength), 
                'startingLoc': startCopy[0], 'endingLoc': endCopy[0], 
                'impassables': impassablesCopy });
    }

    const transformMovesToTiles = (moves) => {
        //exclude the last tile (finish tile) from turning into 'grass'
        moves.pop();
        const pathArrayCopy = [];
        //create a list of tiles which we want to configure as path
        //by turning them into grass tiles
        let currentX = pathObj.startingLoc.x;
        let currentY = pathObj.startingLoc.y;
        lodash.forEach(moves, (moveChar) => {
            if(moveChar === 'L') {
                currentX -= 1;
            }
            if(moveChar === 'R') {
                currentX += 1;
            }
            if(moveChar === 'U') {
                currentY -= 1;
            }
            if(moveChar === 'D') {
                currentY += 1;
            }
            pathArrayCopy.push({ x: currentX, y: currentY });
        });
        setPathArray(pathArrayCopy);
    }

    const fetchPathData = () => {
        if(!lodash.isEmpty(pathObj)) {
            //disable buttons until the request returns
            setDataFetching(true);
            axios.post('https://frozen-reef-96768.herokuapp.com/find-path', pathObj)
            .then(response => {
                transformMovesToTiles(response.data.moves);
                //enable buttons
                setDataFetching(false);
            })
            .catch(err => {
                //if no path was found, alert the message to the user
                if(err.response) {
                    alert(err.response.data.message);
                }
                setDataFetching(false);
            });
        }
    }

    useEffect(() => {
        //whenever pathArray changes and is not empty,
        //turn each of the tiles in the list to grass
        if(!lodash.isEmpty(pathArray)) {
            lodash.forEach(pathArray, item  => {
                handleTileClick(item.x, item.y, 'grass');
            });
        }
        // eslint-disable-next-line
    }, [pathArray]);

    useEffect(() => {
        //whenever path object changes to be non-empty
        //make a post request to fetch data
        fetchPathData(); // eslint-disable-next-line
    }, [pathObj])

    return (
        <div>
            <table className="board">
                <tbody className="table-body">
                    { board.map((row, rowIndex) => 
                        <tr key={rowIndex}>
                        {row.map((item, colIndex) => 
                            <Tile key={(rowIndex * 100) + colIndex} x={colIndex} y={rowIndex} 
                            value={item} tileClick={handleTileClick} />
                        )}   
                    </tr>
                    )}
                </tbody>
            </table>
            <button className="board-btn" onClick={validateBoard} disabled={dataFetching}>Find Path</button> 
            <button className="board-btn" onClick={clearBoard} disabled={dataFetching}>Clear Board</button>                
        </div>
    )
}

export default Board;
