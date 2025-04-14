let player = { x: 50, y: 50, size: 20 };
let obstacles = [];
let staticObstacles = [];
let exit;
let gameOver = false;

function setup() {
  createCanvas(400, 400);
  exit = { x: 360, y: 360, size: 30 };

  for (let i = 0; i < 3; i++) {
    obstacles.push({
      x: random(width),
      y: random(height),
      s: random(20, 40),
      vx: random(-2, 2),
      vy: random(-2, 2),
      c: color(random(255), random(255), random(255))
    });
  }
}

function draw() {
  background(220);
// you lose 
  if (gameOver) {
    textSize(32);
    text("Game Over", 110, height / 2);
    noLoop();
    return;
  }

  fill(0, 255, 0);
  rect(exit.x, exit.y, exit.size, exit.size);

  if (keyIsDown(65)) player.x -= 3; // A
  if (keyIsDown(68)) player.x += 3; // D
  if (keyIsDown(87)) player.y -= 3; // W
  if (keyIsDown(83)) player.y += 3; // S

  fill(0, 0, 255);
  ellipse(player.x, player.y, player.size);

  // Moving object collision
  for (let o of obstacles) {
    fill(o.c);
    rect(o.x, o.y, o.s, o.s);
    o.x = (o.x + o.vx + width) % width;
    o.y = (o.y + o.vy + height) % height;
    
    // Hitbox collision
    if (player.x < o.x + o.s && player.x + player.size > o.x &&
        player.y < o.y + o.s && player.y + player.size > o.y) {
      gameOver = true;
      return;
    }
  }

  // Collison with stationary objects 
  fill(100);
  for (let s of staticObstacles) {
    rect(s.x, s.y, s.s, s.s);
    if (player.x < s.x + s.s && player.x + player.size > s.x &&
        player.y < s.y + s.s && player.y + player.size > s.y) {
      gameOver = true;
      return;
    }
  }

  // You win message
  if (player.x > exit.x && player.x < exit.x + exit.size &&
      player.y > exit.y && player.y < exit.y + exit.size) {
    textSize(32);
    text("You Win!", 120, height / 2);
    noLoop();
  }
}

function mousePressed() {
  staticObstacles.push({ x: mouseX, y: mouseY, s: random(15, 30) });
}
