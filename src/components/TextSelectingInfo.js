import React from 'react';
import { textDB } from '../scripts/elementData';

function TextSelectingInfo({section, start, length, textSelecting}) {


    // checks if section is null
    const validSection = (section) => {
        // console.log(section != null)
        return section != null;
    }

    const generateInstruction = () => {
        switch(textSelecting){
            case 1:
                return <div>
                        <p className='T-Instruction'>CLICK TO <u>SELECT PASSAGE:</u></p>
                        <p>"{textDB[section][0].split('~')[1]}" from line __ to __</p>
                    </div>
                break;
            case 2:
                return <div>
                        <p className='T-Instruction'>CLICK TO SELECT START POINT:</p>
                        <p>"{textDB[section][0].split('~')[1]}" from line {start} to __</p>
                    </div>
                break;
            case 3:
                return <div>
                        <p className='T-Instruction'>CLICK TO SELECT LENGTH:</p>
                        <p>"{textDB[section][0].split('~')[1]}" from line {start} to {start+length-1}</p>
                    </div>
                break;

        }
    }

    return (
        <div className='Text-Selecting-Info'>
            {validSection(section) ? 
                generateInstruction():
                null
            }


        </div>
    );
}

export default TextSelectingInfo;