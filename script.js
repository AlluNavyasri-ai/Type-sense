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
        "I love my family.",
        "The cat is sleeping.",
        "Birds can fly high.",
        "I eat fresh fruit.",
        "We go to school.",
        "My bag is blue.",
        "The dog runs fast.",
        "Today is a good day.",
        "I enjoy reading books.",
        "The sky is very blue.",
        "My friend is kind.",
        "I drink a glass of water.",
        "We play in the park.",
        "The baby is smiling.",
        "I write with a pen.",
        "The flowers look beautiful.",
        "I wake up early.",
        "Practice makes us better."
    ],

    intermediate: [
        "Practice every day to improve your typing speed.",
        "Learning new skills helps us grow.",
        "Typing carefully can improve your accuracy.",
        "Reading books expands our knowledge.",
        "Good habits help us achieve our goals.",
        "Technology makes communication faster and easier.",
        "Students should manage their time wisely.",
        "Regular practice builds confidence and skill.",
        "The internet provides access to useful information.",
        "Healthy routines improve our daily productivity.",
        "Careful planning can save time and effort.",
        "Creative thinking helps solve difficult problems.",
        "Teamwork makes challenging tasks easier.",
        "Learning from mistakes helps us improve.",
        "Always check your work before submitting it.",
        "Small steps can lead to great achievements.",
        "Clear communication prevents many misunderstandings.",
        "A positive attitude supports continuous learning.",
        "Writing regularly improves both speed and clarity.",
        "Patience and effort produce better results."
    ],

    advanced: [
        "Technology is changing the world faster than ever before.",
        "Programming develops logical thinking and problem-solving skills.",
        "Consistent practice improves both typing speed and accuracy.",
        "Artificial intelligence can support people in many different fields.",
        "Successful projects require planning, teamwork, and careful execution.",
        "Digital communication connects people across different countries.",
        "Creative solutions often emerge from careful observation and experimentation.",
        "Cybersecurity protects important information from unauthorized access.",
        "Developers must test their applications before releasing them.",
        "Reliable software should be efficient, secure, and easy to use.",
        "Continuous learning helps professionals adapt to technological changes.",
        "Accurate data analysis supports better decisions and future planning.",
        "Innovation becomes valuable when it solves real-world problems.",
        "Good documentation makes complex systems easier to understand.",
        "Responsible technology should respect privacy and accessibility.",
        "Efficient algorithms can reduce processing time and resource usage.",
        "Strong communication skills are essential for successful collaboration.",
        "Careful debugging helps identify and correct programming errors.",
        "Complex challenges often require patience and systematic reasoning.",
        "A well-designed application should provide a consistent user experience."
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
const selectedLevel = levelSelect.value;
const sentenceList = sentences[selectedLevel];
    timeLeft = 30;
    running = true;
    startTime = Date.now();

    timerDisplay.textContent = "30";
    wpmDisplay.textContent = "0";
    accuracyDisplay.textContent = "100";
text = sentenceList[
    Math.floor(Math.random() * sentenceList.length)
];

paragraph.textContent = text;
    typingBox.value = "";
    document.getElementById("resultBox").style.display = "none";
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

