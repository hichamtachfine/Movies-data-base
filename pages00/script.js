const apiKey = "bad9a7545b3ee10d081cee25222f014a";

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");
const mediaType = urlParams.get("type") || "movie";

function loadMovieDetails() {
  if (!movieId) return;

  fetch(`https://api.themoviedb.org/3/${mediaType}/${movieId}?api_key=${apiKey}`)
    .then(res => res.json())
    .then(data => displayMovieDetails(data));
}

function displayMovieDetails(item) {
  document.getElementById("poster").src =
    item.poster_path
      ? "https://image.tmdb.org/t/p/w500" + item.poster_path
      : "https://via.placeholder.com/150";

  document.getElementById("tittle").textContent = item.title || item.name;
  document.getElementById("date-num").textContent = item.release_date || item.first_air_date;
  document.getElementById("rating-num").textContent = item.vote_average.toFixed(1) + "/10";
  document.getElementById("overview-text").textContent = item.overview;
  document.getElementById("genre-text").textContent = item.genres.map(g => g.name).join(", ");
  }

  loadMovieDetails();
  loadTrailer();

function loadTrailer() {
  fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`)
    .then(res => res.json())
    .then(data => {

      const trailer = data.results.find(
        video => video.type === "Trailer" && video.site === "YouTube"
      );

      if (trailer) {
        document.getElementById("trailer").src =
          `https://www.youtube.com/embed/${trailer.key}`;
      } else {

  const movieName = document.getElementById("tittle").textContent;

  document.getElementById("trailer-container").innerHTML = `
  
    <div class="fallback-trailer">
      <p>No official trailer found.</p>

      <a 
        href="https://www.youtube.com/results?search_query=${movieName}+official+trailer"
        target="_blank"
        class="watch-btn"
      >
        Watch Trailer on YouTube
      </a>
    </div>

  `;
}

    });
}