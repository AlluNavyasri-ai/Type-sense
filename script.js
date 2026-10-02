const typingBox = document.getElementById("typingBox");
const startButton = document.getElementById("startButton");

const timer = document.getElementById("timer");
const wpm = document.getElementById("wpm");
const accuracy = document.getElementById("accuracy");

const text = document.getElementById("paragraph").textContent.trim();

let seconds = 30;
let interval;
let started = false;

typingBox.disabled = true;

startButton.onclick = function () {

    clearInterval(interval);

    seconds = 30;
    timer.textContent = seconds;
    wpm.textContent = 0;
    accuracy.textContent = 100;

    typingBox.value = "";
    typingBox.disabled = false;
    typingBox.focus();

    started = true;
    startButton.disabled = true;

    interval = setInterval(function () {

        seconds--;
        timer.textContent = seconds;

        if (seconds <= 0) {
            finishTest();
        }

    }, 1000);
};


typingBox.oninput = function () {

    if (!started) return;

    const typed = typingBox.value;

    let correct = 0;
    let errors = 0;

    for (let i = 0; i < typed.length; i++) {

        if (typed[i] === text[i]) {
            correct++;
        } else {
            errors++;
        }
    }

    if (typed.length > 0) {
        accuracy.textContent =
            Math.round((correct / typed.length) * 100);
    }

    const timeUsed = 30 - seconds;

    if (timeUsed > 0) {
        wpm.textContent =
            Math.round((correct / 5) / (timeUsed / 60));
    }

    // Finished typing the complete paragraph
    if (typed === text) {
        finishTest();
    }
};


function finishTest() {

    clearInterval(interval);

    started = false;
    typingBox.disabled = true;
    startButton.disabled = false;

    startButton.textContent = "Try Again";

    alert(
        "Test Complete!\\n\\n" +
        "WPM: " + wpm.textContent + "\\n" +
        "Accuracy: " + accuracy.textContent + "%"
    );
}
