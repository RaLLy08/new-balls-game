import { view } from '../View/index.js';
import { Ball } from './Ball';
import { balls } from '../Balls/index.js';


export default class BallsEngine {
    constructor() {

        window.balls = balls
        
        view.onClick(this.setBall);
        view.onDown(this.pressed);
        view.onUp(this.up);
        view.onLeave(this.up);
        //view.onMove(this.forcedMove)
        // view.onUp(this.moving)
        this.isPressed = false;

        window.requestAnimationFrame(this.animate)
    }
    pressed = () => this.isPressed = true;

    up = () => this.isPressed = false;
 
    forcedMove = (x, y) => {
        if (this.isPressed) {
            const arr = balls.getBalls();

            arr.forEach(el => {
                if ((this.distance(x, y, el.x, el.y) - (el.r)) < 0) {
                    el.v = 0;
                    el.x = x;
                    el.y = y;
                }
            });
        };
    };

    setBall = (x, y) => {
        const ball = Ball(x, y);

        this.checkClickAbroad(ball)

        balls.addBall(ball);
        
    }

    animate = () => {
        view.clearCanvas();
     
        let arr = balls.getBalls();
        
        arr.forEach((ball) => {
            this.isCrossed(ball, arr);
            this.ballMove(ball);
            this.reboundWalls(ball)
            // let x_v = Math.sin(ball.angle)*ball.v;
            // let y_v = Math.cos(ball.angle)*ball.v;
            // console.log(x_BallVelocity, y_BallVelocity);
            // console.log(ball);
            //console.log(ball.angle);
   
            //console.log(this.getQuarter(ball.angle));
            view.drawPoint(ball);
        });
        window.requestAnimationFrame(this.animate)
    }

    checkClickAbroad = (ball) => {
        let w = view._canvas.width;
        let h = view._canvas.height;
    
        if (ball.x < ball.r) {
            ball.x += ball.r;
        } 
        if (w - ball.x < ball.r) {
            ball.x -= ball.r;
        } 
        if (ball.y < ball.r) {
            ball.y += ball.r;
        } 
        if (h - ball.y < ball.r) {
            ball.y -= ball.r;
        } 
    }

    ballMove = (ball) => {
        ball.angle = this.angleToRange(ball.angle);

        const vCoef = 0.02;
        const x_v = Math.cos(ball.angle * Math.PI / 180) * ball.v * vCoef;
        const y_v = Math.sin(ball.angle * Math.PI / 180) * ball.v * vCoef;
        ball.x += x_v;
        ball.y += y_v; 
    }

    // gravityOn = (balls) => {
    //     balls.forEach(element => {
    //         element.
    //     });
    // }

    isCrossed = (ball, balls) => {
        balls.forEach(el => {
            if (ball.id !== el.id) {
                //console.log(Math.floor(this.distance(ball.x, ball.y, el.x, el.y) - (ball.r + el.r)))
                if ((Math.floor(this.distance(ball.x, ball.y, el.x, el.y) - (ball.r + el.r))) < 0 ) {
                    let centersDist = ball.r + el.r; 
                    //let collisionAngle = (ball.angle - el.angle);
                    // let x_BallVelocity = Math.sin(ball.angle)*ball.v;
                    // let y_BallVelocity = Math.cos(ball.angle)*ball.v;
                    const cos_b = (ball.x - el.x) / centersDist;
                    const sin_a = (ball.y - el.y) / centersDist;
                    const tg_ab = sin_a / cos_b;
                    let collisionAngle = Math.atan(tg_ab)* (180/Math.PI);
                    if (!cos_b) collisionAngle = 0;
                    if (!sin_a) collisionAngle = 0;
                    // el.angle = collisionAngle;
                    // ball.angle = -collisionAngle;
                    
                    const e = el.angle;
                    const b = ball.angle; 
                    const ev = el.v;
                    const bv = ball.v;
                    //console.log((ball.x - el.x) / centersDist, (ball.y - el.y), '------',collisionAngle);
                    el.angle = b + collisionAngle;
                    ball.angle = e + collisionAngle;
                }
            }
        });
    }

    reboundWalls = (ball) => {
        const w = view._canvas.width;
        const h = view._canvas.height;

        if(ball.x + ball.r > w || ball.x < ball.r) {  
            ball.angle = 180 - ball.angle;
        } 
        if (ball.y + ball.r > h || ball.y < ball.r) {
            ball.angle = 360 - ball.angle;
            
        }
    }

    getQuarter = (angle) => {
        if ((90 > angle) && (angle >= 0)) return 1;
        if ((180 > angle) && (angle >= 90)) return 2;
        if ((270 > angle) && (angle >= 180)) return 3;
        if ((360 > angle) && (angle >= 270)) return 4;
        if (angle === 360) return 1;
        return NaN;
    }
    //0-360
    angleToRange = (angle) => {
        angle %= 360;
        if (angle < 0) angle += 360;
        return angle;
    }

    distance = (x1, y1, x2, y2) => Math.sqrt((Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2)));

}