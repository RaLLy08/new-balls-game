import Canvas from "../Canvas";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../consts/canvas-consts";


export default class View { 
    constructor() {
        this.canvasClass = new Canvas(CANVAS_WIDTH, CANVAS_HEIGHT);
        this._ctx =  this.canvasClass._ctx;
        this._canvas =  this.canvasClass._canvas;
        this._root = document.getElementById('root');
        const canvasWrapper = document.createElement('div');

        this._canvas.style.border = "thick solid #0000FF";
        canvasWrapper.append(this._canvas)
        this._root.append(canvasWrapper);
    }

    onClick = (cb) => {
        this._canvas.onclick = (e) => {
            const { layerX, layerY } = e;

            cb(layerX, layerY);
        }
    }

    onDown = (cb) => {
        this._canvas.onmousedown = (e) => {
            const { layerX, layerY } = e;

            cb(layerX, layerY);
        }
    }
    
    onMove = (cb) => {
        this._canvas.onmousemove = (e) => {
            const { layerX, layerY } = e;

            cb(layerX, layerY);
        }
    }

    onUp = (cb) => {
        this._canvas.onmouseup = (e) => {
            const { layerX, layerY } = e;

            cb(layerX, layerY);
        }
    }

    onLeave = (cb) => {
        this._canvas.onmouseleave = (e) => {
            const { layerX, layerY } = e;

            cb(layerX, layerY);
        }
    }
    
    drawPoint = (xyrc) => {
        this.canvasClass.drawPoint(xyrc);
    }
    
    clearCanvas = () => {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

}