import React from 'react';

import eraserIcon from "../assets/noun-eraser-4789777.png"
import pencilIcon from "../assets/noun-pencil-4793575.png"
import imageIcon from "../assets/noun-image-4793556.png"

function ToolPanel({functions, currentTool}) {


    const checkActive = (tool) => {
        if(tool == currentTool){
            return 'Active-Tool'
        } else {
            return 'Inactive-Tool'
        }
    }

    return (
        <div className='Side-Panel Tool-Panel'>
            <div className='Tool-Button-Cont'>
                <div>
                    <button className={checkActive('placeText')} onMouseDown={functions.placeText}>Place Text</button>
                    <button className={checkActive('placeImage')} onMouseDown={functions.placeImage}>Place Image</button>
                </div>
                <div className='Drawing-Tools'>
                    <button className={checkActive('paint')} onMouseDown={functions.startDraw}>Draw</button>
                    <button className={checkActive('erase')} onMouseDown={functions.startErase}>Erase</button>
                </div>
                <div className='Drawing-Tools'>
                    <button onMouseDown={functions.cancelTool}>Cancel</button>
                    <button onMouseDown={functions.clearPage}>Clear Page</button>
                </div>
            </div>
        </div>
    );
}

export default ToolPanel;