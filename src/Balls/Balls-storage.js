export class Balls {
    constructor() {
        this._balls = [];
    }
    
    getBalls = () => [...this._balls]

    addBall = (ball) => this._balls.push(ball);


    clearBalls = () => this._balls = [];
}