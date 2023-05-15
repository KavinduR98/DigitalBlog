import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createBlog = createAsyncThunk(
    "blog/createBlog",
    async ({ updatedBlogData, navigate, toast }, { rejectWithValue }) => {
        try {
            const response = await api.createBlog(updatedBlogData);
            toast.success("Article added Successfully");
            navigate("/");
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const updateBlog = createAsyncThunk(
    "report/updateBlog",
    async ({ id, updatedBlogData, toast, navigate }, { rejectWithValue }) => {
        try {
            const response = await api.updateBlog(updatedBlogData, id);
            toast.success("Article updated successfully");
            navigate("/");
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const getBlogs = createAsyncThunk(
    "report/getBlogs",
    async (page, { rejectWithValue }) => {
        try {
            const response = await api.getBlogs(page);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const getBlog = createAsyncThunk(
    "report/getBlog",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.getBlog(id);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const likeBlog = createAsyncThunk(
    "report/likeBlog",
    async ({ _id }, { rejectWithValue }) => {
        try {
            const response = await api.likeBlog(_id);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getRelatedBlogs = createAsyncThunk(
    "report/getRelatedBlogs",
    async(tags,{rejectWithValue})=>{
    try{
        const response = await api.getRelatedBlogs(tags);
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
});

export const searchBlogs = createAsyncThunk(
    "report/searchBlogs",
    async(searchQuery,{rejectWithValue})=>{
    try{
        const response = await api.getBlogBySearch(searchQuery);
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
});

export const getBlogsByUser = createAsyncThunk(
    "report/getBlogsByUser",
    async(userId,{rejectWithValue})=>{
    try{
        const response = await api.getBlogsByUser(userId);
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
});

export const getBlogsByTag = createAsyncThunk(
    "report/getBlogsByTag",
    async(tag,{rejectWithValue})=>{
    try{
        const response = await api.getTagBlogs(tag);
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
});

export const deleteBlog = createAsyncThunk(
    "report/deleteBlog",
    async({id,toast},{rejectWithValue})=>{
    try{
        const response = await api.deleteBlog(id);
        toast.success("Article deleted successfully");
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
});



const blogSlice = createSlice({
    name: "blog",
    initialState: {
        blog: {},
        blogs: [],
        userBlogs: [],
        tagBlogs: [],
        relatedBlogs: [],
        currentPage: 1,
        numberOfPages: null,
        error: "",
        loading: false,
    },
    reducers:{
        setCurrentPage: (state, action) =>{
            state.currentPage = action.payload;
        }
    },
    extraReducers: {
        [createBlog.pending]: (state, action) => {
            state.loading = true;
        },
        [createBlog.fulfilled]: (state, action) => {
            state.loading = false;
            state.blogs = [action.payload];
        },
        [createBlog.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getBlogs.pending]: (state, action) => {
            state.loading = true;
        },
        [getBlogs.fulfilled]: (state, action) => {
            state.loading = false;
            state.blogs = action.payload.data;
            state.numberOfPages = action.payload.numberOfPages;
            state.currentPage = action.payload.currentPage;

        },
        [getBlogs.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [updateBlog.pending]: (state, action) => {
            state.loading = true;
        },
        [updateBlog.fulfilled]: (state, action) => {
            state.loading = false;

            const { arg: { id } } = action.meta;
            if (id) {
                state.userBlogs = state.userBlogs.map((item) =>
                    item._id === id ? action.payload : item);
                state.blogs = state.blogs.map((item) =>
                    item._id === id ? action.payload : item);
            }
        },
        [updateBlog.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getBlog.pending]: (state, action) => {
            state.loading = true;
        },
        [getBlog.fulfilled]: (state, action) => {
            state.loading = false;
            state.blog = action.payload;
        },
        [getBlog.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getBlogsByUser.pending]: (state,action)=>{
            state.loading = true;
        },
        [getBlogsByUser.fulfilled]:(state,action)=>{
            state.loading = false;
           state.userBlogs = action.payload;
        },
        [getBlogsByUser.rejected]:(state, action)=>{
          state.loading = false;
          state.error = action.payload.message;
        },
        [deleteBlog.pending]: (state,action)=>{
            state.loading = true;
        },
        [deleteBlog.fulfilled]:(state,action)=>{
            state.loading = false;
            console.log("action", action);
           const {arg: {id}} = action.meta;
           if(id){
               state.userBlogs = state.userBlogs.filter((item)=> item._id !== id);
               state.blogs = state.blogs.filter((item)=> item._id !== id);
           }
        },
        [deleteBlog.rejected]:(state, action)=>{
          state.loading = false;
          state.error = action.payload.message;
        },
        [likeBlog.pending]: (state, action) => {},
        [likeBlog.fulfilled]: (state, action) => {
          state.loading = false;
          const {
            arg: { _id },
          } = action.meta;
          if (_id) {
            state.blogs = state.blogs.map((item) =>
              item._id === _id ? action.payload : item
            );
          }
        },
        [likeBlog.rejected]: (state, action) => {
          state.error = action.payload.message;
        },
        [searchBlogs.pending]: (state,action)=>{
            state.loading = true;
        },
        [searchBlogs.fulfilled]:(state,action)=>{
            state.loading = false;
           state.blogs = action.payload;
        },
        [searchBlogs.rejected]:(state, action)=>{
          state.loading = false;
          state.error = action.payload.message;
        },
        [getBlogsByTag.pending]: (state,action)=>{
            state.loading = true;
        },
        [getBlogsByTag.fulfilled]:(state,action)=>{
            state.loading = false;
           state.tagBlogs = action.payload;
        },
        [getBlogsByTag.rejected]:(state, action)=>{
          state.loading = false;
          state.error = action.payload.message;
        },
        [getRelatedBlogs.pending]: (state,action)=>{
            state.loading = true;
        },
        [getRelatedBlogs.fulfilled]:(state,action)=>{
            state.loading = false;
           state.relatedBlogs= action.payload;
        },
        [getRelatedBlogs.rejected]:(state, action)=>{
          state.loading = false;
          state.error = action.payload.message;
        },
    },
});

export const  {setCurrentPage} = blogSlice.actions;

export default blogSlice.reducer;