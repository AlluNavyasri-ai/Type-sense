const startButton = document.getElementById("startButton");
const typingBox = document.getElementById("typingBox");
const paragraph = document.getElementById("paragraph");

const timerDisplay = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");

let timeLeft = 30;
let timer;
let testStarted = false;
let startTime;
let errors = 0;

startButton.addEventListener("click", function () {

    clearInterval(timer);

    timeLeft = 30;
    errors = 0;
    testStarted = true;

    timerDisplay.textContent = timeLeft;
    wpmDisplay.textContent = 0;
    accuracyDisplay.textContent = 100;

    typingBox.value = "";
    typingBox.disabled = false;
    typingBox.focus();

    startButton.disabled = true;

    startTime = Date.now();

    timer = setInterval(function () {

        timeLeft--;

        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            finishTest();
        }

    }, 1000);
});


typingBox.addEventListener("input", function () {

    if (!testStarted) return;

    const typedText = typingBox.value;
    const originalText = paragraph.textContent.trim();

    errors = 0;
    let correctCharacters = 0;

    for (let i = 0; i < typedText.length; i++) {

        if (typedText[i] === originalText[i]) {
            correctCharacters++;
        } else {
            errors++;
        }
    }

    const accuracy = typedText.length === 0
        ? 100
        : Math.round((correctCharacters / typedText.length) * 100);

    accuracyDisplay.textContent = accuracy;

    const elapsedSeconds = (Date.now() - startTime) / 1000;
    const minutes = elapsedSeconds / 60;

    const wpm = minutes > 0
        ? Math.round((correctCharacters / 5) / minutes)
        : 0;

    wpmDisplay.textContent = wpm;

    // Finish when the complete paragraph is typed
    if (typedText.length >= originalText.length) {
        finishTest();
    }
});


function finishTest() {

    if (!testStarted) return;

    testStarted = false;

    clearInterval(timer);

    typingBox.disabled = true;
    startButton.disabled = false;
    startButton.textContent = "Try Again";

    const typedText = typingBox.value;
    const originalText = paragraph.textContent.trim();

    let correctCharacters = 0;
    errors = 0;

    for (let i = 0; i < typedText.length; i++) {

        if (typedText[i] === originalText[i]) {
            correctCharacters++;
        } else {
            errors++;
        }
    }

    const elapsedSeconds = Math.max(
        (Date.now() - startTime) / 1000,
        1
    );

    const minutes = elapsedSeconds / 60;

    const wpm = Math.round(
        (correctCharacters / 5) / minutes
    );

    const accuracy = typedText.length === 0
        ? 0
        : Math.round(
            (correctCharacters / typedText.length) * 100
        );

    wpmDisplay.textContent = wpm;
    accuracyDisplay.textContent = accuracy;

    alert(
        "Test Complete!\n\n" +
        "WPM: " + wpm + "\n" +
        "Accuracy: " + accuracy + "%\n" +
        "Errors: " + errors
    );
}
