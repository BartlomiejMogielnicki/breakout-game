const rulesBtn = document.getElementById('info-btn');
const closeBtn = document.getElementById('close-btn');
const rulesContainer = document.getElementById('rules-container');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let score = 0;
const bricksColumnsNumber = 9;
const bricksRowsNumber = 5;

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

// Brick object
const brickInfo = {
  width: 70,
  height: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true
};

// Create bricks
const bricks = [];
for (let i = 0; i < bricksColumnsNumber; i++) {
  bricks[i] = [];
  for (let j = 0; j < bricksRowsNumber; j++) {
    const x = i * (brickInfo.width + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.height + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = {
      x,
      y,
      ...brickInfo
    };
  };
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
};

// Draw score
const drawScore = () => {
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
};

// Draw bricks
const drawBricks = () => {
  bricks.forEach(column => {
    column.forEach(brick => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.width, brick.height);
      ctx.fillStyle = brick.visible ? '#777' : 'transparent';
      ctx.fill();
      ctx.closePath();
    });
  });
};

// Move paddle
const movePaddle = () => {
  paddle.x += paddle.dx

  // Wall detection
  if (paddle.x + paddle.width > canvas.width) {
    paddle.x = canvas.width - paddle.width;
  };

  if (paddle.x < 0) {
    paddle.x = 0;
  };
};

// Move ball
const moveBall = () => {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Wall collision detection (horizontal)
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1;
  };

  // Wall collision detection (vertical)
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
  };

  // Paddle collision
  if (ball.x - ball.size > paddle.x && ball.x + ball.size < paddle.x + paddle.width && ball.y + ball.size > paddle.y) {
    ball.dy = -ball.speed;
  };

  // Brick collision
  bricks.forEach(column => {
    column.forEach(brick => {
      if (brick.visible) {
        if (ball.x - ball.size > brick.x && ball.x + ball.size < brick.x + brick.width && ball.y + ball.size > brick.y && ball.y - ball.size < brick.y + brick.height) {
          ball.dy *= -1;
          brick.visible = false;
        };
      };
    });
  });
};

// Draw
const draw = () => {
  // Clear canvas window
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
};

// Update canvas
const update = () => {
  movePaddle();
  moveBall();
  draw();

  requestAnimationFrame(update);
};

update();

// Event listeners
rulesBtn.addEventListener('click', () => {
  rulesContainer.classList.add('show');
});

closeBtn.addEventListener('click', () => {
  rulesContainer.classList.remove('show');
});

// Keydown event
document.addEventListener('keydown', (e) => {
  if (e.keyCode === 39) {
    paddle.dx = paddle.speed;
  } else if (e.keyCode === 37) {
    paddle.dx = -paddle.speed;
  };
});

// Keyup event
document.addEventListener('keyup', (e) => {
  if (e.keyCode === 39 || e.keyCode === 37) {
    paddle.dx = 0;
  };
});