import { React, useEffect, useState } from "react";
import "./App.css";
import searchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const API_URL = "http://www.omdbapi.com/?apikey=7229cfab";

let App = () => {
  let [movies, setMovies] = useState([]);
  let [search, setSearch] = useState("");



  let searchMovies = async (title) => {
    let res = await fetch(`${API_URL}&s=${title}`);
    let data = await res.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies(search);
  }, []);

  return (
    <div className="app">
      <h1>Movie Paradise</h1>
      <div className="search">
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search"
        />
        <img src={searchIcon} alt="search-icon" onClick={() => searchMovies(search)} />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies Found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
