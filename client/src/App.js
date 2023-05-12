import './App.css';
import React, { useEffect } from "react";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import {useDispatch} from "react-redux"; 
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddEditBlog from './pages/AddEditBlog';
import { setUser } from "./redux/features/authSlice";
import Header from './components/Header';

function App() {

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(()=>{
    dispatch(setUser(user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <BrowserRouter>
      <div className="App">
      <Header/>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/addBlog' element={<AddEditBlog/>}/>     
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
