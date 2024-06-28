const drumButtons = document.querySelectorAll(".drum-button");
const channelButtons = document.querySelectorAll(".channel");
const recordButton = document.getElementById("record-button");
const playButton = document.getElementById("play-button");
const stopButton = document.getElementById("stop-button");
const clearButton = document.getElementById("clear-button");

const sounds = {
  a: new Audio("./Sounds/boom.wav"),
  s: new Audio("./Sounds/clap.wav"),
  d: new Audio("./Sounds/hihat.wav"),
};

// Pamięć audio dla kanałów
const audioMemory = {
  channel1: [],
  channel2: [],
  channel3: [],
  channel4: [],
};

let isRecording = false;
let currentChannel = null;

// Funkcja odtwarzania dźwięku
function playSound(key) {
  const sound = sounds[key];
  if (sound) {
    sound.currentTime = 0;
    sound.play();
    if (isRecording && currentChannel) {
      const time = Date.now();
      audioMemory[currentChannel].push({ key, time });
    }
  }
}

// Nagrywanie
function startRecording() {
  if (currentChannel) {
    isRecording = true;
    console.log(`Nagrywanie ${currentChannel}`);
  } else {
    console.log("Wybierz kanał przed nagrywaniem.");
  }
}

// Funkcjonalność przycisku odtwarzania
function playRecording() {
  if (currentChannel) {
    playChannel(audioMemory[currentChannel]);
  } else {
    console.log("Wybierz kanał przed odtwarzaniem.");
  }
}

async function playChannel(channelData) {
  if (channelData.length > 0) {
    const startTime = Date.now();

    for (let index = 0; index < channelData.length; index++) {
      const { key, time } = channelData[index];
      const currentTime = Date.now() - startTime;
      const delay = time - channelData[0].time - currentTime;

      if (delay > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      playSound(key);
    }
  } else {
    console.log("Kanał jest pusty.");
  }
}

function stopRecording() {
  if (isRecording) {
    isRecording = false;
    console.log(`${currentChannel} zapisane:`, audioMemory[currentChannel]);
  } else {
    console.log("Nagrywanie zostało zatrzymane.");
  }
}

function clearRecording() {
  Object.keys(audioMemory).forEach((channel) => {
    audioMemory[channel] = [];
  });
  console.log("Wszystkie ścieżki wyczyszczone.");
}

function handleKeyPress(ev) {
  const key = ev.key.toLowerCase();
  if (key in sounds) {
    playSound(key);
  }
}

drumButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.getAttribute("data-key");
    playSound(key);
  });
});

channelButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentChannel = `channel${button.getAttribute("data-channel")}`;
    console.log(`Wybrano ${currentChannel}`);
  });
});

recordButton.addEventListener("click", startRecording);
playButton.addEventListener("click", playRecording);
stopButton.addEventListener("click", stopRecording);
clearButton.addEventListener("click", clearRecording);
document.addEventListener("keypress", handleKeyPress);
