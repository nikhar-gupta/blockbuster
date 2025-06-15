import { useState } from "react";
import CardContainer from "../../components/cardContainer/CardContainer";
import Search from "../../components/search/Search";
import usePopularMovies from "../../utils/hooks/usePopularMovies";
import useSearchMovies from "../../utils/hooks/useSearchMovies";
import { useDebounce } from "react-use";
import "./homepage.css";

const HomePage = () => {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useDebounce(() => setDebouncedSearch(searchText), 1500, [searchText]);
  usePopularMovies();
  useSearchMovies(debouncedSearch);
  return (
    <div className="homepage">
      <Search searchText={searchText} setSearchText={setSearchText} />
      <CardContainer />
    </div>
  );
};

export default HomePage;
