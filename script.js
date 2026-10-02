const text = "The quick brown fox jumps over the lazy dog.";

const textarea = document.querySelector("textarea");
const startButton = document.querySelector("button");

let startTime;
let timer;
let running = false;

textarea.disabled = true;

startButton.addEventListener("click", function () {

    if (!running) {
        textarea.value = "";
        textarea.disabled = false;
        textarea.focus();

        startTime = Date.now();
        running = true;

        startButton.textContent = "Test Running...";

        timer = setInterval(updateTest, 1000);
    } else {
        finishTest();
    }
});

textarea.addEventListener("input", function () {

    if (!running) return;

    updateTest();

    // Stop automatically when the complete sentence is typed
    if (textarea.value === text) {
        finishTest();
    }
});

function updateTest() {

    const elapsed = Math.floor((Date.now() - startTime) / 1000);

    const typed = textarea.value;

    const words = typed.trim() === ""
        ? 0
        : typed.trim().split(/\s+/).length;

    const wpm = elapsed > 0
        ? Math.round((words / elapsed) * 60)
        : 0;

    let correct = 0;

    for (let i = 0; i < typed.length; i++) {
        if (typed[i] === text[i]) {
            correct++;
        }
    }

    const accuracy = typed.length > 0
        ? Math.round((correct / typed.length) * 100)
        : 100;

    document.title = `TypeSense - ${wpm} WPM`;

    const stats = document.querySelector("#stats");

    if (stats) {
        stats.textContent =
            `Time: ${elapsed}s | WPM: ${wpm} | Accuracy: ${accuracy}%`;
    }
}

function finishTest() {

    if (!running) return;

    clearInterval(timer);
    running = false;

    textarea.disabled = true;

    const elapsed = Math.max(
        1,
        Math.floor((Date.now() - startTime) / 1000)
    );

    const typed = textarea.value;

    const words = typed.trim() === ""
        ? 0
        : typed.trim().split(/\s+/).length;

    const wpm = Math.round((words / elapsed) * 60);

    let correct = 0;
    let errors = 0;

    for (let i = 0; i < typed.length; i++) {
        if (typed[i] === text[i]) {
            correct++;
        } else {
            errors++;
        }
    }

    const accuracy = typed.length > 0
        ? Math.round((correct / typed.length) * 100)
        : 0;

    const stats = document.querySelector("#stats");

    if (stats) {
        stats.textContent =
            `Completed! Time: ${elapsed}s | WPM: ${wpm} | Accuracy: ${accuracy}% | Errors: ${errors}`;
    }

    startButton.textContent = "Try Again";
}
