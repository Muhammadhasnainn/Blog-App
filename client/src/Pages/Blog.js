import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../Components/NavBar";
import axios from "axios";
import Spinner from "../images/Spinner.gif";

const Blog = () => {
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const PF = "/images/";
  const { id } = useParams();

  useEffect(() => {
    const FetchBlogs = async () => {
      setLoading(true);
      const data = await axios.get(
        `/api/blogs/fetchblog/${id}`
      );
      setBlog(data.data[0]);
      setLoading(false);
    };
    FetchBlogs();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="Blog u-width mt-4">
        {loading ? (
          <img src={Spinner} className="Loader" alt="img" />
        ) : (
          <>
            <h1 className="fw-bold">{blog.title}</h1>
            <p className="subtitle text-muted mt-1">{blog.subtitle}</p>
            <div className="d-flex align-items-center mt-2">
              <div
                className="avatar"
                style={{ background: `url('${PF + blog.avatar}')` }}
              ></div>
              <p className="ms-2 name">{blog.author}</p>
            </div>
            <img src={PF+ blog.image} className="blogImg mt-2" alt="img" />
            <p className="mt-2">{blog.description}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Blog;
