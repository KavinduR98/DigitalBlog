import React,{useState} from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBFooter,
    MDBValidation,
    MDBValidationItem,
    MDBBtn,
    MDBIcon,
} from "mdb-react-ui-kit";
import {Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { toast} from 'react-toastify';
import { login } from '../redux/features/authSlice';




const initialState ={
    email: "",
    password:""
}

const Login = () => {
    const [formValue, setFormValue]= useState(initialState);
    const {email,password} = formValue;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(email && password){
            dispatch(login({formValue,navigate, toast}));
        }
    };
    const onInputChange = (e)=> {
        let {name,value}= e.target;
        setFormValue({...formValue, [name]: value });
    };


  return(
    <div style={{
    margin: "auto", 
    padding:"15px", 
    maxWidth: "450px", 
    alignContent: "center", 
    marginTop: "120px"
    }}>

    <MDBCard alignment='center'>
        <MDBIcon fas icon='user-circle' className='fa-2x mt-2'/>
        <h5>Sign In</h5>
        <MDBCardBody>
            <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>
                <div className='col-md-12'>
                    <MDBValidationItem feedback='Please provide your email' invalid>
                        <MDBInput
                        label="Email"
                        type="email"
                        value={email}
                        name="email"
                        onChange={onInputChange}
                        required
                        />
                    </MDBValidationItem>
                </div>
                <div className='col-md-12'>
                    <MDBValidationItem feedback='Please provide your password' invalid>
                        <MDBInput
                        label="Password"
                        type="password"
                        value={password}
                        name="password"
                        onChange={onInputChange}
                        required
                        />
                    </MDBValidationItem>
                </div>
                <div className="col-12">
                    <MDBBtn style={{width: "100%"}} className="mt-2">
                        Login
                    </MDBBtn>
                </div>
            </MDBValidation>
        </MDBCardBody>
        <MDBFooter>
            <Link to="/register">
            <p>Don't have an account? Sign Up</p>
            </Link>
        </MDBFooter>
    </MDBCard>
    </div>
  )
  
};

export default Login;;