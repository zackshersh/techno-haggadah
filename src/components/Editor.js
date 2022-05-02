
import React, { createContext, useEffect, useState } from 'react';
import { addPage, getPage, getPages, initStorage, setPage, updatePage } from '../scripts/storage';
import Page from './Page';
import ToolPanel from './ToolPanel';
import ParameterPanel from './ParameterPanel';

import "../styles/editor.css"
import { CanvasManager } from '../scripts/canvas';
import { wait } from '../scripts/utils';

export let LayerContext = createContext();

function Editor({titleDisplayOn}) {
    
    
    initStorage();
    const getCurrentPage = () => {
        if(localStorage.getItem('currentPage')){
            let page = JSON.parse(localStorage.getItem('currentPage'))
            return page;
        } else {
            return 0;
        }
    }
    
    const [currentLayerData, setCurrentLayerData] = useState(null);


    const [currentPage, setCurrentPage] = useState(getCurrentPage());
    const [currentPageData, setCurrentPageData] = useState(getPages()[currentPage]);

    const [mouseMode, setMouseMode] = useState(null);

    const [drawingClickable, setDrawingClickable] = useState(false);

    const drawingState = {
        drawingClickable: drawingClickable,
        setDrawingClickable: setDrawingClickable
    }


    // misc 


    // input

    const pageBack = () => {
        let nextPage = currentPage - 1;
        if(nextPage < 0){
            nextPage = getPages().length-1
        }
        setCurrentPage(nextPage)


        localStorage.setItem('currentPage', nextPage)
    }

    const pageForward = () => {
        let nextPage = currentPage + 1;
        if(nextPage >= getPages().length){
            addPage();
        }

        setCurrentPage(nextPage)

        localStorage.setItem('currentPage', nextPage)
    }

    // tool handlers

    const placeText = () => {
        setMouseMode('placeText');
        console.log(mouseMode)
        setDrawingClickable(false)
    }
    
    const placeImage = () => {
        setMouseMode('placeImage')
        console.log(mouseMode)
        setDrawingClickable(false)
    }

    const startDraw = () => {
        setMouseMode('paint')
        setDrawingClickable(true)
    }
    
    const startErase = () => {
        setMouseMode('erase')
        setDrawingClickable(true)
    }

    const cancelTool = () => {
        setMouseMode(null)
        setDrawingClickable(false)
    }

    const clearPage = async () => {
        let page = getPage(currentPage);
        page.layers = [];
        page.drawingLayer = new CanvasManager().drawingLayerMatrixInit();
        setPage(currentPage, page);

        wait(50);
        window.location.reload(false);
    }


    const toolPanelFunctions = {
        placeText: placeText,
        placeImage: placeImage,
        startDraw: startDraw,
        startErase: startErase,
        cancelTool: cancelTool,
        clearPage: clearPage
    }

    return (
        <LayerContext.Provider value={[currentLayerData, setCurrentLayerData]}>
            <button className='Home-Button' onMouseDown={titleDisplayOn}><h3>The <i>Techno</i>-Haggadah</h3></button>
            <div className='Editor center'>
                <button className='Nav-Arrow' onMouseDown={pageBack}>{`<`}</button>
                <ToolPanel currentTool={mouseMode} functions={toolPanelFunctions} />
                <div className='Page-Cont'>
                    {/* {
                        getPages().map(page => <Page num={page.num} layers={page.layers} key={page.num}/>)
                    } */}
                    <Page drawingState={drawingState} mouseMode={mouseMode} num={getPage(currentPage).num} layers={getPage(currentPage).layers} key={getPage(currentPage).num} />
                </div> 
                <ParameterPanel currentLayerData={currentLayerData} />
                <button className='Nav-Arrow' onMouseDown={pageForward}>{`>`}</button>
            </div>
        </LayerContext.Provider>
    );
}

export default Editor;