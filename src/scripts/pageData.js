import { drawingPixelCount } from "./canvas";

export class PageData{
    constructor(num){
        this.num = num;
        this.layers = [];
        this.drawingLayer = drawingLayerMatrixInit(drawingPixelCount);
    }
}

function drawingLayerMatrixInit(superPixels){

    let matrix = [];

    for(let x=0; x<superPixels; x++){

        let row = []

        for(let y=0; y<superPixels; y++){
            row.push(0)
        }

        matrix.push(row);
    }

    return matrix;


}

// console.log(drawingLayerMatrixInit(200))