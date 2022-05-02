import React, { useState } from 'react';



function ParamButtonPanel({functions, layer, freshLayer, display, imageSourceState, setImageSourceState, font, fontSize}) {

    const [newImageSource, setNewImageSource] = useState(null);

    const [fontPanelDisplay, setFontPanelDisplay] = useState('none');

    const [mainButtonDisplay, setMainButtonDisplay] = useState('inline-block')

    const generateButtons = () => {
        switch(layer.type){
            case 'text':
                return textButtons();
                break;
            case 'image':
                return imageButtons()
                break;
        }
    }

    const textButtons = () => {
        return [
            <button style={{display:mainButtonDisplay}} onMouseDown={functions.startTextSelection} key={0}>Select Text</button>,
            <button style={{display:mainButtonDisplay}} onMouseDown={handleFontButton} key={1}>Font</button>
        ]
    }

    const imageButtons = () => {
        return [
            <button onMouseDown={handleImageSourceSelect} key={0}>Select Source</button>
        ]
    }

    const [imageSourceDisplay, setImageSourceDisplay] = useState('none')


    const handleImageSourceSelect = () => {
        setImageSourceDisplay('flex')
    }

    const handleImageInput = (e) => {
        console.log(e.target.value);
        setNewImageSource(e.target.value);
    }

    const handleSourceSubmit = () => {
        console.log(newImageSource)
        setImageSourceState(newImageSource);
        freshLayer.contentID = newImageSource;
        functions.updateSelfInStorage(freshLayer);
        setImageSourceDisplay('none')
    }


    const handleFontButton = () => {
        setFontPanelDisplay('flex');
        functions.setDisplayButtons('none');
        setMainButtonDisplay('none')
    }

    const handleFontSelect = (e) => {

        functions.setTextFontState(e.target.value);
        freshLayer.font = e.target.value;
        functions.updateSelfInStorage(freshLayer);
    }

    const handleFontSizeChange = (e) => {

        functions.setTextFontSizeState(e.target.value);
        freshLayer.fontSize = e.target.value;
        functions.updateSelfInStorage(freshLayer);

    }


    const displayStyle = {
        display: display ? "flex" : "none"
    }




    return (
        <div style={displayStyle} className='Param-Button-Panel Button-Panel'>
            {generateButtons().map(button => button)}
            <div style={{display: imageSourceDisplay}} className='Image-Source-Selector'>
                <input onKeyDown={handleImageInput} onChange={handleImageInput} placeholder='Image URL'></input>
                <button onMouseDown={handleSourceSubmit}>Submit</button>
            </div>
            <div style={{display: fontPanelDisplay}} className='Font-Panel'>
                <select value={font} onChange={handleFontSelect}>
                    <option value="helvetica">Helvetica</option>
                    <option value="times new roman">Times New Roman</option>
                    <option value="courier new">Courier New</option>
                </select>
                <select value={fontSize} onChange={handleFontSizeChange}>
                    <option value="8">8pt</option>
                    <option value="10">10pt</option>
                    <option value="12">12pt</option>
                    <option value="16">16pt</option>
                    <option value="20">20pt</option>
                    <option value="24">24pt</option>
                    <option value="32">32pt</option>
                    <option value="48">48pt</option>
                    <option value="72">72pt</option>
                </select>
                <button onMouseDown={() => {setFontPanelDisplay('none'); setMainButtonDisplay('inline-block')}}>Done</button>
            </div>
        </div>
    );
}

export default ParamButtonPanel;