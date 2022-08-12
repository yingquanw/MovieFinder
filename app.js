const apiKey = '7f818eff11bf559590c274dfbca47b8f';
const baseUrl = 'http://image.tmdb.org/t/p/';
const movieList = document.querySelector('#movies')
const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    movieList.innerHTML = '';
    const searchTerm = form.elements.search.value;
    const config = { params: { api_key: apiKey, query: searchTerm } }
    const res = await axios.get(`https://api.themoviedb.org/3/search/movie`, config);
    loadMovies(res.data.results);
    form.elements.search.value = '';
});

function loadMovies(movies) {
    for (let movie of movies) {
        createMovieCard(movie);
    }
}

function createMovieCard(movie) {
    const poster = getPoster(movie);
    if (poster) {
        const name = movie.original_title;
        const intro = movie.overview || 'No description';
        const score = movie.vote_average || 'N/A';
        const date = movie.release_date || 'N/A';
        const card = document.createElement('div');
        card.classList.add("card");
        card.innerHTML =
            `<img src = ${poster} class="card-img-top col-2">` +
            '<div class="card-body">' +
            `<h5 class="card-title">${name}</h5>` +
            `<p class="card-text">${intro}</p>` +
            '</div>' +
            '<ul class="list-group list-group-flush">' +
            `<li class="list-group-item">Rating: ${score}</li>` +
            `<li class="list-group-item">Date: ${date}</li>` +
            '</ul>';
        movieList.append(card);
    }
}

function getPoster(movie) {
    const posterPath = movie.poster_path;
    if (posterPath) {
        const img = document.createElement('IMG');
        img.src = `${baseUrl}/w300${posterPath}`;
        return img.src;
    }
}


