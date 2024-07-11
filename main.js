const image = document.getElementById('cover');
const title = document.getElementById('music-title');
const artist = document.getElementById('music-artist');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const playerProgress = document.getElementById('player-progress');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const playBtn = document.getElementById('play');
const background = document.getElementById('bg-img');

const music = new Audio();
const songs = [
    {
        path: 'musics/emcuangayhomqua.mp3',
        displayName: 'Em Của Ngày Hôm Qua',
        cover: 'images/emcuangayhomqua.png',
        artist: 'Sơn Tùng MTP',
    },
    {
        path: 'musics/nangamxadan.mp3',
        displayName: 'Nắng Ấm Xa Dần',
        cover: 'images/emcuangayhomqua.png',
        artist: 'Sơn Tùng MTP',
    },
    {
        path: 'musics/conmuangangqua2.mp3',
        displayName: 'Cơn Mưa Ngang Qua 2',
        cover: 'images/emcuangayhomqua.png',
        artist: 'Sơn Tùng MTP',
    },
    {
        path: 'musics/emdungdi.mp3',
        displayName: 'Em Đừng Đi',
        cover: 'images/emcuangayhomqua.png',
        artist: 'Sơn Tùng MTP',
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay(){
    if(isPlaying){
        pauseMusic()
    }
    else{
        playMusic()
    }
}

function playMusic(){
    isPlaying = true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','Pause');
    music.play()
}

function pauseMusic(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause()
}


function loadMusic(song){
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}


function changeMusic(direction){
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}


function updateProgressBar(){
    const { duration,currentTime } = music;
    const progressPercent = (currentTime/duration) * 100;
    progress.style.width = `${progressPercent}%`;
    const formatTime = (time) => String(Math.floor(time).padStart(2, '0'));
    durationEl.textContent = `${formatTime(duration/ 60)} : ${formatTime(duration / 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e){
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click',setProgressBar);
loadMusic(songs[musicIndex]);

















