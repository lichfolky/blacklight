const canvas = document.getElementById("scene");
const scoreEl = document.querySelector(".score");
const ctx = canvas?.getContext("2d");
const imageSizeX = 900;
const imageSizeY = 600;

let coursorX = 0;
let coursorY = 0;
let positionX = 0;
let positionY = 0;


positionX;
let cursorSize = 60;
let mouseout = true;
const coursorTollerance = 1;

let loadinglight = true;
let loadingdark = true;
const imgdark = new Image();
const imglight = new Image();

let score = 0;

// Points to find
let pointsX = [2, 44, 68, 89, 66];
let pointsY = [70, 22, 25, 62, 85];
let poinstToFind = pointsX.length;
let foundX = [];
let foundY = [];



if (ctx) {
    /*
    for fullscreen
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
    */

    // Screen resize and mantain aspect ratio
    canvas.height = canvas.clientHeight;
    canvas.width = (canvas.height / imageSizeX) * imageSizeY;

    const observer = new ResizeObserver((entries) => {
        canvas.height = canvas.clientHeight;
        canvas.width = (canvas.height / imageSizeY) * imageSizeX;
    });
    observer.observe(canvas);

    // Touch update cursor
    canvas.addEventListener("touchstart", (event) => {
        updatePosition(Math.round(event.touches[0].clientX), Math.round(event.touches[0].clientY));
    }, { passive: true });
    canvas.addEventListener("touchmove", (event) => {
        updatePosition(Math.round(event.touches[0].clientX), Math.round(event.touches[0].clientY));
    }, { passive: true });
    canvas.addEventListener("touchend", (event) => {
        mouseout = true;
    });

    // Mouse update cursor
    canvas.addEventListener("mousemove", (event) => {
        updatePosition(Math.round(event.clientX), Math.round(event.clientY));
    });

    canvas.addEventListener("mouseout", (event) => {
        mouseout = true;
    });

    // Load images
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
    // Update score
    if (score == poinstToFind) {
        scoreEl.innerHTML = "You won!";
    } else {
        scoreEl.innerHTML = "<p>" + score + "/5  (" + coursorX + ", " + coursorY + ") (" + positionX + ", " + positionY + ")</p>";
        mouseout = false;
    }
    if (!loadingdark && !loadinglight) {
        // Print background image
        ctx.drawImage(imgdark, 0, 0, ctx.canvas.width, ctx.canvas.height);
        if (!mouseout) {
            // Print cursor dot
            drawDot(coursorX, coursorY, cursorSize);
            //ctx.createRadialGradient(x, y, 1, x, y, 50);
        }
        // Print found locations
        for (let i = 0; i < foundX.length; i++) {
            drawDot(foundX[i], foundY[i], cursorSize);
        }
    }
    requestAnimationFrame(drawlight);
}


// Print a dot clipping the imgLigth image
function drawDot(x, y, size) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2, true);
    ctx.clip();
    ctx.drawImage(imglight, 0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.restore();
}

// Update cursor position, and check if a point is found
function updatePosition(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    coursorX = Math.round(clientX - rect.left);
    coursorY = Math.round(clientY - rect.top);

    positionX = Math.round((coursorX / imageSizeX) * 100);
    positionY = Math.round((coursorY / imageSizeY) * 100);
    for (let i = 0; i < pointsX.length; i++) {
        if (pointsX[i] <= positionX + coursorTollerance && pointsX[i] >= positionX - coursorTollerance) {
            if (pointsY[i] <= positionY + coursorTollerance && pointsY[i] >= positionY - coursorTollerance) {
                score++;
                pointsX.splice(i, 1);
                pointsY.splice(i, 1);
                foundX.push(coursorX);
                foundY.push(coursorY);
            }
        }
    }
}