export default class Canvas {
    constructor(w, h) {
        this._canvas = document.createElement('canvas');
        this._canvas.setAttribute('width', w);
        this._canvas.setAttribute('height', h);
        
        this._ctx = this._canvas.getContext('2d');
    }

    drawPoint = (xyrc) => {
        const {x, y, r, color, angle} = xyrc;
       
        this._ctx.beginPath()
        this._ctx.arc(x, y, r, 0, Math.PI*2);
        this._ctx.fillStyle = color;
        this._ctx.fill();
        this._ctx.closePath();
        this._ctx.font = "20px Georgia";
        //this._ctx.fillText(angle, x -10 , y - r*1.75 );
    }
}