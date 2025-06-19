import { useEffect } from "react";
import { options } from "../configs/tmdb";

const useGetTrailerVideo = (id, trailerUrl, setTrailerUrl) => {
  const getTrailerVideo = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }`
      );
      const data = await res.json();
      const trailers = data.results.filter((video) => video.type === "Trailer");
      setTrailerUrl("https://www.youtube.com/embed/" + trailers[0].key);
      return trailers;
    } catch (err) {
      console.error("Error fetching trailer:", err);
      return [];
    }
  };

  useEffect(() => {
    getTrailerVideo();
  }, []);
};
export default useGetTrailerVideo;
