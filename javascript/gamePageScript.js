// Elements.
const startButton = document.getElementById("startButton");
const timerElement = document.getElementById("timeLeft");
const holes = document.querySelectorAll(".hole");
const scoreDisplay = document.getElementById("score");
const wormCountDisplay = document.getElementById("wormCount");
const tray = document.querySelector(".tray");
const missesDisplay = document.getElementById("misses");
const homeButton = document.getElementById("homeButton");
const gameBoard= document.querySelector(".gameBoard");
const cursor = document.querySelector(".cursor");
const popUpWindow = document.getElementById("popUpWindow");
const winMessage = document.getElementById("winMessage");
const closeButton = document.getElementById("closeButton");
const hitSound = document.getElementById("hitSound");
const missSound = document.getElementById("missSound");
const completionSound = document.getElementById("completionSound");

// variables.
let timeLeft = 20;
let timerId1;
let score = 0;
let count = 0;
let misses = 0;
const maxMisses = 8;
const minCount = 6;
let gameOn = false;

//Getting glove data from session storage.
let openHand = sessionStorage.getItem("openHand");
let closeHand = sessionStorage.getItem("closeHand");

//Getting sound and volume data from session storage.
let sound = sessionStorage.getItem("sound");
let volumeString = sessionStorage.getItem("volume");

//Setting default volume to the audio elements.
let volume = parseInt(volumeString);
volume = volume / 10.0;
hitSound.volume = volume;
missSound.volume = volume;
completionSound.volume = volume;

//Setting default gloves.
cursor.style.backgroundImage = `url("${openHand}")`;

//Event listeners.
startButton.addEventListener("click", startGame);
closeButton.addEventListener("click", closePopUp);

// A function to start the game after clicking the start button and ending it after 20 seconds.
function startGame() {
  /*score = 0;
  misses = 0;
  timeLeft = 20;
  count = 0;
  scoreDisplay.textContent = score;
  missesDisplay.textContent = misses;
  wormCountDisplay.textContent = count;
  timerElement.textContent = "20";
  resetTray();*/
  //Making the gameOn variable true.
  gameOn = true;
  //Disabling all the buttons.
  startButton.disabled = true;
  homeButton.disabled = true;
  //Updating the timer for every second.
  timerId1 = setInterval(updateTimer, 1000);
  // Adding event listeners to all the holes div.
  for (i = 0; i < holes.length; i++) {
    holes[i].addEventListener("click", missWorm);
  }
  //Calling the popUpWorm() function.
  popUpWorm();
  //Setting time out of 20 seconds for the game.
  timerId = setTimeout(() => {
    // Removing event listeners for the holes after game end.
    for (i = 0; i < holes.length; i++) {
      holes[i].removeEventListener("click", missWorm);
    }
    //After the time out, make the gameOn variable false.
    gameOn = false;
    //startButton.disabled = false;
    //homeButton.disabled = false;
    //Displaying the popup window.
    popUpWindow.style.display = "flex";
    //Playing completionSound audio.
    if (sound === "on") {
      completionSound.play();
    }
    //Displaying the winning message.
    if (count >= minCount) {
      // alert("Congratulations, you won! Your score is " +score +".");
      winMessage.textContent =
        "Congratulations, you won! Your score is " + score + ".";
    } 
    //Displaying the lost message.
    else {
      // alert("You have slipped a bit! Your score is "+ score +".");
      winMessage.textContent = "You have slipped a bit! Your score is " + score + ".";
    }
  }, 20000);
}

// Calculating the misses.
function missWorm() {
  //Playing missSound audio.
  if (sound === "on") {
    missSound.currentTime = 0;
    missSound.play();
  }
  //Checking whether the miss count is less than 8.
  if (misses < maxMisses) {
    // If it is less than 8, increment the miss count and display it.
    misses++;
    missesDisplay.textContent = misses;
    // Checking whether the miss count is greater than 8.
    if (misses >= maxMisses) {
      //startButton.disabled = false;
      //homeButton.disabled = false;
      //Making the gameOn variable false.
      gameOn = false;
      //Displaying the popup window.
      popUpWindow.style.display = "flex";
      //Playing the completionSound audio.
      if (sound === "on") {
        completionSound.play();
      }

      // alert("Too many misses! You have slipped a bit! Your score is "+ score +".");
      //Displaying the lost message.
      winMessage.textContent = "Too many misses! You have slipped a bit! Your score is " + score + ".";
      //Clearing all the timer methods.
      clearTimeout(timerId);
      clearInterval(timerId1);
    }
  }
}

