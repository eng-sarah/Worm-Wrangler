// Elements.
const soundCheckBox = document.getElementById("soundCheckBox");
const volumeSlider = document.getElementById("volumeSlider");
const adjustVolume = document.getElementById("adjustVolume");
const goToGameButton = document.getElementById("goToGameButton");
const glove1 = document.getElementById("glove1");
const glove2 = document.getElementById("glove2");
const glove3 = document.getElementById("glove3");

//Storing sound data in session storage.
let sound = "off";
let volumeValue = "0";
sessionStorage.setItem("sound", sound);
sessionStorage.setItem("volume", volumeValue);

// Storing glove data in session storage.
sessionStorage.setItem("openHand", "images/openHand1.png");
sessionStorage.setItem("closeHand", "images/closeHand1.png");

//Event listeners.
soundCheckBox.addEventListener("change", soundCheck);
goToGameButton.addEventListener("click", goToGame);
glove1.addEventListener("click", gloveSelect);
glove2.addEventListener("click", gloveSelect);
glove3.addEventListener("click", gloveSelect);
volumeSlider.addEventListener("input", volumeCheck);

// Sound checkbox function.
function soundCheck() {
  //Checking sound checkbox is checked or not.
  if (soundCheckBox.checked) {
    // Displaying volume slider and corresponding text.
    volumeSlider.style.display = "block";
    adjustVolume.style.display = "block";
    //Storing sound and volume data.
    sound = "on";
    sessionStorage.setItem("sound", sound);
    volumeValue = "5";
    sessionStorage.setItem("volume", volumeValue);
  } else {
    //Hiding volume slider and corresponding text.
    volumeSlider.style.display = "none";
    adjustVolume.style.display = "none";
    //Storing sound and volume data.
    sound = "off";
    sessionStorage.setItem("sound", sound);
    volumeValue = "0";
    sessionStorage.setItem("volume", volumeValue);
  }
}

// Opening the game page.
function goToGame() {
  window.location.href = "gamePage.html";
}

//A function to select the gloves and store it in the session storage.
function gloveSelect(eventObject) {
  const glove = eventObject.target.id;
  //If the selected glove is glove1 set the border for glove1 and remove border for other two divs, glove2 and glove3.
  if (glove === "glove1") {
    glove1.style.border = "2px solid black";
    glove2.style.border = "0px";
    glove3.style.border = "0px";
    sessionStorage.setItem("openHand", "images/openHand1.png");
    sessionStorage.setItem("closeHand", "images/closeHand1.png");

  }
  //If the selected glove is glove2 set the border for glove2 and remove border for other two divs, glove1 and glove3.
  else if (glove === "glove2") {
    glove2.style.border = "2px solid black";
    glove1.style.border = "0px";
    glove3.style.border = "0px";
    sessionStorage.setItem("openHand", "images/openHand2.png");
    sessionStorage.setItem("closeHand", "images/closeHand2.png");

  }
  //If the selected glove is glove3 set the border for glove3 and remove border for other two divs, glove1 and glove2.
  else {
    glove3.style.border = "2px solid black";
    glove1.style.border = "0px";
    glove2.style.border = "0px";
    sessionStorage.setItem("openHand", "images/openHand3.png");
    sessionStorage.setItem("closeHand", "images/closeHand3.png");

  }
}

// Volume slider function.
function volumeCheck(eventObject) {
  //Getting volume level.
  volumeValue = eventObject.target.value;
  //Storing volume data.
  sessionStorage.setItem("volume", volumeValue);
}