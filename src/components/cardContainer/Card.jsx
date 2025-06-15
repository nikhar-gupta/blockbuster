import { forwardRef } from "react";
import { genres } from "../../utils/data/genreList";
import { useNavigate } from "react-router-dom";
import star from "../../assets/Rating.png";
import noPoster from "../../assets/No-Poster.png";

const Card = forwardRef(({ poster, title, rating, genreIds, movieId }, ref) => {
  const navigate = useNavigate();
  const matchedGenres = genres
    .filter((genre) => genreIds?.includes(genre.id))
    .map((genre) => genre.name)
    .slice(0, 2);
  const handleMovieCardClick = () => {
    navigate("/movie/" + movieId);
  };
  return (
    <div className="card" ref={ref} onClick={handleMovieCardClick}>
      <img
        className="poster"
        src={
          poster
            ? "https://image.tmdb.org/t/p/original/" + poster
            : { noPoster }
        }
        alt="movie-poster"
      />
      <div className="movieInfo">
        <p className="movieName">{title}</p>
        <div className="movieShortInfo">
          <img src={star} alt="star" />
          <p className="ratings">{String(rating).substring(0, 3)}</p>
          <p className="genre">
            {matchedGenres.map((genre, index) => {
              if (index === 0) return genre + " · ";
              else return genre;
            })}
          </p>
        </div>
      </div>
    </div>
  );
});

export default Card;
