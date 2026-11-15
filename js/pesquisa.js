pesquisar();

function pesquisar() {
  var cloneMedia = $(".trackRow");

  const parametros = window.location.search;
  const parametrosURL = new URLSearchParams(parametros);

  var valorPesquisa = parametrosURL.get("name");

  $(".panel-title").text('Resultados da pesquisa de "' + valorPesquisa + '"');

  $(".media-list").html("");

  $.ajax({
    method: "GET",
    url:
      "http://ws.audioscrobbler.com/2.0/?method=track.search&api_key=c298e8e7f8045bda196a9b69d88b2304&format=json",
    data: {
      track: valorPesquisa,
      limit: 10,
    },
  }).done(function (msg) {
    // Extrair musicas da resposta da API
    var songs = msg.results.trackmatches.track;

    // Iterar cada musica
    songs.forEach(function (result) {
      var liMedia = cloneMedia.clone();
      var detailButton = document.createElement("a");

      $(detailButton).text("Abrir");
      $(detailButton).attr(
        "href",
        "details.html?name=" + result.name + "&artist=" + result.artist
      );

      $(".detahes", liMedia).append(detailButton);
      $("#image", liMedia).attr("src", result.image[2]["#text"]);
      $(".title", liMedia).text(result.name);
      $(".artista", liMedia).text(result.artist);
      $(".ouvintes", liMedia).text(result.listeners);

      // Botão dos favoritos
      var favoritesButton = document.createElement("button"); //Criar botão

      // Colocar o value do botão com o nome da musica e do artista
      favoritesButton.value = result.name + "___" + result.artist;

      // Criar icon para colocar no botão
      var icon = document.createElement("i");
      icon.classList.add("fas");
      icon.classList.add("fa-heart");
      favoritesButton.appendChild(icon);

      //Verificar se música está nos favoritos
      if (localStorage.getItem(result.name) === null) {
        // A musica não está nos favoritos
        //Criar Evento do Button
        $(favoritesButton).on("click", favoritesButton, function () {
          var splitedString = this.value.split("___");
          var musicName = splitedString[0];
          var artistName = splitedString[1];
          // Esta função adiciona a musica aos favoritos
          // Ou seja, adiciona a musica á local storage
          localStorage.setItem(musicName, artistName);
          // Coloca a class btn-danger para colocar o botão a vermelho
          this.classList.add("btn-danger");
        });
      } else {
        // Música está nos favoritos
        // Adicionar class btn-danger ao botão para ele ficar vermelho
        favoritesButton.classList.add("btn-danger");

        //Criar Evento do Button
        $(favoritesButton).on("click", favoritesButton, function () {
          var musicName = this.value.split("___")[0];
          // Musica não está nos favoritos
          // Logo, o comportamento do botão é remover a musica da local storage
          localStorage.removeItem(musicName);
          this.className = "";
        });
      }

      //Adicionar botão
      $(".favoritos", liMedia).append(favoritesButton);

      $(".media-list").append(liMedia);
    });
  });
}
