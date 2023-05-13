import BlogModel from "../models/blog.js";


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