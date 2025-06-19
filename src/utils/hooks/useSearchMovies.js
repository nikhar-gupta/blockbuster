import { useDispatch } from "react-redux";
import { options } from "../configs/tmdb";
import { addSearchMovies } from "../store/moviesSlice";
import { useEffect } from "react";

const useSearchMovies = (query) => {
  const dispatch = useDispatch();
  const getSearchMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1&api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }`
    );
    const json = await response.json();
    dispatch(addSearchMovies(json?.results));
  };
  useEffect(() => {
    getSearchMovies();
  }, [query]);
};

export default useSearchMovies;
