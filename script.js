const startButton = document.getElementById("startButton");
const typingBox = document.getElementById("typingBox");

const paragraph = document.getElementById("paragraph");
const timerDisplay = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");

const levelSelect = document.getElementById("levelSelect");

const sentences = {
    beginner: [
        "I like to play.",
        "The sun is hot.",
        "I love my family."
    ],
    intermediate: [
        "Practice every day to improve your typing speed.",
        "Learning new skills helps us grow.",
        "Typing carefully can improve your accuracy."
    ],
    advanced: [
        "Technology is changing the world faster than ever before.",
        "Programming develops logical thinking and problem-solving skills.",
        "Consistent practice improves both typing speed and accuracy."
    ]
};

let text = paragraph.textContent.trim();



let timeLeft = 30;
let timer;
let running = false;
let startTime = 0;


typingBox.disabled = true;


startButton.addEventListener("click", function () {

    clearInterval(timer);

    timeLeft = 30;
    running = true;
    startTime = Date.now();

    timerDisplay.textContent = "30";
    wpmDisplay.textContent = "0";
    accuracyDisplay.textContent = "100";

    typingBox.value = "";
    typingBox.disabled = false;

    startButton.disabled = true;
    startButton.textContent = "Typing...";

    typingBox.focus();

    timer = setInterval(function () {

        timeLeft--;

        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            finishTest();
        }

    }, 1000);
});


typingBox.addEventListener("input", function () {

    if (!running) {
        return;
    }

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

        const accuracy =
            Math.round((correct / typed.length) * 100);

        accuracyDisplay.textContent = accuracy;
    }


    const elapsedSeconds =
        (Date.now() - startTime) / 1000;

    if (elapsedSeconds > 0) {

        const wpm =
            Math.round((correct / 5) / (elapsedSeconds / 60));

        wpmDisplay.textContent = wpm;
    }


    // Finish as soon as the complete paragraph is entered
    if (typed.length >= text.length) {
        finishTest();
    }
});
function finishTest() {

    if (!running) {
        return;
    }

    running = false;
    clearInterval(timer);

    typingBox.disabled = true;
    startButton.disabled = false;
    startButton.textContent = "Try Again";

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

    const elapsedSeconds =
        Math.max(1, (Date.now() - startTime) / 1000);

    const finalWpm =
        Math.round((correct / 5) / (elapsedSeconds / 60));

    const finalAccuracy =
        typed.length > 0
        ? Math.round((correct / typed.length) * 100)
        : 0;

    wpmDisplay.textContent = finalWpm;
    accuracyDisplay.textContent = finalAccuracy;

    document.getElementById("finalWpm").textContent = finalWpm;
    document.getElementById("finalAccuracy").textContent =
        finalAccuracy + "%";
    document.getElementById("finalErrors").textContent = errors;

    document.getElementById("resultBox").style.display = "block";
}

