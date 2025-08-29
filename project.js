const board = document.getElementById("game-board");
const overMessage = document.getElementById("overmessage");
const winMessage = document.getElementById("win-Message");
const movesDisplay = document.getElementById("moves");
const timerEl = document.getElementById("timer");

const newGameBtn = document.getElementById("newgame");
const resetBtn = document.getElementById("resetBtn");
const playAgainBtn = document.getElementById("playAgainBtn");
const playAgainBtn1 = document.getElementById("playAgainBtn1");

const modal = document.getElementById("instructionModal");
const closeModal = document.getElementById("closeModal");
const openModal = document.getElementById("openInstructions");

const emojis = ["😀", "🐶", "🍎", "🚗", "🌟", "🎈", "🏀", "🎵", "📚", "🚀"];
const BOMB = "💣";
let gameOver = false;
let moves = 0;
let seconds = 0;
let timerInterval;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startTimer() {
  clearInterval(timerInterval);
  seconds = 0;
  timerEl.textContent = seconds;
  timerInterval = setInterval(() => {
    seconds++;
    timerEl.textContent = seconds;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function createBoard() {
  board.innerHTML = "";
  gameOver = false;
  moves = 0;
  seconds = 0;
  movesDisplay.textContent = moves;
  timerEl.textContent = seconds;

  overMessage.classList.remove("show");
  winMessage.classList.remove("show");

  const cardCount = 12;
  let selectedEmojis = emojis.slice(0, cardCount - 2);
  selectedEmojis.push(BOMB, BOMB);
  shuffle(selectedEmojis);

  selectedEmojis.forEach((emoji) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.textContent = emoji;
    card.dataset.emoji = emoji;
    card.addEventListener("click", () => flipCard(card));
    board.appendChild(card);
  });

  startTimer();
}

function flipCard(card) {
  if (gameOver || card.classList.contains("flipped")) return;

  moves++;
  movesDisplay.textContent = moves;
  card.classList.add("flipped");

  if (card.dataset.emoji === BOMB) {
    endGame();
  }

  checkWin();
}

function endGame() {
  gameOver = true;
  stopTimer();
  overMessage.classList.add("show");
}

function checkWin() {
  const allCards = document.querySelectorAll(".card");
  const flippedSafeCards = Array.from(allCards).filter(card =>
    card.classList.contains("flipped") && card.dataset.emoji !== BOMB
  );

  if (flippedSafeCards.length === 10) {
    stopTimer();
    winMessage.classList.add("show");
    gameOver = true;
  }
}

// Event Listeners
[newGameBtn, resetBtn, playAgainBtn, playAgainBtn1].forEach((btn) =>
  btn.addEventListener("click", () => {
    createBoard();
  })
);

// Modal events
if (openModal && closeModal && modal) {
  openModal.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) { 
      modal.style.display = "none";
    }
  });
}

createBoard();
