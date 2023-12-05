import React from "react"; // I imported react from react modules
import MovieCard from "./MovieCard"; // Moviecard imported from the component folder , i created the Movie card.jsx file

// This is the function that map thr movies from the data.js file to the moviecard that we import here
const MovieList = ({ myMovies }) => {
  return (
    <div className="max-w-4xl mx-auto px-3">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {myMovies.map((item) => (
          <MovieCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default MovieList; // movie list was exported here and used by the the app.jsx file
