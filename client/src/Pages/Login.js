import React, { useState } from "react";
import LoginImg from "../images/Login.jpg";
import NavBar from "../Components/NavBar";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [credentials, setCredentials] = useState({});

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const HandleLogin = async () => {
    try {
      const res = await axios.post(
        "/api/auth/login",
        credentials,
        { headers: { "Content-Type": "application/json" } }
      );

      const json = await res.data;
      setCredentials({  email: "", password: "" });
      if (json.success) {
        localStorage.setItem("token", json.authToken)
      } else {
        alert("Something went wrong!", "danger");
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  if(localStorage.getItem("token")) return <Navigate to="/" />;
  
  return (
    <div>
      <NavBar />
      <div className="d-flex justify-content-between align-items-center">
        <img src={LoginImg} className="w-50" alt="img" />
        <div className="w-50">
          <div>
            <label>Email</label>
            <input
              type={"email"}
              id="email"
              className="form-control"
              placeholder="test@gmail.com"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="mt-2">
            <label>Password</label>
            <input
              type={"password"}
              id="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button className="btn btn-warning mt-2" onClick={HandleLogin}>
            Login
          </button>
          <p className="text-center mt-3">
            New here ?{" "}
            <Link to="/register" className="text-primary fw-bold">
              Sign Up
            </Link>{" "}
            now!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
