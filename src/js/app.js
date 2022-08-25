// Selecting all required tags or elements

const wrapper = document.querySelector('.wrapper');
musicImg = wrapper.querySelector('.img-area img');
musicName = wrapper.querySelector('.song-details .name');
musicArtist = wrapper.querySelector('.song-details .artist');
musicAudio = wrapper.querySelector('#music-audio');
playPauseBtn = wrapper.querySelector('.play-pause');
prevBtn = wrapper.querySelector('#prev');
nextBtn = wrapper.querySelector('#next');

let musicIndex = 3;

// Call the load music function when window is loaded
window.addEventListener("load", ()=> {
    loadMusic(musicIndex); 
})



// Loading music function
function loadMusic(indexNum) {
    musicName.innerText = allMusic[indexNum - 1].name;
    musicArtist.innerText = allMusic[indexNum - 1].artist;
    musicImg.src = `images/${allMusic[indexNum - 1].img}.jpg`;
    musicAudio.src = `songs/${allMusic[indexNum - 1].src}.mp3`
}

// Play Music Function
function playMusic() {
    wrapper.classList.add("paused");
    // Show the pause icon when we are playing the music
    playPauseBtn.querySelector("i").innerText = "pause";
    musicAudio.play();
}

// Pause Music Function
function pauseMusic() {
    wrapper.classList.remove("paused");
    // Show the play arrow icon when we are paused
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    musicAudio.pause();
}

// Next song function
function nextSong() {
    musicIndex++;
    // if music index exceeds the total amount of songs in allMusic,
    // then musicIndex will be set to the first song (1)
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

// Previous song function
function prevSong() {
    musicIndex--;
    // if music indexis less than 1,
    // then musicIndex will be set to the last song (allMusic.length)
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

// Play Music Button Event
playPauseBtn.addEventListener('click', ()=> {
    const isMusicPaused = wrapper.classList.contains("paused");
    // If isMusicPaused is true then call pauseMusic else call playMusic
    isMusicPaused ? pauseMusic() : playMusic();
});

nextBtn.addEventListener('click', ()=> {
    nextSong(); // Call the next music function
});

prevBtn.addEventListener('click', ()=> {
    prevSong(); // Call the next music function
});