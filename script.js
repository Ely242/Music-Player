let song = document.getElementById('song');
let progress = document.getElementById('progress');
let volumeSlider = document.querySelector('.volume-slider');
let albumArt = document.querySelector('.album-art');
let trackTitle = document.querySelector('.track-title');
let trackArtist = document.querySelector('.track-artist');
let ctrl = document.getElementById('ctrl');

let tracks = [
    {
        title: 'Last Last',
        artist: 'Burna Boy',
        src: 'audio/last-last.mp3',
        cover: 'images/burna-boy.png'
    },
    {
        title: 'Wonderful',
        artist: 'Burna Boy',
        src: 'audio/wonderful.mp3',
        cover: 'images/wonderful.jpg'
    },
    {
        title: 'Dumebi',
        artist: 'Rema',
        src: 'audio/dumebi.mp3',
        cover: 'images/dumebi.jpg'
    },
    {
        title: 'Rush',
        artist: 'Ayra Starr',
        src: 'audio/rush.mp3',
        cover: 'images/rush.png'
    },
    {
        title: 'Higher',
        artist: 'Tems',
        src: 'audio/higher.mp3',
        cover: 'images/higher.jpg'
    }
];

let currentTrack = 0;

song.onloadedmetadata = () => {
    progress.max = song.duration; // No rounding — full precision
    progress.step = 0.01;
    progress.value = song.currentTime;

    updateProgressBarBackground(progress.value, progress.max);

    albumArt.src = tracks[currentTrack].cover;
    trackTitle.textContent = tracks[currentTrack].title;
    trackArtist.textContent = tracks[currentTrack].artist;

    ctrl.innerHTML = '<i class="fas fa-pause"></i>';
};

function playPause() {
    if (song.paused) {
        song.play();
        ctrl.innerHTML = '<i class="fas fa-pause"></i>';
    } 
    else {
        song.pause();
        ctrl.innerHTML = '<i class="fas fa-play"></i>';
    }
}

progress.onchange = function() {
    song.currentTime = progress.value;
    let percent = (progress.value / progress.max) * 100;
    progress.style.background = `linear-gradient(to right, #1db954 ${percent}%, #282828 ${percent}%)`;
};


// Keep progress in sync
song.addEventListener('timeupdate', () => {
    progress.value = song.currentTime;
    updateProgressBarBackground(progress.value, progress.max);
});


progress.addEventListener('input', () => {
    song.currentTime = progress.value;
    updateProgressBarBackground(progress.value, progress.max);
});

// Handle volume
volumeSlider.addEventListener('input', e => {
    song.volume = e.target.value / 100;
});

// Change button when song ends
song.addEventListener('ended', () => {
    // Move to next track, looping to start if at end
    currentTrack = (currentTrack + 1) % tracks.length;
    
    // Update audio source and UI
    song.src = tracks[currentTrack].src;
    albumArt.src = tracks[currentTrack].cover;
    trackTitle.textContent = tracks[currentTrack].title;
    trackArtist.textContent = tracks[currentTrack].artist;
    
    // Load the new audio metadata and play
    song.load();
    song.play();
    
    // Update play/pause icon to pause (playing)
    ctrl.innerHTML = '<i class="fas fa-pause"></i>';
});

function prevTrack() {
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    loadTrack();
}

function nextTrack() {
    currentTrack = (currentTrack + 1) % tracks.length;
    loadTrack();
}

function loadTrack() {
    song.src = tracks[currentTrack].src;
    albumArt.src = tracks[currentTrack].cover;
    trackTitle.textContent = tracks[currentTrack].title;
    trackArtist.textContent = tracks[currentTrack].artist;
    song.load();
    song.play();
    ctrl.innerHTML = '<i class="fas fa-pause"></i>';
}

function updateProgressBarBackground(value, max) {
    let percent = (value / max) * 100;
    progress.style.background = `linear-gradient(to right, #1db954 ${percent}%, #282828 ${percent}%)`;
}