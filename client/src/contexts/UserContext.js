import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../images/Spinner.gif";

const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const [myblogs, setMyBlogs] = useState([]);
  const [blog, setBlog] = useState({});
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const FetchData = async () => {
      try {
        setLoading(true);
        await FetchUser();
        setLoading(false);
      } catch (err) {
        // console.log(err);
        setLoading(false);
      }
    };
    FetchData();
  }, []);

  const FetchAllBlogs = async () => {
    const data = await axios.get(
      "/api/blogs/fetchallblogs"
    );
    setBlogs(data.data.blogs);
  };

  // Fetch login user
  const FetchUser = async () => {
    const data = await axios.get("/api/auth/getuser", {
      headers: { "auth-token": localStorage.getItem("token") },
    });
    setUser(data.data);
  };

  // Fetch user blogs
  const FetchBlogs = async () => {
    const data = await axios.get(
      "/api/blogs/fetchuserblogs",
      { headers: { "auth-token": localStorage.getItem("token") } }
    );
    setMyBlogs(data.data);
  };

  // Edit user
  const HandleEditUser = async (edit) => {
    try {
      await axios.put(
        `/api/auth/update/${edit?._id}`,
        edit,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      FetchUser();
    } catch (err) {
      console.log(err.data);
    }
  };

  // Delete user
  const HandleDeleteUser = async (edit) => {
    await axios.delete(`/api/auth/delete/${edit._id}`, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    FetchUser();
  };

  // Fetch Blog by Id
  const FetchBlogByID = async (id) => {
    const data = await axios.get(
      `/api/blogs/fetchblog/${id}`
    );
    setBlog(data?.data[0]);
  };

  // Edit Blog
  const HandleEdit = async (edit) => {
    await axios.put(
      `/api/blogs/updateblog/${edit._id}`,
      edit,
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    FetchBlogs();
  };

  // Delete Blog
  const HandleDelete = async (id) => {
    await axios.delete(`/api/blogs/deleteblog/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    FetchBlogs();
  };

  if (loading) return <img src={Spinner} className="Loader" />;

  return (
    <UserContext.Provider
      value={{
        user,
        FetchAllBlogs,
        FetchUser,
        HandleEditUser,
        HandleDeleteUser,
        HandleEdit,
        HandleDelete,
        FetchBlogs,
        FetchBlogByID,
        myblogs,
        blog,
        blogs,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
