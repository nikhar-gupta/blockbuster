import { useSelector } from "react-redux";
import Card from "./Card";
import "./cardContainer.css";
const CardContainer = ({ lastElementRef }) => {
  const searchMovies = useSelector((store) => store?.movies?.searchMovies);
  const storedPopularMovies = useSelector(
    (store) => store?.movies?.popularMovies
  );

  return (
    <div className="cardContainerMain">
      {searchMovies?.length === 0 ? (
        <h1>Popular Movies</h1>
      ) : (
        <h1>Search Results</h1>
      )}
      <div className="cardContainer">
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
