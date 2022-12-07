import React, { useEffect, useRef, useState } from "react";
import NavBar from "../Components/NavBar";
import Vcard from "../Components/Vcard";
import { useUserContext } from "../contexts/UserContext";
import { Navigate } from "react-router-dom";
import Spinner from "../images/Spinner.gif";

const MyBlogs = () => {
  const { FetchBlogs, myblogs, HandleEdit } = useUserContext();
  const ref = useRef(null);
  const refClose = useRef(null);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState({});

  const handleChange = (e) => {
    setEdit((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const updateBlog = (currentBlog) => {
    ref.current.click();
    setEdit({ ...currentBlog });
  };

  const HandleEditBlog = async () => {
    HandleEdit(edit);
    refClose.current.click();
  };

  useEffect(() => {
    const FetchBlogss = async () => {
      setLoading(true);
      await FetchBlogs();
      setLoading(false);
    };
    FetchBlogss();
  }, []);

  if (!localStorage.getItem("token")) return <Navigate to="/login" />;

  return (
    <section>
      <NavBar />
      <div className="u-width">
        <h1 className="fw-bold text-center mt-2">My Blogs</h1>
        <div className="d-flex">
          {loading ? (
            <img src={Spinner} className="Loader" alt="img" />
          ) : (
            <>
              {myblogs.map((elem) => {
                const months = [
                  "Jan",
                  "Feb",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ];
                const date = elem.date?.split("-");
                const day = date[2].split("T0")[0];
                const month = months[date[1] - 1];
                const year =
                  new Date().getFullYear().toString() !== date[0]
                    ? new Date().getFullYear()
                    : "";

                const FullDate = `${day} ${month},${year}`;

                return (
                  <div key={elem._id}>
                    <Vcard
                      updateBlog={updateBlog}
                      blog={elem}
                      date={FullDate}
                    />
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#modal"
      >
        Launch demo modal
      </button>
      <div className="modal fade" id="modal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Blog
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <label>Title:</label>
              <input
                type={"text"}
                className="form-control"
                id="title"
                value={edit.title}
                onChange={(e) => handleChange(e)}
              />
              <label className="mt-2">Subtitle:</label>
              <input
                type={"text"}
                className="form-control"
                id="subtitle"
                value={edit.subtitle}
                onChange={(e) => handleChange(e)}
              />
              <label className="mt-2">Description:</label>
              <textarea
                rows={4}
                className="form-control"
                id="description"
                value={edit.description}
                onChange={(e) => handleChange(e)}
              ></textarea>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={HandleEditBlog}
                // data-bs-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyBlogs;
