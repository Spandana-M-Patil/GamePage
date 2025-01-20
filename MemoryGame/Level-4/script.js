let cards = document.querySelectorAll(".card");
let move = document.querySelector(".moves");
let miss = document.querySelector(".miss");
let point = document.querySelector(".points");
let totalMoves = 0;
let missedMoves = 0;
let totalPoints = 0;
let counter = document.querySelector(".timer");
let timeStarted = false;
let timer;
let [minute, seconds] = [0, 0];
let total = 0;
let count = 0;
let flippedCards = [];
let isChecking = false;
const match = new Audio("../../sound-effects/match.mp3");
const noMatch = new Audio("../../sound-effects/noMatch.mp3");
const levelUp = new Audio("../../sound-effects/good.mp3");

cards.forEach((card) => {
  card.addEventListener("click", function () {
    onCardClick();
    if (!card.classList.contains("flipped") && count < 2) {
      count++;
      flipCard(card);
      flippedCards.push(card);
    }
    if (count == 2 && !isChecking) {
      totalMoves++;
      move.innerHTML = `Moves: ${totalMoves}`;
      checkContent();
    }
  });
});

function flipCard(card) {
  if (!card.classList.contains("flipped")) {
    card.classList.add("flipped");
  }
}

function checkContent() {
  isChecking = true;
  let content = [];
  flippedCards.forEach((card) => {
    let back = card.querySelector(".back-card");
    content.push(back.innerHTML);
  });
  if (content[0] != content[1]) {
    noMatch.play();
    missedMoves++;
    miss.innerHTML = `Misses: ${missedMoves}`;
    resetCard();
  } else {
    match.play();
    setTimeout(function () {
      flippedCards.forEach((element) => {
        let backCard = element.querySelector(".back-card");
        backCard.innerHTML = "";
        backCard.classList.add("vanishes");
      });
      flippedCards = [];
      count = 0;
      total += 1;
      console.log(total);
      isChecking = false;

      if (total == 12) {
        endGame();
      }
    }, 2000);
  }
}

function resetCard() {
  setTimeout(function () {
    flippedCards.forEach((card) => {
      card.classList.remove("flipped");
    });
    flippedCards = [];
    count = 0;
    isChecking = false;
  }, 2000);
}

function startTimer() {
  timer = setInterval(function () {
    seconds++;
    if (seconds > 60) {
      seconds = 0;
      minute++;
    }
    let s = seconds < 10 ? `0${seconds}` : `${seconds}`;
    let m = minute < 10 ? `0${minute}` : `${minute}`;
    counter.innerHTML = `${m}:${s}`;
  }, 1000);
}

function onCardClick() {
  if (!timeStarted) {
    startTimer();
  }
  timeStarted = true;
}

function endGame() {
  let message = "Well done!";
  clearInterval(timer);
  if (minute < 2) {
    totalPoints += 20;
    message = "Fantastic Job!";
  } else if (minute < 3) {
    message = "Great Job!";
    totalPoints += 14;
  } else {
    totalPoints += 5;
  }
  let messageBox = document.querySelector(".messageBox");
  let winnerMessage = messageBox.querySelector("#winnerMessage");
  let movedMessage = messageBox.querySelector("#movedMessage");
  point.innerHTML = `Points: ${totalPoints}`;
  winnerMessage.innerHTML = message;
  movedMessage.innerHTML = `You've finished the game with ${totalMoves} moves.`;
  messageBox.style.display = "block";
  levelUp.play();
}
