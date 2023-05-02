const horseMan = document.getElementById("horse-man");
const gameContainer = document.getElementById("game-container");
const points = document.getElementById("points");
const abkhaziaflag = document.getElementById("abkhaziaflag");
const myDiv = document.getElementById("my-div");



const horseManX = 0;
let horseManY = 0;
let horseManJumping = false;
const horseManJumpHeight = 500;
const horseManJumpSpeed = 12;
const horseManMoveSpeed = 10;
let score = 0;
let lastPointTime = 0;
let animationFrames = [
  "img/GHM.png",
  "img/animation2.png",
  "img/animation1.png",
  "img/animation3.png"
];







let animationFrameIndex = 0;
let animationFrameInterval = 2000;

const bgMusic = new Audio('audio.mp3');
bgMusic.loop = true;
bgMusic.play();

function animateHorseMan() {
  const animationImage = animationFrames[animationFrameIndex];
  horseMan.style.backgroundImage = `url(${animationImage})`;



  

  animationFrameIndex = (animationFrameIndex + 1) % animationFrames.length;

  if (animationFrameIndex === 0) {
    animationFrameInterval += 10000;
  }
}


function showWinningMessage() {
  alert("გილოცავ, შენ მოიგე");
}


function gameLoop() {
  animateHorseMan();

  if ((horseManJumping && !isMobile()) || (keys[32] && isMobile())) {
    horseManY += horseManJumpSpeed;

    if (horseManY >= horseManJumpHeight) {
      horseManJumping = false;

      const fallInterval = setInterval(() => {
        horseManY -= horseManJumpSpeed;

        if (horseManY <= 0) {
          clearInterval(fallInterval);
          horseManY = 0;
        }

        if (horseManY > gameContainer.offsetHeight - horseMan.offsetHeight) {
          horseManY = gameContainer.offsetHeight - horseMan.offsetHeight;
        }

        horseMan.style.bottom = `${horseManY}px`;
      }, 15);
    }

    horseMan.style.bottom = `${horseManY}px`;
  }

  if (horseManY > gameContainer.offsetHeight - horseMan.offsetHeight) {
    horseManY = gameContainer.offsetHeight - horseMan.offsetHeight;
    horseManJumping = false;
  }

  const currentTime = Date.now();
  if (currentTime - lastPointTime >= 500) {
    score += 1;
    points.textContent = `ქულა: ${score}`;
    lastPointTime = currentTime;

    if (score === 100) {
      myDiv.style.animationPlayState = "paused";
      abkhaziaflag.style.display = "block";
      showWinningMessage();
      return;
    }
  }

  // Check for collision with myDiv background image
  const horseManBounds = horseMan.getBoundingClientRect();
  const myDivBounds = myDiv.getBoundingClientRect();
  if (
    horseManBounds.right >= myDivBounds.left &&
    horseManBounds.left <= myDivBounds.right &&
    horseManBounds.bottom >= myDiv.offsetTop &&
    horseManBounds.top <= myDiv.offsetTop + myDiv.offsetHeight
  ) {
    handleCollision();
  }

  // Move myDiv to the left and reappear when it leaves the game container
  const myDivWidth = myDiv.offsetWidth;
  let myDivLeft = parseInt(getComputedStyle(myDiv).left);
  myDivLeft -= horseManMoveSpeed;
  if (myDivLeft + myDivWidth < 0) {
    myDivLeft = gameContainer.offsetWidth;
  }
  myDiv.style.left = `${myDivLeft}px`;

  requestAnimationFrame(gameLoop);
}

function isMobile() {
  return /Mobi|Android/i.test(navigator.userAgent);
}

const keys = {};
window.addEventListener("keydown", (event) => {
  keys[event.keyCode] = true;
});

window.addEventListener("keyup", (event) => {
  keys[event.keyCode] = false;
});

window.addEventListener("keydown", (event) => {
  if (event.keyCode === 32) {
    if (!horseManJumping) {
      horseManJumping = true;
      horseManY = 0;
    }
    event.preventDefault();
  }
});

function handleCollision() {
  messageDiv.innerText = "შენ მოკვდი, ხელახლა დაწყება";
  audio.pause();
  clearInterval(fallInterval);
  horseMan.style.animationPlayState = "paused";
  gameContainer.removeEventListener("click", handleJumpClick);
}



gameLoop();
