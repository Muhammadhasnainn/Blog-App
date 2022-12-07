import React from "react";
import heroImg from "../images/hero.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero d-flex align-items-center">
      <div className="d-flex justify-content-between align-items-center u-width">
        <div className="hero-text">
          <h1 className="fw-bold">
            Your thought buble has a place on the internet.
          </h1>
          <p className="fs-5 mt-2 fst-italic">
            Unleash your creativity today and share your story with the world!
          </p>
          <Link
            to={localStorage.getItem("token") ? "/write" : "/login"}
            className="btn btn-outline-warning mt-2"
          >
            Start Writing!
          </Link>
        </div>
        <img src={heroImg} alt="img" />
      </div>
    </div>
  );
};

export default Hero;
