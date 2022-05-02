import React from 'react';

import { textDB } from '../scripts/elementData';

function TextLayer({textSectionState, layer, freshLayer, textStartState, textLengthState, textSelecting, fontState, fontSizeState}) {

    // checks if contentID is null, if so gives placeholder box, otherwise gives p elements
    const evalTextSection = () => {
        if(freshLayer.contentID !== null){
            let textSections = textDB[textSectionState].map((section,i) => evalSectionStrings(section,i))
            return textSections;
        } else {
            return <div className='Text-Placeholder'></div>
        }
    }


    const textStyle = {
        fontFamily: fontState,
        fontSize: fontSizeState + "px"
    }

        
        // checks for styling flags
    const evalSectionStrings = (string, i) => {

        let splitString = string.split('~');

        if(i < textStartState || i >= textStartState+textLengthState){
            return;
        }

        if(splitString.length > 1){

            switch(splitString[0]){
                case 'BU':
                    return <p style={textStyle} className='BU-Text' key={i}>{splitString[1]}</p>
                case 'B':
                    return <p style={textStyle}  className='B-Text' key={i}>{splitString[1]}</p>
                case 'I':
                    return <p style={textStyle} className='I-Text' key={i}>{splitString[1]}</p>
                default:
                    return <p style={textStyle}  key={i}>{splitString[1]}</p>

            }

        } else {
            return <p style={textStyle} className="N-Text" key={i}>{string}</p>
        }

    }

    return (
        <div className='Type-Specific-Layer'>
            {
                // checks if contentID is null and returns gray placeholder, or returns correctText
                evalTextSection()
            }
        </div>
    );
}

export default TextLayer;