import "./search.css";
import homelogo from "../../assets/full-logo.png";
import heroImg from "../../assets/hero-img.png";
const Search = ({ searchText, setSearchText }) => {
  return (
    <div className="searchMain">
      <img alt="logo" className="homeLogo" src={homelogo} width={500} />
      <img alt="cards" className="cardsImg" src={heroImg} />
      <h1>
        Your <span>Movie</span> Universe
      </h1>
      <input
        type="text"
        name="search"
        className="searchbar"
        placeholder="Search through thousands movies online"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
};

export default Search;
