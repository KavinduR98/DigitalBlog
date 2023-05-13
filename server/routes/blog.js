import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js"

import { createBlog, getBlogs, getBlog, deleteBlog, updateBlog, likeBlog } from "../controllers/blog.js"

router.get("/", getBlogs);
router.get("/:id", getBlog);

router.post("/", auth, createBlog);
router.delete("/:id", auth, deleteBlog);
router.patch("/:id", auth, updateBlog);
router.patch("/like/:id", auth, likeBlog);

export default router;