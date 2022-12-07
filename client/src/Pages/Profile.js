import React, { useEffect } from "react";
import { GrEdit } from "react-icons/gr";
import { Navigate, useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import { useUserContext } from "../contexts/UserContext";

const Profile = () => {
  const { user, FetchUser, HandleEditUser, HandleDeleteUser } =
    useUserContext();
  const navigate = useNavigate();
  // const PF = "../../../server/Images/";
  const PF = "/images/";

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

  const HandleEdit = () => {
    const promptt = prompt("Edit your name", user.name);
    if (promptt.length > 0) {
      const updatedUser = { ...user, name: promptt };
      HandleEditUser(updatedUser);
    }
  };

  const HandleDelete = () => {
    const confirmDel = window.confirm("Do you want to delete your account?");
    if (confirmDel) {
      HandleDeleteUser(user);
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  useEffect(() => {
    FetchUser();
  }, []);

  if (!localStorage.getItem("token")) return <Navigate to="/login" />;

  return (
    <div>
      <NavBar />
      <div>
        <h1 className="fw-bold text-center mt-2">My Profile</h1>
        <div className="profile mx-auto mt-3">
          <div className="d-flex align-items-center">
            <div
              className="b-avatar"
              style={{ background: `url('${PF + user.img}')` }}
            ></div>
            <div
              className="d-flex align-items-center justify-content-between ms-4 
            fw-bold w-75"
            >
              <p className="fs-3">{user.name}</p>
              <GrEdit
                size={20}
                className="mt-2"
                cursor={"pointer"}
                onClick={() => HandleEdit()}
              />
            </div>
          </div>
          <hr />
          <div className="d-flex justify-content-between mt-2">
            <p>Email</p>
            <p>{user.email}</p>
          </div>
          <hr />
          <div className="d-flex justify-content-between mt-2">
            <p>Member since</p>
            <p>
              {months[user.date?.split("-")[1] - 1]} {user.date?.split("-")[0]}
            </p>
          </div>
          <hr />
          <div className="d-flex">
            <button className="btn btn-danger me-3" onClick={HandleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
