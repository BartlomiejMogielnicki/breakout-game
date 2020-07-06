const rulesBtn = document.getElementById('info-btn');
const closeBtn = document.getElementById('close-btn');
const rulesContainer = document.getElementById('rules-container');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Ball object
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4
};

// Paddle object
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  width: 80,
  height: 10,
  speed: 8,
  dx: 0
};

// Draw ball on canvas
const drawBall = () => {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = '#777';
  ctx.fill();
  ctx.closePath();
};

// Draw paddle on canvas
const drawPaddle = () => {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
  ctx.fillStyle = '#777';
  ctx.fill();
  ctx.closePath();
}

drawBall();
drawPaddle();

// Event listeners
rulesBtn.addEventListener('click', () => {
  rulesContainer.classList.add('show');
});

closeBtn.addEventListener('click', () => {
  rulesContainer.classList.remove('show');
});