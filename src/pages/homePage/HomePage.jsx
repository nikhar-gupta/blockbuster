import { useState } from "react";
import CardContainer from "../../components/cardContainer/CardContainer";
import Search from "../../components/search/Search";
import usePopularMovies from "../../utils/hooks/usePopularMovies";
import useSearchMovies from "../../utils/hooks/useSearchMovies";
import { useDebounce } from "react-use";
import "./homepage.css";
import { useSelector } from "react-redux";
import ShimmerMain from "../../components/shimmerUI/ShimmerMain";

const HomePage = () => {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useDebounce(() => setDebouncedSearch(searchText), 1500, [searchText]);
  useSearchMovies(debouncedSearch);
  const { lastElementRef } = usePopularMovies();

  const popularMovies = useSelector((store) => store?.movies.popularMovies);
  return (
    <div className="homepage">
      <Search searchText={searchText} setSearchText={setSearchText} />
      {popularMovies.length ? (
        <CardContainer lastElementRef={lastElementRef} />
      ) : (
        <ShimmerMain />
      )}
    </div>
  );
};

export default HomePage;
