const canvas = document.getElementById("scene");
const ctx = canvas?.getContext("2d");

let x = 0;
let y = 0;
let loadinglight = true;
let loadingdark = true;
let imgdark = new Image();
let imglight = new Image();
let mouseout = true;

if (ctx) {
    canvas.addEventListener("mousemove", (event) => {
        const rect = canvas.getBoundingClientRect();
        x = event.clientX - rect.left;
        y = event.clientY - rect.top;
        mouseout = false;
    });

    canvas.addEventListener("mouseout", (event) => {
        mouseout = true;

    });

    imgdark.addEventListener(
        "load",
        () => {
            loadingdark = false;
        }
    );
    imglight.addEventListener(
        "load",
        () => {
            loadinglight = false;
        }
    );
    imgdark.src = "img/darkroom.jpg";
    imglight.src = "img/lightroom.jpg";
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
        //ctx.clip();
        ctx.restore();


    }
    requestAnimationFrame(drawlight);
}


