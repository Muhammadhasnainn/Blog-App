import React from "react";
import Blogs from "../Components/Blogs";
import Hero from "../Components/Hero";
import NavBar from "../Components/NavBar";

const Home = () => {
  return (
    <div>
      <NavBar />
      <Hero />
      <Blogs />
    </div>
  );
};

export default Home;
