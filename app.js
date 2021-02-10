const searchSongs = () =>{
    const searchText = document.getElementById('search-field').value; 
    const url =  `https://api.lyrics.ovh/suggest/${searchText}`
    // const res= await fetch(url)
    // const data= await res.json()
    // displaySongs(data.data);
    fetch(url)
    .then(res => res.json())
    .then(data=> displaySongs(data.data))
    .catch(error=> displayError(error))
}
const displaySongs = songs =>{
    const songContainer = document.getElementById('song-container');
    clearInput();
    clearDisplay();

    songs.forEach(song => {
        //console.log(song);
        const songDiv = document.createElement('Div');
        songDiv.className = "search-result col-md-8 mx-auto py-4";
        songDiv.innerHTML = `
        <div class="single-result row align-items-center my-3 p-3">
        <div class="col-md-9">
            <h3 class="lyrics-name">'${song.title}'</h3>
            <p class="author lead">Album by <span>'${song.artist.name}'</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
               
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyrics('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        </div>
        `
        
        songContainer.appendChild(songDiv);
        
    });
}
//get lyrics
const getLyrics = async (artist, title) =>{
    const url= `https://api.lyrics.ovh/v1/${artist}/${title}`;
    try{
        const res= await fetch(url)
    const data=await res.json()
    displayLyrics(data.lyrics);
    }
    catch(error){
        displayError(error);
    }
    
}
const displayLyrics = lyrics =>{
    const songLyrics = document.getElementById('song-lyrics');
    songLyrics.innerText= lyrics;
}
//clear input field
const clearInput= () =>{
    document.getElementById('search-field').value=""; 
}
//clear display
const clearDisplay= () =>{
    document.getElementById('song-container').innerHTML="";
    document.getElementById('song-lyrics').innerText="";
}
//display Error 
const displayError = error=>{
    const errorTag= document.getElementById('error-tag');
    errorTag.innerText = error;
}