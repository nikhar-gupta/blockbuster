import { useSelector } from "react-redux";
import Card from "./Card";
import "./cardContainer.css";
import { useNavigate } from "react-router-dom";
const CardContainer = ({ lastElementRef }) => {
  const searchMovies = useSelector((store) => store?.movies?.searchMovies);
  const storedPopularMovies = useSelector(
    (store) => store?.movies?.popularMovies
  );
  const navigate = useNavigate();
  const handleCardClick = (e) => {
    (e.target.parentElement.className === "card" ||
      e.target.parentElement.parentElement.className === "card") &&
      navigate("movie/" + e.target.parentElement.id);
  };
  return (
    <div className="cardContainerMain">
      {searchMovies?.length === 0 ? (
        <h1>Popular Movies</h1>
      ) : (
        <h1>Search Results</h1>
      )}
      <div className="cardContainer" onClick={(e) => handleCardClick(e)}>
        {(searchMovies?.length === 0 ? storedPopularMovies : searchMovies)?.map(
          (movie, index) => {
            const isLast = index === storedPopularMovies?.length - 1;
            return (
              <Card
                key={movie.id}
                movieId={movie.id}
                poster={movie.poster_path}
                title={movie.title}
                rating={movie.vote_average}
                genreIds={movie.genre_ids}
                ref={isLast ? lastElementRef : null}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

export default CardContainer;
