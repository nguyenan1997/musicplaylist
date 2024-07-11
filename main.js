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
        path: 'musics/tu-su.mp3',
        displayName: 'Tự Sự (Qua Bển Làm Chi OST)',
        cover: 'images/tu-su.jpg',
        artist: 'Orange',
    },
    {
        path: 'musics/motdoi.mp3',
        displayName: 'Một Đời',
        cover: 'images/mot-doi.jpg',
        artist: 'm14 Casper, Bon Nghiêm, buitruonglinh',
    },
    {
        path: 'musics/dunglamtraitimanhdau.mp3',
        displayName: 'Đừng Làm Trái Tim Anh Đau',
        cover: 'images/dunglamtraitimanhdau.jpg',
        artist: 'Sơn Tùng MTP',
    },
    {
        path: 'musics/timmotnguoinhuthe.mp3',
        displayName: 'Tìm một người như thế',
        cover: 'images/timmotnguoinhuthe.jpg',
        artist: 'Nguyễn Ngọc Anh',
    },
    {
        path: 'musics/baotienmotmobinhyen.mp3',
        displayName: 'Bao Tiền Một Mớ Bình Yên',
        cover: 'images/baotienmotmobinhyen.jpg',
        artist: '14 Casper & Bon Nghiêm (Official)(Track 09 - Album `SỐ KHÔNG`)',
    },
    {
        path: 'musics/ngoinhahanhphuc.mp3',
        displayName: 'Ngôi Nhà Hạnh Phúc',
        cover: 'images/ngoinhahanhphuc.jpg',
        artist: 'Thuỳ Tiên',
    },
    {
        path: 'musics/neulucdo.mp3',
        displayName: 'Nếu Lúc Đó',
        cover: 'images/neulucdo.jpg',
        artist: 'tlinh',
    },
    {
        path: 'musics/tinhyeuvinhvienkhongmatdi.mp3',
        displayName: 'Tình Yêu Vĩnh Viễn Không Mất Đi',
        cover: 'images/tinhyeuvinhvienkhongmatdi.jpg',
        artist: 'Thiện Y Thuần',
    },
    {
        path: 'musics/tinhcubaogiocungtothon.mp3',
        displayName: 'Tình Cũ Bao Giờ Cũng Tốt Hơn',
        cover: 'images/tinhcubaogiocungtothon.jpg',
        artist: 'Dương Hoàng Yến',
    },
    {
        path: 'musics/khongphaiemdungkhong.mp3',
        displayName: 'Không Phải Em Đúng Không',
        cover: 'images/khongphaiemdungkhong.jpg',
        artist: 'Dương Hoàng Yến',
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
    const {duration,currentTime} = music;
    const progressPercent = (currentTime/duration) * 100;
    progress.style.width = `${progressPercent}%`;
    const formatTime = (time) => String(Math.floor(time)).padStart(2,'0');
    durationEl.textContent = `${formatTime(duration/60)} : ${formatTime(duration%60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime/60)} : ${formatTime(currentTime % 60)}`;
}

function setProgressBar(a){
    const width = playerProgress.clientWidth;
    const clickX = a.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click',setProgressBar);
loadMusic(songs[musicIndex]);














