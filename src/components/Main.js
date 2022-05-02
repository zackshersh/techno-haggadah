
import React, { useEffect, useState } from 'react';
import { addKeyListeners } from '../scripts/keyInputs';
import Editor from './Editor';

import Page from './Page';
import Title from './Title';

function Main() {

    const [display, setDisplay] = useState('none');

    const [firstBoot, setFirstBoot] = useState(true);

    useEffect(() => {
        initTitleDisplay()

        if(firstBoot){
            addKeyListeners();
            setFirstBoot(false);
        }
    })

    const titleDisplayOn = () => {
        setDisplay('flex');
        toggleDisplay('flex')
    }

    const titleDisplayOff = () => {
        setDisplay('none');
        toggleDisplay('none')
    }

    const toggleDisplay = (state) => {
        localStorage.setItem('titleDisplay', state);
    }

    const initTitleDisplay = () => {
        let state = localStorage.getItem('titleDisplay');
        if(!state){
            setDisplay('flex');
        } else {
            setDisplay(state);
        }
        console.log(state);
    }

    return (
        <div className='Main'>
            <Title display={display} titleDisplayOff={titleDisplayOff}/>
            <Editor titleDisplayOn={titleDisplayOn} />
        </div>
    );
}

export default Main;