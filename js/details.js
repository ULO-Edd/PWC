"use strict"

getTrackDetails();

function getTrackDetails(){
    const parametros = window.location.search;
    const parametrosURL = new URLSearchParams(parametros);

    var track = parametrosURL.get('name');
    var artist = parametrosURL.get('artist');

    
    $.ajax({
        method: "GET",
        url: "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist="+ artist + "&api_key=c298e8e7f8045bda196a9b69d88b2304&format=json"
    })
    .done(function (imgArt) {
        $('.image_artista').attr('src', imgArt.artist.image[1]["#text"]);
    })

    $.ajax({
        method: "GET",
        url: "http://ws.audioscrobbler.com/2.0/?method=track.getInfo" + "&api_key=c298e8e7f8045bda196a9b69d88b2304&artist=" + artist + "&track=" +track + "&format=json"
    })
    .done(function (msg) {
        var album = msg.track.album;
        var artistName = msg.track.artist.name;
        var musicName = msg.track.name;
        
        if (album != null){
            $('.detail_album').text(album.title);
            $.ajax({
                method: "GET",
                url: "http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=c298e8e7f8045bda196a9b69d88b2304&format=json",
                data: {
                    artist: artistName,
                    album: msg.track.album.title
                }
            })
            .done(function (detailAlbum) {
                $('.image_album').attr('src', detailAlbum.album.image[1]["#text"]);
            })
        }
        
        $('.detail_nome').text(musicName);
        $('.detail_artista').text(artistName);
        
        var favouriteButton = document.createElement("button");
        var icon = document.createElement("i");
        icon.classList.add("fas");
        icon.classList.add("fa-heart");

        //Verificar se música está nos favoritos
        if (localStorage.getItem(musicName) === null) { //musica não está nos favoritos
            favouriteButton.value = musicName+ "___" + artistName;
            // Quando se clicar no botao, adicionar aos favoritos
            $(favouriteButton).on('click', favouriteButton, function () {
                var splittedString = this.value.split("___");
                var songName = splittedString[0];
                var artisttName = splittedString[1];
                // Colocar musica no local storage
                localStorage.setItem(songName, artisttName);
                this.classList.add("btn-danger");
                window.location.href = "favoritos.html";
            });
        } else { //música está nos favoritos
            favouriteButton.value = msg.track.name + "___" + msg.track.artist;
            favouriteButton.classList.add("btn-danger");
            // Quando se clicar no bota, remover dos favoritos
            $(favouriteButton).on('click', favouriteButton, function () {
                var songName = this.value.split("___")[0];
                localStorage.removeItem(songName);
                this.className = '';
                window.location.href = "favoritos.html";
            });
        }
        favouriteButton.appendChild(icon);
        $('.favoritos').append(favouriteButton);
    });
    
}
