'use strict';
// Select Elements
const finalScorePlayer1 = document.querySelector('#score--0');
const finalScorePlayer2 = document.querySelector('#score--1');
const currentScorePlayer1 = document.querySelector('#current--0');
const currentScorePlayer2 = document.querySelector('#current--1');
const diceNumber = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const player1 = document.querySelector(`.player--0`);
const player2 = document.querySelector(`.player--1`);

// Start Declartion
let activePlayer, currentScore, scores, playing;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  finalScorePlayer1.textContent = 0;
  finalScorePlayer2.textContent = 0;
  currentScorePlayer1.textContent = 0;
  currentScorePlayer2.textContent = 0;
  diceNumber.classList.add('hidden');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
};
init();

// Functions

const switchPlayer = function () {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player2.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// Roll Button
btnRoll.addEventListener('click', function () {
  if (playing) {
    diceNumber.classList.remove('hidden');
    let randomNum = Math.trunc(Math.random() * 6) + 1;
    diceNumber.src = `dice-${randomNum}.png`;
    if (randomNum !== 1) {
      currentScore += randomNum;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

//Hold Button
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceNumber.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

// Reset The Game
btnNew.addEventListener('click', init);
