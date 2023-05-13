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



const blogSlice = createSlice({
    name: "blog",
    initialState: {
        blog: {},
        blogs: [],
        userBlogs: [],
        error: "",
        loading: false,
    },
    extraReducers: {
        [createBlog.pending]: (state, action) => {
            state.loading = true;
        },
        [createBlog.fulfilled]: (state, action) => {
            state.loading = false;
            state.blogs.push = [action.payload];
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
    },
});

export default blogSlice.reducer;