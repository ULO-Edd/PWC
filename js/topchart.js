topchart();

function topchart(){
    var cloneMedia = $('.trackRow').clone();

    $('.media-list').html('');

    $.ajax({
        method: "GET",
        url: "http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=portugal&api_key=c298e8e7f8045bda196a9b69d88b2304&format=json"
        })
        .done(function (msg) {
            msg.tracks.track.forEach(function (result) {
                var liMedia = cloneMedia.clone();
                var detailButton = document.createElement("a");
                $(detailButton).text("Abrir");
                $(detailButton).attr('href', "details.html?name=" + result.name + "&artist=" + result.artist.name);
                $('.detahes', liMedia).append(detailButton);
                $('#image', liMedia).attr('src', result.image[2]["#text"])
                $('.title', liMedia).text(result.name);
                $('.artista', liMedia).text(result.artist.name);
                $('.ouvintes', liMedia).text(result.listeners);

                var favouriteButton = document.createElement("button"); //Criar Elemento
                favouriteButton.value = result.name + "___" + result.artist.name;
                var icon = document.createElement("i");
                icon.classList.add("fas");
                icon.classList.add("fa-heart");
                //Verificar se música está nos favoritos
                if (localStorage.getItem(result.name) === null) { //musica não está nos favoritos
                    //Criar Evento do Button
                    $(favouriteButton).on('click', favouriteButton, function () {
                        var splittedString = this.value.split("___");
                        var songName = splittedString[0];
                        var artistName = splittedString[1];
                        localStorage.setItem(songName, artistName);
                        this.classList.add("btn-danger");
                    });
                    $('.favoritos', liMedia).append(favouriteButton);
                } else { //música está nos favoritos
                    favouriteButton.classList.add("btn-danger");
                    //Criar Evento do Button
                    $(favouriteButton).on('click', favouriteButton, function () {
                        var splittedString = this.value.split("___");
                        var songName = splittedString[0];
                        localStorage.removeItem(songName);
                        this.className = '';
                    });
                    $('.favoritos', liMedia).append(favouriteButton);
                }
                favouriteButton.appendChild(icon);
                $('.media-list').append(liMedia);
            })

        })
    
}
