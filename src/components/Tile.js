import React from 'react';

const Tile = ({x, y, value, tileClick}) => {
    const tileBkgrnd = value ? `${value}-tile` : 'null-tile'; 

    //call the function in Board.js to set the tile to either 
    //a rock, start or finish tile based on the radio button selection
    const clickOnTile = () => {
        tileClick(x, y)
    }

    return (
        <td className={`tile-btn ${tileBkgrnd}`} onClick={clickOnTile} ></td>
    )
};

export default Tile;