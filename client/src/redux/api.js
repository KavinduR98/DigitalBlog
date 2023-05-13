import axios from "axios";

const API = axios.create({baseURL: "http://localhost:5000"});

  
API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")).token
    }`;
    }
    return req;
});

export const signIn = (FormData) => API.post("/users/signin", FormData);
export const signUp = (FormData) => API.post("/users/signup", FormData);

export const createBlog = (blogData) => API.post("/blog", blogData);
export const getBlogs = (page)=> API.get(`/blog?page=${page}`);
export const updateBlog = (updatedBlogData,id)=> API.patch(`/blog/${id}`, updatedBlogData);
export const getBlog = (id)=> API.get(`/blog/${id}`);
export const deleteBlog = (id)=> API.delete(`/blog/${id}`);