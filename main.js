const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const progress = document.getElementById("progress");
const outer_div = document.getElementById("outer_div");

let now_playing = document.querySelector(".now-playing");
let track_name = document.querySelector(".track-name");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");

let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

//Canvas Logic
function CanvasBars() {
  canvas.width = 1000;
  canvas.height = 200;
  context.fillStyle = "brown";
  let arr = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 100));
  for (let i = 0; i < arr.length; i += 9) {
    arr[i] = -arr[i];
    // i++;
  }
  // console.log(arr);
  for (let i = 0; i < arr.length; i++) {
    context.fillRect(i, 100, 8, -arr[i]);
    i = i + 5;
  }
}

// Create new audio element
let curr_track = document.createElement("audio");

// Define the tracks that have to be played
let track_list = [
  {
    name: "Despacito",
    path: "./Songs/Despacito.mp3",
  },
  {
    name: "Closer",
    path: "./Songs/Closer.mp3",
  },
  {
    name: "Love Me Like You Do",
    path: "./Songs/Love.mp3",
  },
];

function random_bg_color() {
  // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  // Set the background to that color
  document.body.style.backgroundColor = bgColor;
}

function loadTrack(track_index) {
  CanvasBars();
  clearInterval(updateTimer);
  resetValues();

  now_playing.innerText =
    "PLAYING " + (track_index + 1) + " OF " + track_list.length;
  track_name.textContent = track_list[track_index].name;

  curr_track.src = track_list[track_index].path;
  // console.log("curr_track.src:", curr_track.src);
  curr_track.load();

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

// Load the first track in the tracklist
loadTrack(track_index);

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "99:99";
  seek_slider.value = 0;
}

function playpauseTrack() {
  if (!isPlaying) {
    playTrack();
  } else {
    pauseTrack();
  }
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
  if (track_index < track_list.length - 1) {
    track_index += 1;
  } else {
    track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0) {
    track_index -= 1;
  } else {
    track_index = track_list.length - 1;
  }
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seek_to = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seek_to;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    // console.log("seekPosition:", seekPosition);
    seek_slider.value = seekPosition;
    progress.style.width = `${Number(seekPosition)}%`;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    curr_time.textContent = `${currentMinutes}:${currentSeconds}`;
    total_duration.textContent = `${durationMinutes}:${durationSeconds}`;
  }
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = curr_track.duration;

  curr_track.currentTime = (clickX / width) * duration;
  // console.log("curr_track.currentTime:", curr_track.currentTime);
}

outer_div.addEventListener("click", setProgress);
