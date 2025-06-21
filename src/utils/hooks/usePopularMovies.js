import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useCallback, useState } from "react";
import { options } from "../configs/tmdb";
import { addPopularMovies } from "../store/moviesSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector((store) => store?.movies?.popularMovies);
  const [page, setPage] = useState(1); // 🔹 Track current page
  const observerRef = useRef();

  const getPopularMovies = useCallback(async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
        options
      );
      const json = await data.json();

      dispatch(addPopularMovies(json.results));
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    }
  }, [dispatch, page]);

  useEffect(() => {
    getPopularMovies();
  }, [getPopularMovies]);

  // 🔻 Intersection Observer to detect scroll end
  const lastElementRef = useCallback((node) => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      console.log("Intersection triggered");
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (node) observerRef.current.observe(node);
  }, []);

  return { popularMovies, lastElementRef };
};

export default usePopularMovies;
