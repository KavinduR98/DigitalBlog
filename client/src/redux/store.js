import {configureStore} from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import BlogReducer from "./features/blogSlice";

export default configureStore({

    reducer:{
        auth: AuthReducer,
        blog: BlogReducer,
    },
});