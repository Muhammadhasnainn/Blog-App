import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import WriteBlog from "./Pages/WriteBlog";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Blog from "./Pages/Blog";
import MyBlogs from "./Pages/MyBlogs";
import Profile from "./Pages/Profile";
import UserContextProvider from "./contexts/UserContext";

function App() {
  return (
    <>
      <UserContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/write" element={<WriteBlog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/myblogs" element={<MyBlogs />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
      </UserContextProvider>
    </>
  );
}

export default App;
