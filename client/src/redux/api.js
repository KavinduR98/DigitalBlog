import axios from "axios";

const devEnv = process.env.NODE_ENV !== "production";

const {REACT_APP_DEV_API, REACT_APP_PROD_API} = process.env;


const API = axios.create({baseURL: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}`});

  
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
export const getBlogsByUser = (userId)=> API.get(`/blog/userBlogs/${userId}`);
export const getTagBlogs = (tag)=> API.get(`/blog/tag/${tag}`);

export const likeBlog = (id) => API.patch(`/blog/like/${id}`);
export const getRelatedBlogs = (tags)=> API.post(`/blog/relatedBlogs`,tags);
export const getBlogBySearch = (searchQuery)=> API.get(`/blog/search?searchQuery=${searchQuery}`);