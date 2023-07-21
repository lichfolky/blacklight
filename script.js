const canvas = document.getElementById("scene");
const scoreEl = document.querySelector(".score");
const ctx = canvas?.getContext("2d");

let x = 0;
let y = 0;
let loadinglight = true;
let loadingdark = true;
const imgdark = new Image();
const imglight = new Image();
let mouseout = true;
let score = 0;
let pointsX = [22, 600, 800, 400, 615];
let pointsY = [420, 510, 370, 130, 145];
const tollerance = 20;


if (ctx) {
    scoreEl.textContent = score;
    canvas.addEventListener("mousemove", (event) => {
        const rect = canvas.getBoundingClientRect();
        x = event.clientX - rect.left;
        y = event.clientY - rect.top;

        for (let i = 0; i < pointsX.length; i++) {
            if (pointsX[i] <= x + tollerance && pointsX[i] >= x - tollerance) {
                if (pointsY[i] <= y + tollerance && pointsY[i] >= y - tollerance) {
                    score++;
                    pointsX.splice(i, 1);
                    pointsY.splice(i, 1);
                }
            }
        }
        scoreEl.textContent = score + " " + x + " " + y;

        mouseout = false;
    });

    canvas.addEventListener("mouseout", (event) => {
        mouseout = true;
    });

    imgdark.addEventListener(
        "load",
        () => loadingdark = false
    );
    imglight.addEventListener(
        "load",
        () => loadinglight = false
    );
    imgdark.src = "./img/darkroom.jpg";
    imglight.src = "./img/lightroom.jpg";
    drawdark();
}

function drawdark() {
    if (!loadingdark) {
        ctx.drawImage(imgdark, 0, 0, ctx.canvas.width, ctx.canvas.height);
    }
    requestAnimationFrame(drawlight);
}

function drawlight() {

    if (!loadingdark && !loadinglight && !mouseout) {
        ctx.drawImage(imgdark, 0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, 60, 0, Math.PI * 2, true);
        //ctx.createRadialGradient(x, y, 1, x, y, 50);
        ctx.clip();
        ctx.drawImage(imglight, 0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.restore();
    }
    requestAnimationFrame(drawlight);
}


