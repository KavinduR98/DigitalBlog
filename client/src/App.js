import './App.css';
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/authSlice";

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import SingleBlog from './pages/SingleBlog';
import AddEditBlog from './pages/AddEditBlog';

import PrivateRoute from "./components/PrivateRoute";



function App() {

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(setUser(user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/blogs/search' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route path='/addBlog'
            element={
              <PrivateRoute>
                <AddEditBlog />
              </PrivateRoute>
            }
          />
          <Route path='/editBlog/:id'
            element={
              <PrivateRoute>
                <AddEditBlog />
              </PrivateRoute>
            }
          />
          <Route path='/blog/:id' element={<SingleBlog />} />
          <Route
            path='/dashboard'
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