//updating the timer every second.
function updateTimer() {
  timeLeft--;
  timerElement.textContent = timeLeft;
  //Ending the timer if it reaches zero.
  if (timeLeft === 0) {
    clearInterval(timerId1);
  }
}

//A function to make the worms pop out for a chosen time in the chosen holes.
function popUpWorm() {
  //Choosing random time.
  let wormDisplayTime = randomTime(500, 1000);
  //Choosing a random hole.
  const hole = randomHole(holes);
  //Getting the worm div element.
  const worm = hole.querySelector(".worm");
  //Displaying the worm.
  worm.style.display = "block";
  //Event Listener for collectWorms() function.
  worm.addEventListener("click", collectWorms);
  //Setting time out for the worms to appear and disappear for the chosen time.
  setTimeout(() => {
    //Hiding the worm after time out.
    worm.style.display = "none";
    worm.removeEventListener("click", collectWorms);
    //Again calling the popUpWorm() function if the game is still running.
    if (gameOn && misses < maxMisses) {
      popUpWorm();
    }

  }, wormDisplayTime);

}

//A function to choose the random time for the worms.
function randomTime(minimum, maximum) {
  return Math.floor(Math.random() * (maximum - minimum)) + minimum;
}

//A function to choose the random holes for the worms to pop out.
function randomHole(holes) {
  const index = Math.floor(Math.random() * holes.length);
  const hole = holes[index];
  return hole;
}

//After collecting the worms, calculate the score, miss, and worm counts.
function collectWorms(eventObject) {
  //Stopping the event propagation to the parent(hole).
  eventObject.stopPropagation();
  //Getting the collected worm element.
  const wormTarget = eventObject.target;
  //Hiding the collected worm.
  wormTarget.style.display = "none";
  //Calculating the score, choosing the worm tray image based on the collected worm type, and playing the hitSound audio.
  score += 5;
  if (sound === "on") {
    hitSound.currentTime = 0;
    hitSound.play();
  }
  //Incrementing count for each worm collection.
  count++;
  //Displaying score and worm count.
  scoreDisplay.textContent = score;
  wormCountDisplay.textContent = count;
  //Adding the corresponding worm tray image to the tray.
  const trayImg = document.createElement("img");
  trayImg.src = "images/wormtray.png";
  trayImg.alt = "Worm";
  tray.appendChild(trayImg);
}

//Getting back to the index page by clicking the home button.
homeButton.addEventListener("click", function () {
  window.location.href = "index.html";
});


//Resetting the tray.
function resetTray() {
  while (tray.firstChild) {
    tray.removeChild(tray.firstChild);
  }
}

//Setting event listener for the gameBoard to calculate the miss.
gameBoard.addEventListener("click", function (eventObject) {
  if (gameOn && eventObject.target.className === "gameBoard") {
    missWorm();
  }
});

//Cursor customization.
//Getting the mouse pointer position.
document.addEventListener("mousemove", function (eventObject) {
  //Setting the x and y positions for the custom cursor.
  cursor.style.left = eventObject.pageX - 20 + "px";
  cursor.style.top = eventObject.pageY - 20 + "px";
});

//Styling the cursor for mouse down event.
document.addEventListener("mousedown", function () {
  //Changing the gloves to closed hand on mouse down.
  cursor.style.backgroundImage = `url("${closeHand}")`;
  cursor.style.transform = "rotate(-45deg)";
});

//Styling the cursor for mouse up event.
document.addEventListener("mouseup", function () {
  //Changing the cursor to open hand on mouse up.
  cursor.style.backgroundImage = `url("${openHand}")`;
  cursor.style.transform = "none";
});

// A function to close the popup window by clicking the close button.
function closePopUp() {
  //Hiding the popup window.
  popUpWindow.style.display = "none";
  //Resetting all the elements.
  score = 0;
  misses = 0;
  timeLeft = 20;
  count = 0;
  scoreDisplay.textContent = score;
  missesDisplay.textContent = misses;
  wormCountDisplay.textContent = count;
  timerElement.textContent = "20";
  resetTray();
  //Enabling all the buttons.
  startButton.disabled = false;
  homeButton.disabled = false;
}

