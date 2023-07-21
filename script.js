const canvas = document.getElementById("scene");
const scoreEl = document.querySelector(".score");
const ctx = canvas?.getContext("2d");

let mouseX = 0;
let mouseY = 0;
let loadinglight = true;
let loadingdark = true;
const imgdark = new Image();
const imglight = new Image();
let mouseout = true;
let score = 0;
let pointsX = [22, 600, 800, 400, 615];
let pointsY = [420, 510, 370, 130, 145];
let foundX = [];
let foundY = [];


const tollerance = 20;


if (ctx) {
    scoreEl.innerHTML = "<p>" + score + "/5</p>";
    canvas.addEventListener("mousemove", (event) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = event.clientX - rect.left;
        mouseY = event.clientY - rect.top;
        for (let i = 0; i < pointsX.length; i++) {
            if (pointsX[i] <= mouseX + tollerance && pointsX[i] >= mouseX - tollerance) {
                if (pointsY[i] <= mouseY + tollerance && pointsY[i] >= mouseY - tollerance) {
                    score++;
                    foundX.push(pointsX.splice(i, 1));
                    foundY.push(pointsY.splice(i, 1));
                }
            }
        }

        if (score == 5) {
            scoreEl.innerHTML = "You won!";
        } else {
            scoreEl.innerHTML = "<p>" + score + "/5</p>";
        }
        scoreEl.innerHTML += "<p>" + mouseX + " " + mouseY + "</p>";

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
    drawlight();
}

function drawlight() {
    if (!loadingdark && !loadinglight) {
        ctx.drawImage(imgdark, 0, 0, ctx.canvas.width, ctx.canvas.height);
        if (!mouseout) {
            drawDot(mouseX, mouseY, 60);
            //ctx.createRadialGradient(x, y, 1, x, y, 50);
        }
        for (let i = 0; i < foundX.length; i++) {
            drawDot(foundX[i], foundY[i], 60);
        }
    }
    requestAnimationFrame(drawlight);
}


function drawDot(x, y, size) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2, true);
    ctx.clip();
    ctx.drawImage(imglight, 0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.restore();
}

