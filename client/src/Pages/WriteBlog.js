import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import FileBase64 from "react-file-base64";
import axios from "axios";
import { useUserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const WriteBlog = () => {
  const { user } = useUserContext();
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBlog((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const HandleWrite = async (e) => {
    const author = user.name;
    const avatar = user.img;
    e.preventDefault();

    let formdata = new FormData();
    const filename = Date.now() + file.name;
    formdata.append("name", filename);
    formdata.append("file", file);
    const newblog = { ...blog, author, avatar, image: filename };

    try {
      await axios.post("/api/upload", formdata);
    } catch (err) {}
    try {
      setLoading(true);
      await axios.post("/api/blogs/addblog", newblog, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      setBlog({ title: "", subtitle: "", description: "", tag: "", image: "" });
      setLoading(false);
      navigate("/myblogs");
    } catch (err) {
      console.log(err.response);
      setLoading(false);
    }
  };

  return (
    <div className="WritePost">
      <NavBar />
      {loading && "LOADING"}
      <h1 className="fw-bold text-center mt-4">Write your blog post!</h1>
      <form
        method="post"
        onSubmit={HandleWrite}
        encType="multipart/form-data"
        className="container"
      >
        <div className="fileInput">
          <label>
            Image <span className="text-danger fw-bold">*</span>
          </label>
          <input
            type="file"
            name="file"
            id="file"
            className="form-control"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="mt-2">
          <label>
            Title <span className="text-danger fw-bold">*</span>
          </label>
          <input
            type="text"
            placeholder="Blog Title"
            className="form-control"
            id="title"
            value={blog.title}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="mt-2">
          <label>
            Sub title <span className="text-danger fw-bold">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter subtitle (Max 2 lines)"
            className="form-control"
            value={blog.subtitle}
            id="subtitle"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="mt-2">
          <label>
            Blog <span className="text-danger fw-bold">*</span>
          </label>
          <textarea
            className="form-control mt-2"
            placeholder="Start writing!"
            id="description"
            value={blog.description}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="mt-2">
          <label>
            Category <span className="text-danger fw-bold">*</span>
          </label>
          <input
            className="form-control mt-2"
            placeholder="Start writing!"
            value={blog.tag}
            id="tag"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button className="btn btn-warning mt-2" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
};

export default WriteBlog;
