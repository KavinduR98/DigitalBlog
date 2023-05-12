import express from "express";
const router = express.Router();

import {createBlog, getBlogs} from "../controllers/blog.js"

router.post("/", createBlog);
router.get("/", getBlogs);


export default router;