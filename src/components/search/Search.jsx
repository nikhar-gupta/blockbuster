import "./search.css";
const Search = ({ searchText, setSearchText }) => {
  return (
    <div className="searchMain">
      <img
        alt="logo"
        className="homeLogo"
        src="src\assets\full-logo.png"
        width={500}
      />
      <img alt="cards" className="cardsImg" src="src\assets\hero-img.png" />
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
