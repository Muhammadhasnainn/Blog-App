import React from "react";
import { Link } from "react-router-dom";

const HCard = (props) => {
  const { blog } = props;
  const PF = "/images/";

  return (
    <Link
      to={props.link}
      className="d-flex justify-content-between align-items-center Hcard mt-5"
    >
      <div className="w-75">
        <div className="d-flex">
          <div
            className="avatar"
            style={{ background: `url('${PF + blog.avatar}')` }}
          ></div>
          <p className="ms-2">{blog.author.split(" ")[0]}</p>
        </div>
        <h4 className="fw-bold mt-1">{blog.title}</h4>
        <p className="text-muted mt-1 subtitle">{blog.subtitle}</p>
        <div className="d-flex align-items-center mt-2">
          <p className="text-muted">{props.date}</p>
          <p className="ms-2 text-muted">5 min read</p>
          <div className="category ms-2">{blog.category}</div>
        </div>
      </div>
      <div className="w-25">
        <img
          src={PF + blog.image}
          className="main-img"
          width={"100%"}
          alt="img"
        />
      </div>
    </Link>
  );
};

export default HCard;
