// Selecting all required tags or elements

const wrapper = document.querySelector('.wrapper'),
musicImg = wrapper.querySelector('.img-area img'),
musicName = wrapper.querySelector('.song-details .name'),
musicArtist = wrapper.querySelector('.song-details .artist'),
musicAudio = wrapper.querySelector('#music-audio'),
playPauseBtn = wrapper.querySelector('.play-pause'),
prevBtn = wrapper.querySelector('#prev'),
nextBtn = wrapper.querySelector('#next'),
progressArea = wrapper.querySelector('.progress-area'),
progressBar = wrapper.querySelector('.progress-bar'),

musicList = wrapper.querySelector('.music-list'),
showMoreBtn = wrapper.querySelector('#more-music'),
hideMusicBtn = wrapper.querySelector('#close');


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

// Update Progress Bar Width according to the music's current play time
musicAudio.addEventListener('timeupdate', (e)=> {
    // Get current time in song
    const currentTime = e.target.currentTime;

    // Get total duration of song
    const duration = e.target.duration;

    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = wrapper.querySelector('.current');
    let musicDuration = wrapper.querySelector('.duration');
    musicAudio.addEventListener('loadeddata', ()=>{

        //Update song total duration
        let audioDuration = musicAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);

        // Add a leading zero if seconds is less than 10
        if(totalSec < 10) {
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;
    });
    //Update current song's time
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    
    // Add a leading zero if seconds is less than 10
    if(currentSec < 10) {
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

//update the playing song's current time according to the progress bar's width
progressArea.addEventListener('click', (e)=> {
    // Get width of progress bar
    let progressWidthVal = progressArea.clientWidth; 
    // Get offset x value
    let clickedOffSetX = e.offsetX; 
    // Get total song duration
    let songDuration = musicAudio.duration;

    musicAudio.currentTime = (clickedOffSetX / progressWidthVal) * songDuration;
    playMusic();
});

// Repeat functionality: shuffle the songs according to the icon
const repeatBtn = wrapper.querySelector('#repeat-plist');
repeatBtn.addEventListener('click', ()=> {
    // First get the innerText of the icon, then change accordingly
    let getText = repeatBtn.innerText;

    // Change icon based on click using switch statement
    switch(getText) {
        // if icon is currently repeat, then change to repeat_one
        case "repeat": 
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "Song Looped");
            break;

        // if icon is currently repeat_one, then change to shuffle
        case "repeat_one":
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute("title", "Playlist Shuffled");
            break;

         // if icon is currently shuffle, then change it back to repeat
         case "shuffle":
            repeatBtn.innerText = "repeat";
            repeatBtn.setAttribute("title", "Playlist Looped");
            break;
    }
});

// Icon changed, functionality after song has ended

musicAudio.addEventListener('ended', ()=> {
    // According to the icon, if the user has set it to loop a song, we'll repeat the 
    // current song

    // Get innerText of icon
    let getText = repeatBtn.innerText;
    switch(getText) {
        // if icon is currently repeat, then call the nextMusic function so that the
        // next song will play
        case "repeat": 
            nextSong();
            console.log("Playing next Song");
            break;

        // if icon is currently repeat_one, then we will change the current time of
        // the current song to 0, simulating the repeating of the song
        case "repeat_one":
            musicAudio.currentTime = 0;
            loadMusic(musicIndex);
            playMusic();
            break;

         // if icon is currently shuffle, then change it back to repeat
         case "shuffle":
            // Generate random index between the max range of songs array length
            let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            do {
                randIndex = Math.floor((Math.random() * allMusic.length) + 1);
                // Continue generating a random index until it is not equal to current song
            } while(randIndex == musicIndex); 
            // Update the musicIndex to the random index so that the randomly chosen
            // song will play
            musicIndex = randIndex 
            
            // Calling loadMusic function to actually select the song
            loadMusic(musicIndex);
            // Calling playMusic() to actually play current song
            playMusic();
            break;
    }
});

showMoreBtn.addEventListener('click', ()=> {
    musicList.classList.toggle("show");
    console.log("Showing list");
});

hideMusicBtn.addEventListener('click', ()=> {
    showMoreBtn.click();
});

const ulTag = wrapper.querySelector('ul');

// Create li according to array length
for (let i = 0; i < allMusic.length; i++) {
    // Pass song name, artist from the array to a <li>
    let liTag = `<li li-index="${i + 1}">
                <div class="row">
                  <span>${allMusic[i].name}</span>
                  <p>${allMusic[i].artist}</p>
                </div>
                <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
                <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
              </li>`;
}