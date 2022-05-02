import { lerp } from "./utils";

export const drawingPixelCount = 150;
export class CanvasManager {
    constructor(){
        this.canvas = null;
        this.ctx = null;

        
        this.w = 500;
        this.h = 600;
        
        this.superPixels = drawingPixelCount; // number of superpixels per side
        
        this.drawingLayer = null;
        this.cursorLayer = {
            x: 0,
            y: 0,
            size: 0
        }
        
        this.renderer = new Renderer(this.h);

        this.lastMouseInput = {
            x: 0,
            y: 0
        }

    }


    setCanvas(canvas){
        if(!this.canvas){
            console.log('INITALIZING CANVAS STUFF')
            this.canvas = canvas;
            this.canvas.width = this.w;
            this.canvas.height = this.h;

            this.ctx = this.canvas.getContext('2d');


            this.drawingLayer = this.drawingLayerMatrixInit();
            this.superPixelWH = this.h/this.superPixels;

            this.renderer.canvas = this.canvas;
            this.renderer.ctx = this.ctx;

            this.renderer.superPixels = this.superPixels;
            this.renderer.superPixelWH = this.superPixelWH;
        }


    }

    drawingLayerMatrixInit(){

        let matrix = [];

        for(let x=0; x<this.superPixels; x++){

            let row = []

            for(let y=0; y<this.superPixels; y++){
                row.push(0)
            }

            matrix.push(row);
        }

        return matrix;


    }
    
    mouseInput(e, mode, options, mouseIsDown){
        let mouse = {
            x: e.clientX,
            y: e.clientY
        };

        mouse = this.normalizeMouse(mouse);
        mouse = {
            x: Math.floor(mouse.x),
            y: Math.floor(mouse.y)
        }
        // console.log(mouse)



        switch(mode){
            case 'paint':
                this.paint(mouse, options.brushSize, false, mouseIsDown);
                break;
                // console.log('paint)
            case 'erase':
                this.paint(mouse, options.brushSize+1, true, mouseIsDown);
                break;
        }

        if(mouseIsDown){
            this.renderer.render({
                drawing: this.drawingLayer,
            })
        }

        // this.renderer.renderCursor(mouse, options.brushSize);

        this.lastMouseInput = mouse;

    }

    paint(mouse, brushSize, erase, mouseIsDown){

        if(mouseIsDown){
            let distFromLast = Math.hypot((mouse.x-this.lastMouseInput.x),(mouse.y-this.lastMouseInput.y));
            // console.log(distFromLast);

            let steps = Math.floor(distFromLast/(((brushSize-1)*2)+1))+1
            // console.log(steps)

            for(var i=1; i<steps+1; i++){
                let t = i/steps;
                let x1 = Math.floor(lerp(mouse.x, this.lastMouseInput.x, t));
                let y1 = Math.floor(lerp(mouse.y, this.lastMouseInput.y, t));
                // console.log(x,y)

                let sPixelCoords = {
                    x: Math.floor(x1/this.superPixelWH),
                    y: Math.floor(y1/this.superPixelWH)
                }
        
                let size = brushSize - 1; // with a size of one, you just want the super pixel being directly affected by the brush so you only want to extend 0  super pixels from main super pixel, so a size of 2 you go out 1 super pixel
        
                let brushRect = {
                    cornerX: sPixelCoords.x - size,
                    cornerY: sPixelCoords.y - size,
                    w: (size*2)+1,
                    h: (size*2)+1
                }
        
                let br = brushRect;
        
                for(let x=br.cornerX; x<br.cornerX+br.w; x++){
                    for(let y=br.cornerY; y<br.cornerY+br.h; y++){
        
                        if(x > this.superPixels-1 || y > this.superPixels-1 || y < 0 || x < 0){
                            return
                        }
        
                        if(!erase){
                            this.drawingLayer[x][y] = 1;
                        } else {
                            this.drawingLayer[x][y] = 0;
        
                        }
                    }
                }

            }
    
        }

        // console.log(this.drawingLayer)

    }

    triggerRender(){
        this.renderer.render({
            drawing: this.drawingLayer,
        })
    }




    normalizeMouse(mouse){
        let rect = this.canvas.getBoundingClientRect();

        mouse.x = mouse.x - rect.x;
        mouse.y = mouse.y - rect.y;

        return mouse;
    }

    
}



class Renderer{
    constructor(size){
        this.w = size;
        this.h = size;

        this.superPixels = null;
        this.superPixelWH = null;
        
        this.canvas = null;
        this.ctx = null;
    }

    render(layers){
        this.ctx.clearRect(0,0,this.w,this.h);
        this.renderDrawingLayer(layers.drawing);
    }

    renderCursor(mouse, brushSize){

        mouse = {
            x: Math.floor(mouse.x/this.superPixelWH),
            y: Math.floor(mouse.y/this.superPixelWH)
        }

        // mouse.x -= brushSize;
        // mouse.y -= brushSize;

        let x = mouse.x * this.superPixelWH;
        let y = mouse.y * this.superPixelWH;

        let brushSideLength = (brushSize*2)+2;

        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = "red";
        this.ctx.rect(x,y,brushSideLength,brushSideLength);
        this.ctx.stroke();
        this.ctx.closePath();
        console.log(mouse)
    }

    renderDrawingLayer(drawing){
        // console.log(drawing)
        // console.log(this.superPixels, this.superPixelWH)
        if(drawing){
            drawing.forEach((row, y) => {
                row.forEach((column, x) => {
    
                    if(drawing[x][y]){
                        // console.log('filling')
                        this.fillSquare(x,y)
                    }
                })
            })

        }
    }

    fillSquare(x,y){
        let wh = this.superPixelWH;

        this.ctx.beginPath();
        this.ctx.fillRect(x*wh, y*wh, wh, wh);
        this.ctx.closePath();
    }
}