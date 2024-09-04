let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let interval;
let isRunning = false;

const startStopBtn = document.getElementById('startStopBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const lapsList = document.getElementById('laps');

startStopBtn.addEventListener('click', function() {
    if (!isRunning) {
        startStopBtn.textContent = 'Pause';
        lapBtn.disabled = false;
        interval = setInterval(startStopwatch, 10);
        isRunning = true;
    } else {
        startStopBtn.textContent = 'Start';
        clearInterval(interval);
        isRunning = false;
    }
});

lapBtn.addEventListener('click', function() {
    addLap();
});

resetBtn.addEventListener('click', function() {
    clearInterval(interval);
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    isRunning = false;
    startStopBtn.textContent = 'Start';
    lapBtn.disabled = true;
    updateDisplay();
    clearLaps();
});

function startStopwatch() {
    milliseconds += 10;

    if (milliseconds === 1000) {
        milliseconds = 0;
        seconds += 1;
    }

    if (seconds === 60) {
        seconds = 0;
        minutes += 1;
    }

    updateDisplay();
}

function updateDisplay() {
    minutesDisplay.textContent = pad(minutes);
    secondsDisplay.textContent = pad(seconds);
    millisecondsDisplay.textContent = pad(Math.floor(milliseconds / 10));
}

function pad(value) {
    return value.toString().padStart(2, '0');
}

function addLap() {
    const lapTime = `${pad(minutes)}:${pad(seconds)}:${pad(Math.floor(milliseconds / 10))}`;
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime}`;
    lapsList.appendChild(lapItem);
}

function clearLaps() {
    lapsList.innerHTML = '';
}
