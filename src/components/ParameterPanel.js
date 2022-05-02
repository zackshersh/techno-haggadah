import React from 'react';
import TextSectionSelector from './TextSectionSelector';

function ParameterPanel({currentLayerData}) {

    // console.log(currentLayerData)

    const layerData = currentLayerData;

    const layerTypeParameters = () => {
        if(currentLayerData){
            switch(currentLayerData.type){
                case 'text':
                    return <TextSectionSelector />
            }

        } else {
            return null;
        }
    }


    return (
        <div className='Parameter-Panel Side-Panel'>
            {layerTypeParameters()}
        </div>
    );
}

export default ParameterPanel;