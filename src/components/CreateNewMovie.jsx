import React, { useState } from "react"; // React and usState are imported from React library

import { Button, Modal, Input, Rate, message } from "antd"; // components here are imported from ants design please refer to ant designs official website
import { VideoCameraAddOutlined } from "@ant-design/icons"; // this video icon is imported from ant design modules
// *************************************

// package for validating user inputs installed from npm packages validator
import validator from "validator";
// I passed in the state of the movie lis here which are: setMyMovie, setUpdateMemorizedmovie, and memorizedMovie because our new movie will be changing there status
const CreateNewMovie = ({
  setMyMovies,
  setUpdateMemorizedMovies,
  memorizedMovies,
}) => {
  // i set a new variable "movieinfo", it will take  property of the object in my array(data.js) which will be the one taking the new movie allowed by the modal function
  const [movieInfo, setMovieInfo] = useState({
    id: Math.random(),
    title: "",
    description: "",
    posterUrl: "",
    rating: 1,
  });
  const [isModalOpen, setIsModalOpen] = useState(false); // modal is open is from antd , check there doc for usage
  const [messageApi, contextHolder] = message.useMessage();

  //   a function to handle the user input when creating a new movie so it can listen and check the input fields
  const handleInput = (event) => {
    const { id, value } = event.target;
    setMovieInfo((preValue) => {
      return {
        ...preValue,
        [id]: value,
      };
    });
  };
  //   ********************************
  // ***********************************
  // a function to handle user is selecting the rate of the movie.
  const handleRate = (value) => {
    setMovieInfo((preValue) => ({
      ...preValue,
      rating: value,
    }));
  };
  // **********************

  // a function to open the modal so a user can add a new movie
  const showModal = () => {
    setIsModalOpen(true);
  };

  // a function to and the new movie and close the modal afterwards
  const handleOk = () => {
    // lets validate all our input before adding to the array
    // validate the posterUrl
    if (!validator.isURL(movieInfo.posterUrl)) {
      messageApi.open({
        type: "error",
        content: "Please provide a valid image address",
      });
      return;
    }
    if (!validator.isURL(movieInfo.youtubeLink)) {
      messageApi.open({
        type: "error",
        content: "Please provide a valid video/youtube link",
      });
      return;
    }
    // validate the Movie title
    if (validator.isEmpty(movieInfo.title)) {
      messageApi.open({
        type: "error",
        content: "Please provide a movie title",
      });
      return;
    }

    // validate the Movie title
    if (movieInfo.rating < 1) {
      messageApi.open({
        type: "error",
        content: "Please rate the movie",
      });
      return;
    }

    // validate the Movie title
    if (validator.isEmpty(movieInfo.description)) {
      messageApi.open({
        type: "error",
        content: "Please provide movie description",
      });
      return;
    }

    // display a success message after a user has success fully created a new movie
    messageApi.open({
      type: "success",
      content: "Movie successfully added",
    });

    /* add the newly created movie to our already exsiting
     arrays of movie so we can display them*/
    setMyMovies(() => [movieInfo, ...memorizedMovies.myMemorizedMovies]);
    // *********************

    // updated the movies stored in the use memo with the newly added movie using the math method for the random number generated as ID
    setUpdateMemorizedMovies(Math.random());
    // ***************************
    // ***************************
    // now reset the input field back to empty values after a user has created a movie successfully
    setMovieInfo({
      id: Math.random(),
      title: "",
      description: "",
      posterUrl: "",
      rating: 1,
    });

    setIsModalOpen(false);
  };

  // close the modal if a user clicks on the cancel button
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button
        type="primary"
        icon={<VideoCameraAddOutlined />}
        onClick={showModal}
      >
        Click to Add Movie
      </Button>
      <Modal
        title="Add new movie"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {contextHolder}

        <div className="space-y-3">
          <Input
            placeholder="Movie poster url"
            id="posterUrl"
            onChange={handleInput}
            value={movieInfo.posterUrl}
          />
          <div>
            <Input
              placeholder="Movie Title"
              id="title"
              onChange={handleInput}
              value={movieInfo.title}
            />

            <Input
              className="mt-2"
              placeholder="Youtube/Video Link url"
              id="youtubeLink"
              onChange={handleInput}
              value={movieInfo.youtubeLink}
            />

            {/* for rating a movie */}
            <div className="shadow my-4 rounded-md p-2 w-fit">
              <p>Rate Movie</p>
              <Rate
                value={movieInfo.rating}
                onChange={(value) => handleRate(value)}
                defaultValue={1}
              />
            </div>
            {/* ******************* */}
          </div>

          <Input.TextArea
            rows={4}
            id="description"
            onChange={handleInput}
            placeholder="Movie description"
            value={movieInfo.description}
          />
        </div>
      </Modal>
    </>
  );
};
export default CreateNewMovie; // exported here and used at the app.jsx file
