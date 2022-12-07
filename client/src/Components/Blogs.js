import React, { useEffect, useState } from "react";
import HCard from "./HCard";
import { useUserContext } from "../contexts/UserContext";
import Spinner from "../images/Spinner.gif";

const Blogs = () => {
  const { FetchAllBlogs, blogs } = useUserContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const FetchBlogs = async () => {
      setLoading(true);
      await FetchAllBlogs();
      setLoading(false);
    };
    FetchBlogs();
  }, []);

  return (
    <section className="mt-5 u-width Blogs">
      <h2 className="fw-bold">Recent Blogs.</h2>
      <div className="d-flex justify-content-between">
        <div className="w-60">
          {loading ? (
            <img src={Spinner} className="mx-auto mt-2 d-block" />
          ) : (
            <>
              {blogs.map((elem) => {
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
                  <HCard
                    blog={elem}
                    date={FullDate}
                    link={`/blog/${elem._id}`}
                  />
                  </div>
                );
              })}
            </>
          )}
        </div>
        {/* Categories */}
        <div className="w-40 mt-5 Categories">
          <h1 className="fw-bold fs-6">DISCOVER MORE OF WHAT MATTERS TO YOU</h1>
          <div className="d-flex align-items-center flex-wrap mt-2">
            <div className="category">Programming</div>
            <div className="category">Technology</div>
            <div className="category">Food</div>
            <div className="category">Self Improvement</div>
            <div className="category">Productivity</div>
            <div className="category">Politics</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
