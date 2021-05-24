
const searchSongs = () => {
    const searchText = document.getElementById('search-field').value;
    if (searchText == '') {
        alert('Please enter your artist song name')
    } else {
        const url = `https://api.lyrics.ovh/suggest/${searchText}`;
        fetch(url)
            .then(response => response.json())
            .then(data => displaySongs(data.data))
            .catch(error => displayError('Something Went Wrong!! Please try again later!'));
    }
}


const displaySongs = (songs) => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerHTML = '';
    const errorTag = document.getElementById('error-message');
    errorTag.innerHTML = '';
    for (let i = 0; i < songs.length; i++) {
        const song = songs[i];
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `;
        songContainer.appendChild(songDiv);
    }
}


const getLyrics = (artist,title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayLyrics(data.lyrics))
        .catch(error => displayError('Sorry! Failed to load lyrics, Please try again later!!!'));
}


const displayLyrics = lyrics => {
    const errorTag = document.getElementById('error-message');
    errorTag.innerHTML = '';
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerText = lyrics;
}


const displayError = error => {
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerHTML = '';
    const errorTag = document.getElementById('error-message');
    errorTag.innerText = error;
}