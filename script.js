// Sample data for songs
const songs = [
    { id: 1, name: 'Shape Of You', artist: 'Ed Sheeran', genre: 'Pop', img: './assets/shape.jpg', source: './assets/Shape of you.mp3' },
    { id: 2, name: 'All Of Me', artist: 'John Legend', genre: 'Pop', img: './assets/all of me.jpg', source: './assets/All of me.mp3' },
    { id: 3, name: 'Wonderwall', artist: 'Oasis', genre: 'Rock', img: './assets/wonderwall.jpg', source: './assets/Wonderwall.mp3' },
    { id: 4, name: 'Sugar', artist: 'Maroon 5', genre: 'Pop', img: './assets/sugar.jpg', source: './assets/Sugar Maroon 5.mp3' },
    { id: 5, name: 'What A Wonderful World', artist: 'Louis Armstrong', genre: 'Jazz', img: './assets/wonderfull.jpg', source: './assets/What a wonderful world.mp3' },
    { id: 6, name: 'My Funny Valentine', artist: 'Mitzi Green', genre: 'Jazz', img: './assets/valentine.jpg', source: './assets/My funny valentine.mp3' },
    { id: 7, name: 'First Person Shooter', artist: 'Drake', genre: 'Hip Hop', img: './assets/first person shooter.jpg', source: './assets/First person shooter.mp3' },
    // Add more songs here
];

// Global state
let currentSongIndex = 0;
let playlists = [];

// DOM elements
const genreFilter = document.getElementById('genre-filter');
const songsList = document.getElementById('songs-list');
const currentSongName = document.getElementById('song-name');
const currentSongArtist = document.getElementById('song-artist');
const currentSongImg = document.getElementById('song-img');
const audioPlayer = document.getElementById('audio-player');
const audioSource = document.getElementById('audio-source');
const prevButton = document.getElementById('prev-song');
const nextButton = document.getElementById('next-song');
const addToPlaylistButton = document.getElementById('add-to-playlist');
const newPlaylistNameInput = document.getElementById('new-playlist-name');
const createPlaylistButton = document.getElementById('create-playlist');
const playlistsList = document.getElementById('playlists-list');
const themeToggleButton = document.getElementById('theme-toggle');

document.addEventListener('DOMContentLoaded', () => {
    renderSongsList(); // Render the initial list with all songs
    renderPlaylistsList(); // Render the playlists list
    genreFilter.addEventListener('change', renderSongsList); // Add event listener for genre selection
    prevButton.addEventListener('click', playPreviousSong);
    nextButton.addEventListener('click', playNextSong);
    addToPlaylistButton.addEventListener('click', addToPlaylist);
    createPlaylistButton.addEventListener('click', createPlaylist);
    themeToggleButton.addEventListener('click', toggleTheme);
});

function renderSongsList() {
    const genre = genreFilter.value; // Get selected genre
    songsList.innerHTML = ''; // Clear previous song list

    // Filter songs based on selected genre
    const filteredSongs = genre === 'All' ? songs : songs.filter(song => song.genre === genre);

    // Render each song in the filtered list
    filteredSongs.forEach((song, index) => {
        const songItem = document.createElement('button');
        songItem.textContent = `${song.name} - ${song.artist}`;
        songItem.className = 'song-item';
        songItem.addEventListener('click', () => playSong(index));
        songsList.appendChild(songItem);
    });

    // Display a message if no songs match the selected genre
    if (filteredSongs.length === 0) {
        const noSongsMessage = document.createElement('p');
        noSongsMessage.textContent = 'No songs available for this genre.';
        songsList.appendChild(noSongsMessage);
    }
}

function playSong(index) {
    currentSongIndex = index;
    const song = songs[currentSongIndex];
    currentSongName.textContent = song.name;
    currentSongArtist.textContent = song.artist;
    currentSongImg.src = song.img;
    audioSource.src = song.source;
    audioPlayer.load();
    audioPlayer.play();
}

function playPreviousSong() {
    if (currentSongIndex > 0) {
        currentSongIndex--;
        playSong(currentSongIndex);
    }
}

function playNextSong() {
    if (currentSongIndex < songs.length - 1) {
        currentSongIndex++;
        playSong(currentSongIndex);
    }
}

function addToPlaylist() {
    const playlistName = prompt('Enter the playlist name:');
    if (playlistName) {
        let playlist = playlists.find(p => p.name === playlistName);
        if (!playlist) {
            playlist = { name: playlistName, songs: [] };
            playlists.push(playlist);
        }
        playlist.songs.push(songs[currentSongIndex]);
        renderPlaylistsList();
    }
}

function createPlaylist() {
    const playlistName = newPlaylistNameInput.value.trim();
    if (playlistName && !playlists.find(p => p.name === playlistName)) {
        playlists.push({ name: playlistName, songs: [] });
        newPlaylistNameInput.value = '';
        renderPlaylistsList();
    }
}

function renderPlaylistsList() {
    playlistsList.innerHTML = '';
    playlists.forEach(playlist => {
        const playlistItem = document.createElement('div');
        playlistItem.className = 'playlist-item';
        playlistItem.textContent = playlist.name;
        playlistItem.addEventListener('click', () => viewPlaylist(playlist.name));
        playlistsList.appendChild(playlistItem);
    });
}

function viewPlaylist(playlistName) {
    const playlist = playlists.find(p => p.name === playlistName);
    if (playlist && playlist.songs.length > 0) {
        alert(`Playlist: ${playlist.name}\nSongs: ${playlist.songs.map(s => s.name).join(', ')}`);
    } else {
        alert('This playlist is empty.');
    }
}

function toggleTheme() {
    document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
}
