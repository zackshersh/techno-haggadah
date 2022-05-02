import React, { useContext, useEffect, useRef, useState } from 'react';
import { act } from 'react-dom/test-utils';

import { textDB } from '../scripts/elementData';
import EditButtonPanel from './EditButtonPanel';
import TextLayer from './TextLayer';
import ImageLayer from './ImageLayer';

import "../styles/page.css"
import { LayerContext } from './Editor';
import ParameterPanel2 from './ParameterPanel2';
import ParamButtonPanel from './ParamButtonPanel';
import TextSelectingInfo from './TextSelectingInfo';
import { currentKeys } from '../scripts/keyInputs';

function Layer({layer,setActive,activeLayer, updateSelfInStorage, mouse, preventClickTimer}) {

    //copy of original layer data which acts as up to date state of data for saving in storage
    const freshLayer = {...layer};

    const parent = useRef(null);

    const mousey = mouse;

    const [currentEditorLayerData, setCurrentEditorLayerData] = useContext(LayerContext);


    // permanent states which will are reflected in storage
    const [coords, setCoords] = useState({
        x: layer.x,
        y: layer.y
    })
    const [width, setWidth] = useState(layer.w);
    const [visible, setVisible] = useState(layer.visible);
    const [textSectionState, setTextSectionState] = useState(layer.contentID);
    const [textStartState, setTextStartState] = useState(layer.textStart);
    const [textLengthState, setTextLengthState] = useState(layer.textLength);
    const [imageSourceState, setImageSourceState] = useState(layer.contentID);
    const [textFontState, setTextFontState] = useState(layer.font);
    const [textFontSizeState, setTextFontSizeState] = useState(layer.fontSize);



    // impermanent runtime related states
    const [border, setBorder] = useState('Layer-NoHighlight');
    const [translating, setTranslating] = useState(false);
    const [tButtonPressed, setTButtonPressed] = useState(false);
    const [widthChanging, setWidthChanging] = useState(false);
    const [textSelecting, setTextSelecting] = useState(0);

    const [displayButtons, setDisplayButtons] = useState(true);

    const [totalMouseChange, setTotalMouseChange] = useState(0);
    const [tempSectionState, setTempSectionState] = useState(textSectionState);
    const [tempStartState, setTempStartState] = useState(textStartState);
    const [tempLengthState, setTempLengthState] = useState(textLengthState);
    // console.log(textLengthState)

    const translateStyles = {left: coords.x,
        top: coords.y,
        width: width,
        // overflow: textSelecting ? "hidden" : "visible"
    }

    useEffect(() => {
        if(!tButtonPressed){
            if(currentKeys["g"] && activeLayer == layer.index){
                setTranslating(true);
            } else {
                if(translating){
                    setTranslating(false);
                    endTranslate();

                }
            }
        }
    })



    // checks if layer is currently active and sets border accordingly
    const checkActive = () => {
        if(activeLayer == layer.index){
            setBorder('Layer-Highlight')
        } else {
            setBorder('Layer-NoHighlight')
        }
    }


    // misc display logic
    const buttonDisplayCheck = () => {
        if(translating || widthChanging || textSelecting || !displayButtons){
            return false;
        } else {
            return true;
        }
    }

    const generateLayerOfType = () => {
        switch(layer.type){
            case 'text':
                return <TextLayer fontState={textFontState} fontSizeState={textFontSizeState} textStartState={textStartState} textLengthState={textLengthState} textSectionState={textSectionState} layer={layer} freshLayer={freshLayer} textSelecting={textSelecting}/>
            case 'image':
                return <ImageLayer imageSourceState={imageSourceState} layer={layer} freshLayer={freshLayer}/>
        }
    }




    // input handlers
    const handleMouseOver = () => {
        if(activeLayer == null){
            setBorder('Layer-Highlight')
        }
    }

    const handleMouseOut = () => {
        if(activeLayer != layer.index || activeLayer == null){
            setBorder('Layer-NoHighlight')

        }
    }

    const handleMouseDown = () => {
        if(activeLayer == null){
            console.log('settinig active')
            console.log(layer.index)
            setActive(layer.index);
            setCurrentEditorLayerData(freshLayer)

        }
    }

    const handleMouseTranslateMove = () => {

        let newX = coords.x;
        let newY = coords.y;

        newX += mouse.xDif;
        newY += mouse.yDif;

        setCoords({
            x: newX,
            y: newY
        })
    }

    const handleMouseChangeWidth = () => {
        let newW = width;
        newW += mouse.xDif;
        setWidth(newW);
    }

    const handleMouseChangeText = () => {
        if(textSelecting == 1){
            let totalChange = totalMouseChange;
            setTotalMouseChange(totalChange + mouse.xDif);
            // console.log(totalMouseChange);

            let pixelsPerStep = 20;

            let discreteMouseSteps = Math.floor(totalMouseChange/pixelsPerStep);
            discreteMouseSteps = discreteMouseSteps + tempSectionState
            if(discreteMouseSteps >= textDB.length || discreteMouseSteps < 0){
                discreteMouseSteps = Math.abs(discreteMouseSteps%textDB.length)
                // discreteMouseSteps = 0
            } else if (discreteMouseSteps < 0){
                // discreteMouseSteps = textDB.length-1;
            }
            console.log(discreteMouseSteps)

            freshLayer.contentID = textSectionState;

            setTextSectionState(discreteMouseSteps)



        } else if (textSelecting == 2){
            let totalChange = totalMouseChange;
            setTotalMouseChange(totalChange + mouse.xDif);

            let pixelsPerStep = 20;

            let discreteMouseSteps = Math.floor(totalMouseChange/pixelsPerStep);
            discreteMouseSteps = discreteMouseSteps + tempStartState
            if(discreteMouseSteps > discreteMouseSteps >= textDB[textSectionState].length || discreteMouseSteps < 0){
                let maxVal;
                if(layer.textLength < textDB[textSectionState].length){
                    maxVal = layer.textLength;
                } else {
                    maxVal = textDB[textSectionState].length
                }

                discreteMouseSteps = Math.abs(discreteMouseSteps%maxVal);

            }
            freshLayer.textStart = textStartState;
            setTextStartState(discreteMouseSteps)

            // console.log(discreteMouseSteps)
        } else if (textSelecting == 3){
            let totalChange = totalMouseChange;
            setTotalMouseChange(totalChange + mouse.xDif);

            let pixelsPerStep = 20;

            let discreteMouseSteps = Math.floor(totalMouseChange/pixelsPerStep);
            discreteMouseSteps = discreteMouseSteps + tempLengthState;
            if(discreteMouseSteps > textDB[textSectionState].length + textStartState || discreteMouseSteps < 0) {
                discreteMouseSteps = Math.abs(discreteMouseSteps%((textDB[textSectionState].length+1)-textStartState))
            }

            console.log(discreteMouseSteps);

            setTextLengthState(discreteMouseSteps)
            // freshLayer.textLength = text

            // console.log(discreteMouseSteps)

        }
    }

    const handleTextMouseDown = () => {
        if(textSelecting == 1){
            setTextSelecting(2);
            setTotalMouseChange(0);
            setTempSectionState(textSectionState);
            freshLayer.contentID = textSectionState;
            updateSelfInStorage(freshLayer)
        } else if(textSelecting == 2){
            setTextSelecting(3);
            setTotalMouseChange(0);
            setTempStartState(textStartState);
            freshLayer.textStart = textStartState;
            updateSelfInStorage(freshLayer);
        } else if (textSelecting == 3){
            setTextSelecting(null);
            setTotalMouseChange(0);
            setTempLengthState(textLengthState);
            freshLayer.textLength = textLengthState;
            updateSelfInStorage(freshLayer);
        }
    }


    // edit buttons handlers
    const cancelSelection = () => {
        setActive(null);
        setTranslating(false);
        preventClickTimer(100);
    }

    const hideSelf = () => {
        setVisible(false);
        freshLayer.visible = false;
        updateSelfInStorage(freshLayer);
        cancelSelection()
    }


    const startTranslate = () => {
        setTranslating(true);
        setTButtonPressed(true);
    }

    const endTranslate = () => {
        console.log(coords)
        setTranslating(false);
        setTButtonPressed(false);
        freshLayer.x = coords.x;
        freshLayer.y = coords.y;

        updateSelfInStorage(freshLayer)
    }


    const startChangeWidth = () => {
        setWidthChanging(true);
    }
    
    const endChangeWidth = () => {
        setWidthChanging(false)
        freshLayer.w = width;
    
        updateSelfInStorage(freshLayer)
    }


    const buttonPanelFunctions = {
        cancelSelection: cancelSelection,
        hideSelf: hideSelf,
        startTranslate: startTranslate,
        startChangeWidth: startChangeWidth
    }




    // paraam buttons handlers

    const startTextSelection = () => {
        setTextSelecting(1)
    }

    const paramPanelFunctions = {
        startTextSelection: startTextSelection,
        updateSelfInStorage: updateSelfInStorage,
        setDisplayButtons: setDisplayButtons,
        setTextFontState: setTextFontState,
        setTextFontSizeState: setTextFontSizeState
    }

    if(visible){
        return (
            <div onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} index={layer.index} ref={parent} style={translateStyles}  className={`Layer-Element Text-Layer ${border} ${translating ? "Translating-Layer " : ""} ${textSelecting ? "Text-Selecting" : ""}`}>
                {textSelecting ? <TextSelectingInfo section={textSectionState} start={textStartState} length={textLengthState} textSelecting={textSelecting} /> : null}
                {generateLayerOfType()}
                <ParamButtonPanel font={textFontState} fontSize={textFontSizeState} imageSourceState={imageSourceState} setImageSourceState={setImageSourceState} functions={paramPanelFunctions} layer={layer} freshLayer={freshLayer} display={activeLayer == layer.index && buttonDisplayCheck() ? true : false}/>
                <EditButtonPanel functions={buttonPanelFunctions} parent={parent} display={activeLayer == layer.index && buttonDisplayCheck() ? true : false}/>
                {/* <ParameterPanel2 layerCoords={coords} parent={parent} /> */}
                {
                    // creates a div spanning the entire screen to catch the mousemove event to trigger the mouse movement
                    translating ?
                    <div className='Layer-Mouse-Umbrella T-Umbrella' onMouseMove={handleMouseTranslateMove} onMouseDown={endTranslate}></div> : null
                    
                }
                {
                    widthChanging ?
                    <div className='Layer-Mouse-Umbrella W-Umbrella' onMouseMove={handleMouseChangeWidth} onMouseDown={endChangeWidth}></div> : null
                }
                {
                    textSelecting ?
                    <div className='Layer-Mouse-Umbrella Text-Umbrella' onMouseMove={handleMouseChangeText} onMouseDown={handleTextMouseDown}></div> : null
                }
            </div>
        );
    } else {
        return;
    }
}

export default Layer;