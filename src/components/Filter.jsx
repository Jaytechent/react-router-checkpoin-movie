import React from "react"; // Rect was imported from react library
import { Input, Select } from "antd"; //Input and select was imported from antd modules installed into this project

const { Search } = Input; // this search component is from antd module
// this is the filter component that will be export into the app.jsx file
// it has one  select and five field
const Filter = ({ memorizedMovies: { myMemorizedMovies }, setMyMovies }) => {
  // filter movies by rate
  const filterByRate = (rate) => {
    let filteredMovies = myMemorizedMovies.filter(
      (item) => item.rating === Number(rate)
    );
    setMyMovies(filteredMovies); // setmyMovies become filteredMovie here. the state is been changed by the filter function
  };

  // filter movies by Search using the title of the movies
  const filterBySearch = (value) => {
    let filteredMovies = myMemorizedMovies.filter((item) =>
      item.title.toLocaleLowerCase().includes(value.toLowerCase().trim())
    );
    setMyMovies(filteredMovies);
  };

  return (
    <div className="flex gap-4 flex-col md:flex-row">
      <Search
        placeholder="Search for movie..."
        enterButton
        style={{ maxWidth: 250 }}
        onSearch={(value) => filterBySearch(value)}
      />

      {/* for filtering movies by rate, i checked against the value to return the clicked rate label */}
      <Select
        defaultValue="Filter Movies by rate"
        style={{
          width: 200,
        }}
        onChange={(value) => filterByRate(value)}
        options={[
          {
            value: "1",
            label: "1 ⭐",
          },
          {
            value: "2",
            label: "2 ⭐⭐",
          },
          {
            value: "3",
            label: "3 ⭐⭐⭐",
          },
          {
            value: "4",
            label: "4 ⭐⭐⭐⭐",
          },
          {
            value: "5",
            label: "5 ⭐⭐⭐⭐⭐",
          },
        ]}
      />
    </div>
  );
};

export default Filter; // filter is exported here and used at app.jsx file
