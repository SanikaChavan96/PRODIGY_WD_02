// Variables to store time and state
let startTime;
let running = false;
let lapTimes = [];

// DOM elements
const display = document.getElementById("display");
const startPauseButton = document.getElementById("startPause");
const lapButton = document.getElementById("lap");
const resetButton = document.getElementById("reset");
const lapList = document.getElementById("lapList");

// Function to update the display
function updateDisplay() {
    const currentTime = new Date().getTime();
    const elapsedTime = running ? currentTime - startTime : 0;
    const formattedTime = formatTime(elapsedTime);
    display.textContent = formattedTime;
}

// Function to format time as HH:MM:SS
function formatTime(time) {
    const date = new Date(time);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
}

// Event listener for start/pause button
startPauseButton.addEventListener("click", function () {
    if (!running) {
        running = true;
        startTime = new Date().getTime() - (lapTimes.reduce((a, b) => a + b, 0) || 0);
        startPauseButton.textContent = "Pause";
        lapButton.textContent = "Lap";
        lapButton.disabled = false;
    } else {
        running = false;
        lapButton.textContent = "Reset Lap";
        startPauseButton.textContent = "Resume";
    }
});

// Event listener for lap button
lapButton.addEventListener("click", function () {
    if (running) {
        const lapTime = new Date().getTime() - startTime;
        lapTimes.push(lapTime);
        const formattedLapTime = formatTime(lapTime);
        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${lapTimes.length}: ${formattedLapTime}`;
        lapList.appendChild(lapItem);
    } else {
        lapTimes = [];
        lapList.innerHTML = "";
        display.textContent = "00:00:00";
    }
});

// Event listener for reset button
resetButton.addEventListener("click", function () {
    running = false;
    lapTimes = [];
    lapList.innerHTML = "";
    display.textContent = "00:00:00";
    startPauseButton.textContent = "Start";
    lapButton.textContent = "Lap";
    lapButton.disabled = true;
});

// Update the display every 100 milliseconds
setInterval(updateDisplay, 100);
