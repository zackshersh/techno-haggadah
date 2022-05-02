import React from 'react';

import "../styles/title.css"

function Title({display, titleDisplayOff}) {


    const hideTitle = () => {
        titleDisplayOff()
    }

    return (
        <div style={{display: display}} className='Title-Cont center'>
            <div className='Title center'>
                <h1>The<i>Techno</i>-Haggadah</h1>
                <div>
                    <p>The <b>Techno-Haggadah</b> is the next evolution of modern Jewish practice. Help to contribute to the creation of a completely digital, community-created Haggadah.</p>
                    <div className='Title-Buttons'>
                        <button onMouseDown={hideTitle}>Create Now!</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Title;