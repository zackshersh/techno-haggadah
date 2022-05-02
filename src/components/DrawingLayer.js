import React, { useEffect, useRef, useState } from 'react';
import { CanvasManager } from '../scripts/canvas';
import { currentKeys } from '../scripts/keyInputs';
import { getPage, setPage } from '../scripts/storage';
import { wait } from '../scripts/utils';

function DrawingLayer({freshLayers, setFreshLayers, pageNumber, clickableState, mouseMode}) {

    const parent = useRef(null);
    const canvas = useRef(null);

    const {drawingClickable, setDrawingClickable} = clickableState;
    // console.log(canvas)

    // const [mouse, setMouse] = useState({x: 0, y: 0});
    const [mouseIsDown, setMouseIsDown] = useState(false);

    const [initialBoot, setInitialBoot] = useState(true);

    // const [mouseMode, setMouseMode] = useState('paint');

    const [manager, setManager] = useState(new CanvasManager());
    const [brushSize, setBrushSize] = useState(1);

    useEffect(() => {
        if(!manager.canvas){
            console.log(manager.canvas);
            manager.setCanvas(canvas.current);
        }

        manager.triggerRender()

        if(initialBoot){
            initFromStorage()
            setInitialBoot(false)
        }
    });



    const initFromStorage = async () => {
        let page = getPage(pageNumber);
        manager.drawingLayer = page.drawingLayer;
        // console.log(page.drawingLayer)
    }


    const saveDrawingLayer = () => {
        const page = getPage(pageNumber);
        // console.log(page)
        // console.log(manager.drawingLayer)
        page.drawingLayer = manager.drawingLayer;
        setPage(pageNumber, page);
    }


    const handleMouseDown = (e) => {

        setMouseIsDown(true)
        handleCanvasInput(e, true)
    }

    const handleMouseUp = () => {
        setMouseIsDown(false);

        saveDrawingLayer();
    }

    const handleMouseMove = (e) => {
        handleCanvasInput(e)
    }

    const handleMouseOut = () => {
        setMouseIsDown(false);
    }

    const handleCanvasInput = (e, autodown) => {

        let brush;
        if(currentKeys["Shift"]){
            brush = brushSize+1
        } else {
            brush = brushSize
        }

        const options = {
            brushSize: brush
        };

        let down;
        if(mouseIsDown || autodown){
            down = true;
        }

        manager.mouseInput(e, mouseMode, options, down);
    }

    const cursorClass = () => {
        if(mouseMode == 'paint'){
            return 'Paint-Cursor'
        } else if (mouseMode == 'erase'){
            return 'Erase-Cursor'
        }
    }



    return (
        <div ref={parent} style={{pointerEvents: drawingClickable ? "auto" : "none"}} className={`Drawing-Layer ` + cursorClass()}>
            <canvas ref={canvas} onMouseMove={handleMouseMove} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseOut={handleMouseOut} width={500} height={600}></canvas>
        </div>
    );
}

export default DrawingLayer;