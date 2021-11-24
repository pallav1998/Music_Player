let now_playing = document.querySelector(".now-playing");
let track_name = document.querySelector(".track-name");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");

let track_index = 0;
let isPlaying = false;

// Create new audio element
let curr_track = document.createElement("audio");

// Define the tracks that have to be played
let track_list = [
  {
    name: "Closer",
    path: "/Songs/Closer.mp3",
  },
  {
    name: "Despacito",
    path: "E:/MASAI Repo/Company/Songs/Despacito.mp3",
  },
  {
    name: "Love Me Like You Do",
    path: "E:/MASAI Repo/Company/Songs/Love_Me_Like_You_Do.mp3",
  },
];

function loadTrack(track_index) {


  now_playing.innerText =
    "PLAYING " + (track_index + 1) + " OF " + track_list.length;
  track_name.textContent = track_list[track_index].name;

  curr_track.src = track_list[track_index].path;
  console.log("curr_track.src:", curr_track.src);
  curr_track.load();
}

// Load the first track in the tracklist
loadTrack(track_index);


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


