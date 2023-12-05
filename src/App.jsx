import React from "react";
import { Routes, Route } from "react-router-dom";
import DescriTrailerPage from "./pages/DescriTrailerPage";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path=":movietitle" element={<DescriTrailerPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
