import React from 'react';

function ImageLayer({layer, freshLayer, imageSourceState}) {
    return (
        <div className='Image-Layer'>
            <img src={imageSourceState} />
        </div>
    );
}

export default ImageLayer;