# Play The Music

A static music-discovery website built for the **DWEB (Desenvolvimento Web)** course, 1st year / 1st semester of the TeSP in Programação de Sistemas de Informação (IPL).

The site uses the [Last.fm API](https://www.last.fm/api) to search for tracks, show track/artist/album details, list Portugal's top tracks and keep a list of favourite songs.

## Features

| Page | Description |
|------|-------------|
| `index.html` | Landing page with navigation and search bar |
| `pesquisa.html` | Track search results (`track.search`) |
| `details.html` | Track, artist and album details (`track.getInfo`, `artist.getinfo`, `album.getinfo`) |
| `topchart.html` | Top tracks in Portugal (`geo.gettoptracks`) |
| `favoritos.html` | User's favourite tracks (stored in the browser) |

## Tech stack

- HTML5, CSS3, JavaScript
- [Bootstrap 5](https://getbootstrap.com/) and jQuery
- Font Awesome icons, Google Fonts (Varela Round, Nunito)
- Last.fm Web Services API (JSON)

## Project structure

```
projetoWEB/
├── index.html, pesquisa.html, details.html, topchart.html, favoritos.html
├── css/            # styles.css + theme/theme.css
├── js/             # one script per page (script.js, pesquisa.js, details.js, topchart.js, favoritos.js)
└── assets/img/     # images and favicon
```

## Running

No build step is required. Open `index.html` in a browser, or serve the folder with any static server, for example:

```bash
npx serve .
```

An internet connection is required (CDN libraries and Last.fm API calls).

## API key

The Last.fm API key is set directly in the files under `js/`. To use your own key, create one at <https://www.last.fm/api/account/create> and replace the `api_key` value in those files.
