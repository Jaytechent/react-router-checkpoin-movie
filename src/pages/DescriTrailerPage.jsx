import React from "react";
import { Link, useParams } from "react-router-dom";
import { movies } from "../data";

const DescriTrailerPage = () => {
  const { movietitle } = useParams();

  const [movie, setMovie] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const findMovieByTitle = () => {
    let foundMovie = movies.find((item) => item.title === movietitle);
    setMovie(foundMovie);
    return foundMovie;
  };

  React.useEffect(() => {
    findMovieByTitle();
    const timeOut = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Cleanup the timeout on component unmount
    return () => clearTimeout(timeOut);
  }, [movietitle]);

  if (loading) {
    return <h1>Getting Movie info...</h1>;
  }

  if (!movie) {
    return <h1>Movie not found</h1>;
  }

  return (
    <section
      className="grid place-items-center relative h-screen" // Make the section fill the viewport
      style={{
        backgroundImage:
          'url("https://th.bing.com/th?id=OIP.VTlVXTKbIil6Pqhj9Df1mgHaEk&w=318&h=196&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2")',
        backgroundSize: "cover",
      }}
    >
      {/* Overlay div */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(8, 7, 9, 0.5)",
        }}
      ></div>

      <div className="flex flex-col items-center text-white">
        <h2>{movie.title}</h2>
        <p>{`Description: ${movie.description}`}</p>

        <iframe
          className="z-10 "
          title="trailer"
          width="700"
          height="500"
          src={movie.youtubeLink}
          frameBorder="0"
          allowFullScreen
        ></iframe>

        <button className="bg-transparent rounded-full px-4 py-2 mt-4 z-10">
          <Link to="/" className="text-white font-fantasy text-decoration-none">
            <h1>Back to Home</h1>
          </Link>
        </button>
      </div>
    </section>
  );
};

export default DescriTrailerPage;
