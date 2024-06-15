import React, { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL = "http://www.omdbapi.com/?apikey=e0a92fb1";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("Superman"); // Add a state for the search query

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search || []); // Set movies or an empty array if none found
  };

  useEffect(() => {
    searchMovies(searchQuery);
  }, [searchQuery]);

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Handle input changes
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchQuery)} // Handle the search action
        />
      </div>

      <div className="container">
        {movies.length !== 0 ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty">No movies found</div>
        )}
      </div>
    </div>
  );
}

export default App;
