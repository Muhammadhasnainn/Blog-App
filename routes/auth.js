import express from "express";
import User from "../models/User.js";
import Blog from "../models/Blog.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fetchuser from "../middlewares/fetchuser.js";

const router = express.Router();
const JWT_SECRET = "Thisisasecretkey";

router.post("/register", async (req, res) => {
  let success = false;
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      success = false;
      return res.status(400).json({
        success,
        error: "Sorry a user with this email already exist",
      });
    }
    const salt = await bcrypt.genSalt(10);
    let securePassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    user = await User.create({
      img: req.body.img,
      name: req.body.name,
      email: req.body.email,
      password: securePassword,
    });

    const data = {
      user: {
        id: user.id,
      },
    };

    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authToken });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Internal server error");
  }
});

router.post("/login", async (req, res) => {
  let success = false;
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success, error: "Invalid credentials!" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: "Invalid credentials!" });
    }
    const data = {
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authToken });
    return res.status(200).json();
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Internal server error");
  }
});

// Update
router.put("/update/:id", fetchuser, async (req, res) => {
  const { name, email, img, password } = req.body;

  try {
    const newUser = {};
    if (name) {
      newUser.name = name;
    }
    if (email) {
      newUser.email = email;
    }
    if (img) {
      newUser.img = img;
    }
    if (password) {
      newUser.password = password;
    }

    let user = await User.findById(req.params.id);
    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: newUser },
      { new: true }
    );
    res.json({ user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Delete
router.delete("/delete/:id", fetchuser, async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("Not Found");
    }

    if (user._id.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    user = await User.findByIdAndDelete(req.params.id);
    await Blog.deleteMany({ user: req.params.id });

    res.json({ Success: "Note has been deleted", user: user });
  } catch (err) {
    console.log(err);
  }
});

router.get("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    // const user = await User.findById(userId).select("-password");
    const user = await User.findById(userId);
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
