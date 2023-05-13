import BlogModel from "../models/blog.js";
import mongoose from "mongoose";


export const createBlog = async(req,res)=>{
    const blog = req.body;
    const newBlog = new BlogModel({
        ...blog,
        creator: req.userId,
        createdAt: new Date().toISOString()
    });
    try{
        await newBlog.save();
        res.status(201).json(newBlog);
    }catch(error){
        res.status(404).json({message: "Something went wrong"});
    }
};

export const getBlogs = async(req,res)=>{
    const {page} = req.query;
    try{
       const limit = 6
       const startIndex = (Number(page)-1 ) * limit;
       const total = await BlogModel.countDocuments({});
       const blogs = await BlogModel.find().limit(limit).skip(startIndex);
       res.json({
           data: blogs,
           currentPage: Number(page),
           totalBlogs: total,
           numberOfPages: Math.ceil(total/ limit)
       })

    }catch(error){

        res.status(404).json({message: "Something went wrong"});
    }
};

export const updateBlog = async(req,res)=>{
    const {id} = req.params;
    const {title, description, creator, imageFile, tags} = req.body;

    try{
     if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({message: `No article found with the id: ${id}`});
        }

        const updatedBlog = {
            creator,
            title,
            description,
            tags,
            imageFile,
            _id: id
        }
        await BlogModel.findByIdAndUpdate(id, updatedBlog, {new:true});
        res.json(updatedBlog);
    }catch(error){
        res.status(404).json({message: "Something went wrong"});
    }
    
};

export const getBlog = async(req,res)=>{
    const {id} = req.params
    try{
        const blog = await BlogModel.findById(id);
        res.status(200).json(blog)
    }catch(error){

        res.status(404).json({message: "Something went wrong"});
    }
};

export const getBlogsByUser = async(req,res)=>{
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({message: "User does not exist"})
  }
  const userBlogs = await BlogModel.find({creator: id});
  res.status(200).json(userBlogs);
};

export const deleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: `No article exist with id: ${id}` });
      }
      await BlogModel.findByIdAndRemove(id);
      res.json({ message: "Article deleted successfully" });
    } catch (error) {
      res.status(404).json({ message: "Something went wrong" });
    }
  };

  export const likeBlog = async (req, res) => {
    const { id } = req.params;
    try {
      if (!req.userId) {
        return res.json({ message: "User is not authenticated" });
      }
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: `No Article exist with id: ${id}` });
      }
  
      const blog = await BlogModel.findById(id);
  
      const index = blog.likes.findIndex((id) => id === String(req.userId));
  
      if (index === -1) {
        blog.likes.push(req.userId);
      } else {
        blog.likes = blog.likes.filter((id) => id !== String(req.userId));
      }
  
      const updatedBlog = await BlogModel.findByIdAndUpdate(id, blog, {
        new: true,
      });
  
      res.status(200).json(updatedBlog);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
    
};

export const getBlogsBySearch = async(req,res)=>{
  const {searchQuery}=req.query;
  try{
      const title= new RegExp(searchQuery,"i");
      const blogs = await BlogModel.find({title});
      res.json(blogs);
  }catch(error){
      res.status(404).json({message:"Something went wrong"});
  }
};

export const getBlogsByTag = async(req,res)=>{
  const {tag}=req.params;
  try{
     const blogs = await BlogModel.find({tags:{$in: tag}});
     res.json(blogs);
  }catch(error){
      res.status(404).json({message:"Something went wrong"});
  }
};

export const getRelatedBlogs = async(req,res)=>{
  const tags =req.body;
  try{
     const blogs = await BlogModel.find({tags:{$in: tags}});
     res.json(blogs);
  }catch(error){
      res.status(404).json({message:"Something went wrong"});
  }
};