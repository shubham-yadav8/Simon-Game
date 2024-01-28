const colors = ["green", "red", "yellow", "blue"];
let sequence = [];
let userSequence = [];
let currentScore = 0;
let bestScore = 0;

document.addEventListener("DOMContentLoaded", () => {
    updateScore();

    document.querySelectorAll(".box").forEach(box => {
        box.addEventListener("click", () => {
            const selectedColor = box.id;
            userSequence.push(selectedColor);
            checkUserInput();
        });
    });

    startNewRound();
});

function startNewRound() {
    userSequence = [];
    addToSequence();
    showSequence();
}

function addToSequence() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];                    
    sequence.push(randomColor);
    currentScore++;
    updateScore();
}

function showSequence() {
    let i = 0;
    const intervalId = setInterval(() => {
        highlightBox(sequence[i]);
        i++;
        if (i >= sequence.length) {
            clearInterval(intervalId);
        }
    }, 1000);
}

function highlightBox(color) {
    const box = document.getElementById(color);
    box.style.backgroundColor = "white";
    setTimeout(() => {
        box.style.backgroundColor = color;
    }, 500);
}

function checkUserInput() {
    const lastIndex = userSequence.length - 1;
    if (userSequence[lastIndex] !== sequence[lastIndex]) {
        handleWrongInput();
    } else if (userSequence.length === sequence.length) {
        setTimeout(() => {
            startNewRound();
        }, 1000);
    }
}

function handleWrongInput() {
    document.body.style.backgroundColor = "red";
    setTimeout(() => {
        document.body.style.backgroundColor = "#f0f0f0";
        resetGame();
    }, 1000);
}

function tabresetGame() {
    if (currentScore > bestScore) {
        bestScore = currentScore;
    }
    sequence = [];
    currentScore = 0;
    startNewRound();
}

function updateScore() {
    document.getElementById("best-score").textContent = bestScore;
    document.getElementById("current-score").textContent = currentScore;
}



