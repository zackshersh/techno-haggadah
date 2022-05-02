import React, { useState } from 'react';

function ParameterPanel2({layerCoords, parent}) {


    const [coords, setCoords] = useState({
        x:0,
        y:0
    })

    const translateStyles = {
        top: coords.y,
        left: coords.x
    }


    // adjusts position according to parent positiion so it's on the side always
    const adjustPos = () => {
        let rightEdge = pageClientRect.right;
        let xDif = rightEdge - layerClientRect.x;

        console.log(xDif);

        translateStyles.left = xDif-pageClientRect.width;

    }
    let pageClientRect;
    let layerClientRect;
    if(parent.current){
        pageClientRect = parent.current.parentElement.parentElement.getBoundingClientRect();
        layerClientRect = parent.current.getBoundingClientRect();
        // console.log(pageClientRect)
        adjustPos()
    }




    return (
        <div style={translateStyles} className='Parameter-Panel-2'>
            
        </div>
    );
}

export default ParameterPanel2;