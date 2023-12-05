import React from "react"; //I imported react from react library
import { Card, Rate } from "antd"; //I imported card,Rate  from antd module, i earlier installed the antd using there official doc
const { Meta } = Card; // card here is from antd module
import { Link } from "react-router-dom";
//I create the card and pass in the property of the object in my array in the data.js file into it and also destructured it.
// I also styled the card the way i want it to look

const MovieCard = ({ title, description, posterUrl, rating, youtubeLink }) => {
  return (
    <Link to={`${title}`}>
      <Card
        className="grid gap-3 border-8 "
        hoverable
        cover={<img className="h-40" alt="example" src={posterUrl} />}
      >
        <Meta
          style={{
            marginBottom: "1rem",
          }}
          title={title}
          description={`...${description.slice(50, 100)}`} //the slice method is used so the description can strat from word num 50 to 100. with a 3 dot before the description
        />
        <Rate
          disabled
          defaultValue={rating}
          className="bg-blue-800 rounded-xl"
        />
        <a href={youtubeLink} target="_self">
          <button className="rounded-2xl font-sans font-medium">
            {" "}
            Click to Watch
          </button>
        </a>
        {/*  I wrapped the link to the videos in a button and make sure it load in same page and not create a new tab */}
      </Card>
    </Link>
  );
};
export default MovieCard; // this movie card is exported here and used in movielist.jsx file
