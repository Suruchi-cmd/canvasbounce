var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

function getRndColor() {
  var r = Math.floor(255 * Math.random()),
    g = Math.floor(255 * Math.random()),
    b = Math.floor(255 * Math.random());
  return "rgba(" + r + "," + g + "," + b + ",50)";
}

function getDistance(x1, y1, x2, y2) {
  var dist = ((x1 - x2) ** 2 + (y1 - y2) ** 2) ** (1 / 2);
  return dist;
}

class Ball {
  constructor(x, y, radius, idx) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.index = idx;
    this.dx = (Math.random() - 0.5) * 5;
    this.dy = (Math.random() - 0.5) * 5;
    this.color = getRndColor();
  }

  draw() {
    c.fillStyle = this.color;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    // c.strokeStyle = "blue";
    // c.stroke();
    c.fill();
  }

  update(ballArray) {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    for (var a = 0; a < ballArray.length; a++) {
      if (ballArray[a].index != this.index) {
        if (
          getDistance(ballArray[a].x, ballArray[a].y, this.x, this.y) <=
          2 * this.radius
        ) {
          this.dx = -this.dx;
          this.dy = -this.dy;
          this.color = getRndColor();
        }
      }
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}

var ballArray = [];
var radius = 50;
var num = 10;
for (var i = 0; i < num; i++) {
  var x = Math.random() * (innerWidth - radius * 2) + radius;
  var y = Math.random() * (innerHeight - radius * 2) + radius;

  if (i != 0) {
    for (let j = 0; j < ballArray.length; j++) {
      if (getDistance(ballArray[j].x, ballArray[j].y, x, y) <= 2 * radius) {
        x = Math.random() * (innerWidth - radius * 2) + radius;
        y = Math.random() * (innerHeight - radius * 2) + radius;
        j = -1;
        console.log("change for overlap");
      }
    }
  }
  var ball = new Ball(x, y, radius, i);
  ballArray.push(ball);
}

function animate() {
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (var j = 0; j < ballArray.length; j++) {
    ballArray[j].draw();
    ballArray[j].update(ballArray);
  }
  requestAnimationFrame(animate);
}

animate();
