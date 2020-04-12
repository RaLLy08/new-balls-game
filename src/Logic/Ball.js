export const Ball = (x, y, v=140, r=50, angle=90) => ({
    x,
    y,
    r,
    v,
    x_v: Math.sin(angle) * v,
    y_v: Math.cos(angle) * v,
    angle,
    color: randomColor(),
    id: setId(),
    gravity: 10,
});

let k = 0;
const setId = () => k += 1;

const randomColor =  () => {
    let allowed = "ABCDEF0123456789", S = "#";

    while (S.length < 7) {
        S += allowed.charAt(Math.floor((Math.random() * 16) + 1));
    }

    return S;
}

const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

