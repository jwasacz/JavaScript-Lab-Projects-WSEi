const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const startButton = document.querySelector(".startButton");
const resetButton = document.querySelector(".resetButton");
const ballsInput = document.querySelector(".ballsNumInput");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let balls = [];
let numBalls = parseInt(ballsInput.value);
const maxDistance = 100;
let animationId;

//(Pozycja x, pozycja y, predkość x, predkosć y,)
class Ball {
  constructor(x, y, dy, dx, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
  }

  drawBall() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
  }

  moveBall() {
    //odbijanie kulki górna i dolna krawędź (kulka zmienie kierunek predkośći)
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    //przemieszczenie sie kulek
    this.x += this.dx;
    this.y += this.dy;
  }
}

const init = () => {
  balls = [];
  for (let i = 0; i < numBalls; i++) {
    const radius = 10;
    let x = Math.random() * (canvas.width - 2 * radius) + radius;
    let y = Math.random() * (canvas.height - 2 * radius) + radius;
    let dx = (Math.random() - 0.5) * 3;
    let dy = (Math.random() - 0.5) * 3;
    balls.push(new Ball(x, y, dx, dy, radius));
  }
};

const drawLines = () => {
  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      const dist = Math.hypot(balls[i].x - balls[j].x, balls[i].y - balls[j].y);
      if (dist < maxDistance) {
        ctx.beginPath();
        ctx.moveTo(balls[i].x, balls[i].y);
        ctx.lineTo(balls[j].x, balls[j].y); // Poprawione balls[j].y zamiast balls[j].x
        ctx.stroke(); // Rysowanie linii
        ctx.closePath();
      }
    }
  }
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  balls.forEach((ball) => {
    ball.moveBall();
    ball.drawBall();
  });
  drawLines();
  animationId = requestAnimationFrame(animate);
};

const start = () => {
  numBalls = parseInt(ballsInput.value);
  if (!animationId) animate();
  console.log(animationId);
  drawLines();
  init();
};

const stop = () => {
  cancelAnimationFrame(animationId);
  animationId = null;
  ctx.clearRect(0, 0, canvas.width, canvas.height); // odpowiedzialne za czysczenie canvas
  console.log(animationId);
  console.log(numBalls);
};

resetButton.addEventListener("click", stop);
startButton.addEventListener("click", start);
