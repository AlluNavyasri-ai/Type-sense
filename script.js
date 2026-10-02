const startButton = document.getElementById("startButton");
const typingBox = document.getElementById("typingBox");
const paragraph = document.getElementById("paragraph");

const timerDisplay = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");

let timeLeft = 30;
let timer;
let testStarted = false;

startButton.addEventListener("click", function () {

    timeLeft = 30;
    timerDisplay.textContent = timeLeft;
    wpmDisplay.textContent = 0;
    accuracyDisplay.textContent = 100;

    typingBox.value = "";
    typingBox.disabled = false;
    typingBox.focus();

    testStarted = true;
    startButton.disabled = true;

    timer = setInterval(function () {

        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            testStarted = false;
            typingBox.disabled = true;
            startButton.disabled = false;

            calculateResult();
        }

    }, 1000);
});


typingBox.addEventListener("input", function () {

    if (!testStarted) return;

    calculateResult();
});


function calculateResult() {

    const typedText = typingBox.value;
    const originalText = paragraph.textContent.trim();

    let correctCharacters = 0;

    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === originalText[i]) {
            correctCharacters++;
        }
    }

    const accuracy = typedText.length === 0
        ? 100
        : Math.round((correctCharacters / typedText.length) * 100);

    const elapsedTime = 30 - timeLeft;

    const minutes = elapsedTime / 60;

    const wpm = minutes > 0
        ? Math.round((correctCharacters / 5) / minutes)
        : 0;

    accuracyDisplay.textContent = accuracy;
    wpmDisplay.textContent = wpm;
}
