const btnStart = document.querySelector("button[data-start]");
const btnStop = document.querySelector("button[data-stop]");
let coloringSet = null;
btnStop.disabled = true;

btnStart.addEventListener("click", changeColorBody);
btnStop.addEventListener("click", stopColoring);

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function changeColorBody() {
    btnStop.disabled = false;
    btnStart.disabled = true;

    coloringSet = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);

}

function stopColoring() {

    btnStart.disabled = false;
    btnStop.disabled = true;
    clearInterval(coloringSet);
}