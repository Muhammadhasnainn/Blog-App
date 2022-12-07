import express from "express";
import fetchuser from "../middlewares/fetchuser.js";
import Blog from "../models/Blog.js";

const router = express.Router();

router.post("/addblog", fetchuser, async (req, res) => {
  try {
    const { image, title, subtitle, description, tag, author, avatar } =
      req.body;

    const blog = new Blog({
      author,
      avatar,
      image,
      subtitle,
      title,
      description,
      tag,
      user: req.user.id,
    });
    const savedBlog = await blog.save();
    res.json(savedBlog);
  } catch (err) {
    console.log(err);
  }
});

// Delete
router.delete("/deleteblog/:id", fetchuser, async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).send("Not Found");
    }

    if (blog.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    blog = await Blog.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", blog: blog });
  } catch (err) {
    console.log(err);
  }
});

// Update
router.put("/updateblog/:id", fetchuser, async (req, res) => {
  const { image, title, subtitle, description, tag } = req.body;

  try {
    const newBlog = {};
    if (image) {
      newBlog.image = image;
    }
    if (title) {
      newBlog.title = title;
    }
    if (subtitle) {
      newBlog.subtitle = subtitle;
    }
    if (description) {
      newBlog.description = description;
    }
    if (tag) {
      newBlog.tag = tag;
    }

    // Find the blog to be updated and update it
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).send("Not Found");
    }

    if (blog.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: newBlog },
      // new: true will return updated response
      { new: true }
    );
    res.json({ blog });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Fetch all
router.get("/fetchallblogs", async (req, res) => {
  try {
    const blogs = await Blog.find().select("-password").populate("user");
    res.json({ blogs });
  } catch (err) {
    console.log(err);
  }
});

// Fetch user blogs
router.get("/fetchuserblogs", fetchuser, async (req, res) => {
  try {
    const blogs = await Blog.find({ user: req.user.id }).populate("user");
    res.json(blogs);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Fetch specific blogs
router.get("/fetchblog/:id", async (req, res) => {
  try {
    const blog = await Blog.find({ _id: req.params.id });
    res.json(blog);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
export default router;
