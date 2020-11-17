import React from 'react';

const ConfigOptions = ({tileTypeChange}) => {

    //set the current tile type to the radio button selection's value
    //by calling the function in App.js
    const handleRadioButtonChange = (event) => {
        tileTypeChange(event.target.value);
    }

    return (
        <div>
            <div style={{textDecoration: 'underline'}}>Configure squares</div>
            <div className="config-group" onChange={handleRadioButtonChange}>
                <div>
                    <input type="radio" value="rock" name="configOpt" id="rock" /> 
                    <label htmlFor="rock">Impassables (optional)</label>
                </div>
                <div>
                    <input type="radio" value="start" name="configOpt" id="start" /> 
                    <label htmlFor="start">Start (choose only 1) </label>
                </div>
                <div>
                    <input type="radio" value="finish" name="configOpt" id="finish" /> 
                    <label htmlFor="finish"> Finish (choose only 1) </label>
                </div>
            </div>
        </div>
    );
};

export default ConfigOptions;