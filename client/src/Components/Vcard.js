import React from "react";
import { Link } from "react-router-dom";
import { GrEdit } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";
import { useUserContext } from "../contexts/UserContext";

const Vcard = (props) => {
  const { HandleDelete } = useUserContext();
  const { blog, updateBlog } = props;
  const PF = "/images/";

  return (
    <div className="Vcard mt-5 me-5">
      <div className="w-100">
        <img src={PF + blog.image} className="main-img" width={"100%"} alt="img" />
      </div>
      <div className="w-100 vcard-text">
        <Link
          to={`blog/${blog._id}`}
          className="text-dark"
          style={{ textDecoration: "none" }}
        >
          <h4 className="fw-bold mt-1">{blog.title}</h4>
        </Link>
        <p className="text-muted mt-1 subtitle">{blog.subtitle}</p>
        <div className="d-flex align-items-center mt-2">
          <p className="text-muted">{props.date}</p>
          <p className="ms-2 text-muted">5 min read</p>
        </div>
        <div>
          <div className="category text-muted">{blog.category}</div>
          <GrEdit
            size={20}
            className="mt-2"
            cursor={"pointer"}
            onClick={() => updateBlog(blog)}
          />
          <AiFillDelete
            size={25}
            className="mt-2 text-danger ms-3"
            cursor={"pointer"}
            onClick={() => HandleDelete(blog._id)}
          />
        </div>
      </div>
    </div>
  );
};

export default Vcard;
