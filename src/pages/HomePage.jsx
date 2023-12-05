import { useState, useMemo, useEffect } from "react"; // import react from react library
import CreateNewMovie from "../components/CreateNewMovie"; // CreateNewMovie here was imported from the component folder, i created the CreateNewMovie jsx file
import Filter from "../components/Filter"; // Filter here was imported from the component folder, i created the Filter jsx file
import MovieList from "../components/MovieList"; // MovieList here was imported from the component folder, i created the movieList jsx file

import Navbar from "../components/Navbar"; // Navbar here was imported from the component folder, i created the Navbar jsx file
import { movies } from "../data"; // movie here was imported from the data.js file i created the data js file
import { Spin } from "antd"; // Spin here was imported from the  antd modules installed on this project

function HomePage() {
  const [myMovies, setMyMovies] = useState(movies); // this setmyMovies state will be used to change the status of the movie list anytime its triggered

  const [updateMemorizedMovies, setUpdateMemorizedMovies] = useState(0); // this setUpdateMemorizedMoviesstate will be used to change the status of movielist that was addeded using the CreateNewMovie func(The modal), it will be

  const [loadingMovies, setLoadingMovies] = useState(true); // this is setLOadingMovies will be used to render our spinner at the start of the

  // ***************************************
  // ***************************************

  // use effect to save movies to local storage every time a user addes a new movie so that it can be on the device for everytime the user load the page
  useEffect(() => {
    const getMoviesFromLocalStorage = localStorage.getItem("movies");
    // disable the setItem to local storage from runing when the app loads the first time
    if (JSON.parse(getMoviesFromLocalStorage)?.length > myMovies.length) {
      return;
    }
    localStorage.setItem("movies", JSON.stringify(myMovies));
  }, [updateMemorizedMovies]);
  // **************************************

  //**  use effect to run some logic when our app is starting
  // please refer to react official doc to get more knowlegde on how use effect work
  useEffect(() => {
    // check if user has movies stored in their local storage
    if (JSON.parse(localStorage.getItem("movies")) !== null) {
      // if movies are there, set out movies state to the movies gotten from the local storage
      setMyMovies(JSON.parse(localStorage.getItem("movies")));
    }

    // a set timeout function to run the code inside of it after 1 secs
    const timeOut = setTimeout(() => {
      // disable our loading spinner after 1 seconds
      setLoadingMovies(false);
    }, 1000);
    return () => {
      clearTimeout(timeOut);
    };
  }, []);
  // *****************************

  //** let memorize the my movies in a useMemo Hook
  // please check the check the react documenation to get more insi on how useMemo works
  const memorizedMovies = useMemo(() => {
    return {
      myMemorizedMovies: myMovies,
    };
  }, [updateMemorizedMovies, loadingMovies]);
  // ******************************

  // show the loading spinner when the app is starting
  if (loadingMovies) {
    return (
      <div className="grid place-items-center h-screen">
        {" "}
        <Spin tip="Loading" size="large">
          {" "}
        </Spin>
      </div>
    );
  }
  // ****************************
  // ***************************

  return (
    <div>
      <Navbar />

      <div className=" max-w-4xl mx-auto flex justify-between flex-col md:flex-row gap-4 py-8 px-3">
        {/* filter component */}

        <Filter setMyMovies={setMyMovies} memorizedMovies={memorizedMovies} />
        {/* ****************************** */}
        {/* *************************** */}

        {/* create new movie component */}
        <CreateNewMovie
          memorizedMovies={memorizedMovies}
          setMyMovies={setMyMovies}
          setUpdateMemorizedMovies={setUpdateMemorizedMovies}
        />
        {/* ******************************* */}
        {/* ****************************** */}
      </div>

      {/* show a no movies found when a user tries to search for a movie that does not exist */}
      {myMovies.length === 0 ? (
        <div className="text-center py-24 text-3xl">
          <p>
            {" "}
            This movie is not available.
            <br />{" "}
          </p>
          <p>
            {" "}
            {/* I wrapped the modal to add a new movie here when the search did not return any movie so they can add the movie */}
            <button>
              {" "}
              <CreateNewMovie
                memorizedMovies={memorizedMovies}
                setMyMovies={setMyMovies}
                setUpdateMemorizedMovies={setUpdateMemorizedMovies}
              />
            </button>{" "}
            <br />{" "}
          </p>
        </div>
      ) : (
        // else show the movies if a movie was found
        <MovieList myMovies={myMovies} />
      )}

      {/* A footer is create just add small good luck and i also styled it */}

      <footer className="bg-blue-800 text-center rounded-2xl font-sans font-medium mt-8 ">
        {" "}
        Designed with 💓 by Fasasi for Jaytechent. All right reserved @2023
      </footer>
    </div>
  );
}

export default HomePage; // the app is exported here for further usage by the main.jsx file
