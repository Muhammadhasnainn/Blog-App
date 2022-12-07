import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { FiLogOut, FiUser } from "react-icons/fi";
import { IoMdDocument } from "react-icons/io";
import { useUserContext } from "../contexts/UserContext";

const NavBar = () => {
  const { user, FetchUser } = useUserContext();

  useEffect(() => {
    FetchUser();
  }, []);

  return (
    <nav className="Navbar">
      <div className="d-flex justify-content-between align-items-center u-width py-2">
        <Link to="/" className="navbar-brand">
          <h2>Blog.</h2>
        </Link>
        <div className="d-flex align-items-center">
          {localStorage.getItem("token") ? (
            <>
              <Link to="/myblogs" className="btn btn-warning me-3">
                My Blogs
              </Link>
              <div className="d-flex align-items-center dropdown">
                <p>{user.name?.split(" ")[0]}</p>
                <div
                  className="user ms-1 dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FaUserAlt size={26} />
                </div>
                <ul className="dropdown-menu">
                  <Link to="/profile">
                    <FiUser size={20} />
                    <p className="ms-2">Profile</p>
                  </Link>
                  <Link to="/myblogs">
                    <IoMdDocument size={20} />
                    <p className="ms-2">My Blogs</p>
                  </Link>
                  <li>
                    <FiLogOut size={20} />
                    <p
                      className="ms-2"
                      onClick={() => {
                        localStorage.removeItem("token");
                        window.location.reload();
                      }}
                    >
                      Log out
                    </p>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-warning">
                Login
              </Link>
              <Link to="/register" className="btn btn-warning ms-2">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
