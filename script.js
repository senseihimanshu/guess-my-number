// 'use strict';

const guessStates = Object.freeze({
    TOO_HIGH: 'TOO_HIGH',
    TOO_LOW: 'TOO_LOW',
    CORRECT: 'CORRECT',
});

const leftOfRange = 1;
const rightOfRange = 20;
var currentGuessState;
var score;
var generatedRandomNumber;
var highestScore;
const guessInput = document.querySelector('.guess');

initializeGame();

function initializeGame() {
    generatedRandomNumber = parseInt(
        Math.random() * rightOfRange + leftOfRange
    );

    guessInput.setAttribute('min', leftOfRange);
    guessInput.setAttribute('max', rightOfRange);
    guessInput.value = null;
    score = rightOfRange - leftOfRange + 1;
    currentGuessState = null;
    document.querySelector('.result').textContent = '?';
    document.querySelector('.check').addEventListener('click', checkGuess);
}

function checkGuess() {
    let value = guessInput.value;
    if (
        !generatedRandomNumber ||
        !value ||
        value < leftOfRange ||
        value > rightOfRange
    )
        return;

    console.log(generatedRandomNumber, value, score);

    if (value > generatedRandomNumber) {
        currentGuessState = guessStates.TOO_HIGH;
        score--;
        setScore();
    } else if (value < generatedRandomNumber) {
        currentGuessState = guessStates.TOO_LOW;
        score--;
        setScore();
    } else if (value == generatedRandomNumber) {
        currentGuessState = guessStates.CORRECT;
        document
            .querySelector('.check')
            .removeEventListener('click', checkGuess);
        highestScore = !highestScore ? score : Math.max(highestScore, score);
        document.querySelector('.highscore').textContent = highestScore;
        document.querySelector('.result').textContent = generatedRandomNumber;
    }

    setMessage(`${currentGuessState}!`);
}

function setMessage(guessState) {
    document.querySelector('.message').textContent = guessState;
}

function setScore() {
    document.querySelector('.score').textContent = score;
}

document
    .querySelector('.again')
    .addEventListener('click', () => initializeGame());
