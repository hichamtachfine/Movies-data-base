const apiKey = "bad9a7545b3ee10d081cee25222f014a";
const imgBase = "https://image.tmdb.org/t/p/w500";

function searchMovie() {
  const query = document.getElementById("searchbox").value;
  if (!query) return;

  const movieFetch = fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
    .then(res => res.json());

  const tvFetch = fetch(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${query}`)
    .then(res => res.json());

  Promise.all([movieFetch, tvFetch]).then(([movieData, tvData]) => {
    const movies = (movieData.results || []).map(m => ({ ...m, media_type: "movie" }));
    const shows = (tvData.results || []).map(s => ({ ...s, media_type: "tv" }));
    const combined = [...movies, ...shows];

    if (combined.length > 0) {
      displayMovies(combined);
    } else {
      document.getElementById("results").innerHTML = "<p>No results found</p>";
    }
  });
}
document.getElementById("searchbox").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    searchMovie();
  }
});
function displayMovies(items) {
  const results = document.getElementById("results");

  results.innerHTML = items.map(item => {
    const title = item.title || item.name;
    console.log("Rendering:", title, "| id:", item.id, "| type:", item.media_type);

    const poster = item.poster_path
      ? imgBase + item.poster_path
      : "https://via.placeholder.com/150";

    const label = item.media_type === "tv" ? "TV" : "Movie";

    return `
      <div class="movie"  onclick="goToItem(${item.id}, '${item.media_type}')">
        <img src="${poster}" />
        <span class="media-label">${label}</span>
        <h3>${title}</h3>
      </div>
    `;
  }).join("");
}
const poster = movie.poster_path 
  ? imgBase + movie.poster_path 
  : "https://via.placeholder.com/150";


const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

console.log(movieId);

function loadMovieDetails() {
  fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      displayMovieDetails(data);
    });
}

function displayMovieDetails(movie) {
  document.getElementById("poster").src =
    "https://image.tmdb.org/t/p/w500" + movie.poster_path;

  document.getElementById("tittle").textContent = movie.title;

  document.getElementById("date-num").textContent =
    movie.release_date;

  document.getElementById("rating-num").textContent =
    movie.vote_average + "/10";

  document.getElementById("overview-text").textContent =
    movie.overview;

  document.getElementById("genre-text").textContent =
    movie.genres.map(g => g.name).join(", ");
}
function goToItem(id, type) {
  console.log("Clicked id:", id, "type:", type);
  window.location.href = `pages00/pages.html?id=${id}&type=${type}`;
}

loadMovieDetails();