import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    title: String,
    description: String,
    name: String,
    creator: String,
    tags:[String],
    imageFile: String,
    createdAt:{
        type: Date,
        default: new Date(),
    },
    likes:{
        type: [String],
        default: [],
    },
});

const BlogModel = mongoose.model("Blog", blogSchema);
export default BlogModel;