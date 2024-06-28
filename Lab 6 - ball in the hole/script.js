const ball = document.querySelector(".ball");
const hole = document.querySelector(".hole");
const gameContainer = document.querySelector(".gameContainer");
const timerElement = document.querySelector(".timer");
const scoreElement = document.querySelector(".score");

// Funkcja do generowania losowej pozycji
const generateRandomPosition = () => {
  const x = Math.floor(
    Math.random() * (gameContainer.clientWidth - ball.clientWidth)
  );
  const y = Math.floor(
    Math.random() * (gameContainer.clientHeight - ball.clientHeight)
  );
  return { x, y };
};

let ballPosition = generateRandomPosition();
let holePosition = generateRandomPosition();
let score = 0;
let timeLeft = 60;
let timerInterval;
let timerStarted = false;

// Funkcja do aktualizacji pozycji kulki i dziury na ekranie
const updatePositions = () => {
  ball.style.left = `${ballPosition.x}px`;
  ball.style.top = `${ballPosition.y}px`;

  hole.style.left = `${holePosition.x}px`;
  hole.style.top = `${holePosition.y}px`;
};

const checkCollision = () => {
  const distance = Math.sqrt(
    Math.pow(ballPosition.x - holePosition.x, 2) +
      Math.pow(ballPosition.y - holePosition.y, 2)
  );
  if (ball.clientWidth > distance) {
    score++;
    scoreElement.textContent = score;
    ballPosition = generateRandomPosition();
    holePosition = generateRandomPosition();
    updatePositions();
  }
};

const moveBall = (event) => {
  if (!timerStarted) {
    startTimer();
    timerStarted = true;
  }

  switch (event.key) {
    case "ArrowUp":
      if (ballPosition.y > 0) ballPosition.y -= 10;
      break;
    case "ArrowDown":
      if (ballPosition.y < gameContainer.clientHeight - ball.clientHeight)
        ballPosition.y += 10;
      break;
    case "ArrowLeft":
      if (ballPosition.x > 0) ballPosition.x -= 10;
      break;
    case "ArrowRight":
      if (ballPosition.x < gameContainer.clientWidth - ball.clientWidth)
        ballPosition.x += 10;
      break;
  }

  updatePositions();
  checkCollision();
};

const handleOrientation = (event) => {
  if (!timerStarted) {
    startTimer();
    timerStarted = true;
  }

  const gamma = event.gamma; //  Oś X (lewo/prawo)
  const beta = event.beta; // Oś Y (góra/dół)

  //Aktualizacja pozycji kulki na podstawie orientacji
  ballPosition.x += gamma;
  ballPosition.y += beta;

  // kulka pozostaje w granicach kontenera
  ballPosition.x = Math.max(
    0,
    Math.min(ballPosition.x, gameContainer.clientWidth - ball.clientWidth)
  );
  ballPosition.y = Math.max(
    0,
    Math.min(ballPosition.y, gameContainer.clientHeight - ball.clientHeight)
  );

  updatePositions();
  checkCollision();
};

const startTimer = () => {
  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      timerElement.textContent = timeLeft;
    } else {
      clearInterval(timerInterval);
      alert(`Czas się skończył! Twój wynik: ${score}`);
      resetGame();
    }
  }, 1000);
};

const resetGame = () => {
  score = 0;
  timeLeft = 60;
  timerStarted = false;
  scoreElement.textContent = score;
  timerElement.textContent = timeLeft;
  ballPosition = generateRandomPosition();
  holePosition = generateRandomPosition();
  updatePositions();
};

updatePositions();

document.addEventListener("keydown", moveBall);
window.addEventListener("deviceorientation", handleOrientation);
