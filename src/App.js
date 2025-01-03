import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg"; // Ensure this image exists in the specified path
import "./App.css";

const API_URL = "http://www.omdbapi.com?apikey=6a158022";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("Batman"); // Default search on component mount
  }, []);

  const searchMovies = async (title) => {
    if (!title.trim()) {
      alert("Please enter a movie title!");
      return;
    }

    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();

      if (data.Response === "True") {
        console.log("Movies fetched successfully:", data.Search); // Debug log
        setMovies(data.Search);
      } else {
        console.log("API Error:", data.Error); // Debug log
        setMovies([]);
        alert(data.Error); // Show error if no movies found or API error
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
