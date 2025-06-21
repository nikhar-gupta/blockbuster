import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Rating from "../../assets/Rating.png";
import "./moviePage.css";
import useGetTrailerVideo from "../../utils/hooks/useGetTrailerVideo";
import { genres } from "../../utils/data/genreList";

const MoviePage = () => {
  const { id } = useParams();
  const [trailerUrl, setTrailerUrl] = useState(null);
  const navigate = useNavigate();
  useGetTrailerVideo(id, trailerUrl, setTrailerUrl);

  const movies = useSelector((store) =>
    store?.movies?.searchMovies?.length === 0
      ? store?.movies?.popularMovies
      : store?.movies?.searchMovies
  );
  useEffect(() => {
    if (!movies || movies.length === 0) {
      navigate("/");
    }
  }, [movies, navigate]);
  const movieInfo = movies?.filter((movie) => {
    if (movie.id === parseInt(id)) {
      return movie;
    }
  });
  const matchedGenres = genres.filter((genre) =>
    movieInfo[0]?.genre_ids.includes(genre.id)
  );

  return (
    <div className="moviePageMainContainer">
      <div className="moviePageContainer">
        <div className="titleAndRatings">
          <div className="left">
            <h1>{movieInfo[0]?.title}</h1>
            <p className="date">{movieInfo[0]?.release_date?.split("-")[0]}</p>
          </div>
          <div className="right">
            <img src={Rating} alt="star" />
            <p>
              {String(movieInfo[0]?.vote_average).substring(0, 3) +
                "/10 (" +
                movieInfo[0]?.vote_count +
                ")"}
            </p>
          </div>
        </div>
        <div className="posterAndTrailer">
          <img
            className="poster"
            src={
              movieInfo[0]?.poster_path
                ? "https://image.tmdb.org/t/p/original/" +
                  movieInfo[0]?.poster_path
                : "../../src/assets/No-Poster.png"
            }
            alt="movie-poster"
          />
          <iframe
            className="videoPlayer"
            src={trailerUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <div className="movieDetails">
          <div className="genresContainer head">
            <p className="titles">Genres</p>
            <div className="allGenres">
              {" "}
              {matchedGenres.map((genre) => {
                return (
                  <p key={genre.id} className="genres">
                    {genre.name}
                  </p>
                );
              })}
            </div>
          </div>
          <div className="overviewContainer head">
            <p className="titles">Overview</p>
            <div className="overview">{movieInfo[0]?.overview}</div>
          </div>
          <div className="releaseDateCOntainer head">
            <div className="titles">Release Date</div>
            <div className="releaseDate coloured">
              {movieInfo[0]?.release_date}
            </div>
          </div>
          <div className="languageContainer head">
            <div className="titles">Language</div>
            <div className="language coloured">
              {movieInfo[0]?.original_language}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
