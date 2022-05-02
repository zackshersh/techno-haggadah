
import React, {useState, useRef} from 'react';
import { TextElement, ImageElement } from '../scripts/elementClasses';
import { textDB } from '../scripts/elementData';
import { PageData } from '../scripts/pageData';
import { getPage, setPage } from '../scripts/storage';

import "../styles/page.css"
import DrawingLayer from './DrawingLayer';
import Layer from './Layer';

function Page({num, layers, mouseMode, drawingState}) {

    const pageElem = useRef(null);

    const [freshLayers, setFreshLayers] = useState(layers);
    const [activeLayer, setActiveLayer] = useState(null);



    // after certain actions timer is started preventing clicks so that items aren't placed right after activeLayer is set to null
    const [clickAllowed, setClickAllowed] = useState(true);
    const preventClickTimer = () => {

        setClickAllowed(false);
        setTimeout(() => {
            setClickAllowed(true);
        }, 300)
    }

    const [mouse, setMouse] = useState({
        x: 0,
        y: 0,
        lastX: 0,
        lastY: 0
    })


    // LAYER LOGIC

    const updateLayer = (layer) => {
        let layers = [...freshLayers];
        layers[layer.index] = layer;

        const page = getPage(num);
        page.layers = layers;
        
        setPage(num, page);
        setFreshLayers(layers);

    }

    const updateLayerStorage = (page) => {
        setPage(num, page);
        setFreshLayers(page.layers);
    }

    // GENERATING LAYERS FROM STORAGE

    const generateLayer = (layer) => {
        // if(layer.visible){
            switch(layer.type){
                case "text":
                    return generateText(layer);
                case "image":
                    return generateText(layer);
            }
        // }

    }

    const generateText = (layer) => {

        return <Layer activeLayer={activeLayer} setActive={setActiveLayer} layer={layer} updateSelfInStorage={updateLayer} key={layer.index} mouse={mouse} preventClickTimer={preventClickTimer}/>

    }


    // INPUT STUFF

    const handleMouseUp = (e) => { // <- done as mouse up so that activeLayer has time to change state
        switch(mouseMode){
            case 'placeText':
                addLayer(e, mouseMode);
            case 'placeImage':
                addLayer(e, mouseMode);
        }
    }

    const handleMouseMove = (e) => {

        let contentRect = document.querySelector('.Page-Content').getBoundingClientRect();

        let x,y;
        x = e.clientX - contentRect.x;
        y = e.clientY - contentRect.y;

        let lastX, lastY;
        lastX = mouse.x;
        lastY = mouse.y;

        setMouse({
            x: x,
            y: y,
            lastX: lastX,
            lastY: lastY,
            xDif: x-lastX,
            yDif: y-lastY
        })
    }


    // ADDING NEW LAYERS

    const addLayer = (e, mouseMode) => {
        if(activeLayer != null || !clickAllowed){
            return;
        }

        console.log(activeLayer)
        let pageRect = pageElem.current.getBoundingClientRect();
        console.log(pageRect)
        let relCoords = {
            x: e.clientX - pageRect.x,
            y: e.clientY - pageRect.y
        }

        //amount moved left and up so placed closer to cursor
        let offset = 20;
        relCoords.x -= offset;
        relCoords.y -= offset;


        switch(mouseMode){
            case 'placeText':
                console.log('TEXT PLACE')
                let textLayer = new TextElement(relCoords.x,relCoords.y,freshLayers.length, num);
                console.log(textLayer)
                updateLayer(textLayer);
                break;
            case 'placeImage':
                console.log('IMAGE PLACE')
                let imageLayer = new ImageElement(relCoords.x,relCoords.y,freshLayers.length, num);
                console.log(imageLayer);
                updateLayer(imageLayer)
                break;
        }

    }



    return (
        <div ref={pageElem} className='Page'>
            <div onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} className='Page-Content'>
                {
                    freshLayers.map(layer => generateLayer(layer))
                }
                <DrawingLayer clickableState={drawingState} freshLayers={freshLayers} setFreshLayers={setFreshLayers} pageNumber={num} mouseMode={mouseMode}/>
            </div>
            <div className='Page-Footer'>
                <p>The Techno-Haggadah</p>
                <p>Page {num+1}</p>
            </div>
        </div>
    );
}

export default Page;