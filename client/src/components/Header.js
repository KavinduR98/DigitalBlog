import React, { useState } from "react";
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBNavbarBrand,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/features/authSlice";
import { searchBlogs } from '../redux/features/blogSlice';
import { useNavigate } from "react-router-dom";
import decode from "jwt-decode";

const Header = () => {
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState("");
    const { user } = useSelector((state) => ({ ...state.auth }));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = user?.token;

    if (token) {
        const decodedToken = decode(token);
        if (decodedToken.exp * 1000 < new Date().getTime()) {
            dispatch(setLogout());
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (search) {
            dispatch(searchBlogs(search));
            navigate(`/blogs/search?searchQuery=${search}`);
            setSearch("");
        } else {
            navigate("/");
        }
    }

    const handleLogout = () => {
        dispatch(setLogout());
    };

    return (
        <MDBNavbar fixed="top" expand="lg" style={{ backgroundColor: "#343a40" }}>
            <MDBContainer>
                <MDBNavbarBrand
                    href="/"
                    style={{ color: "#fff", fontWeight: "600", fontSize: "22px" }}
                >
                    Digital~Blog
                </MDBNavbarBrand>
                <MDBNavbarToggler
                    type="button"
                    aria-expanded="false"
                    aria-label="Toogle navigation"
                    onClick={() => setShow(!show)}
                    style={{ color: "#606080" }}
                >
                    <MDBIcon icon="bars" fas />
                </MDBNavbarToggler>
                <MDBCollapse show={show} navbar>
                    <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
                        <MDBNavbarItem>
                            <MDBNavbarLink href="/" style={{paddingRight:"30px"}}>
                                <p className="header-text">Home</p>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                    
                        {user?.result?._id && (
                            <>
                                <MDBNavbarItem>
                                    <MDBNavbarLink href="/addBlog" style={{paddingRight:"30px"}}>
                                        <p className="header-text">Write&nbsp;<MDBIcon fas icon="pen-alt" /></p>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                                <MDBNavbarItem>
                                    <MDBNavbarLink href="/dashboard" style={{paddingRight:"30px"}}>
                                        <p className="header-text">Dashboard</p>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                            </>
                        )}
                        {user?.result?._id ? (
                            <MDBNavbarItem>
                                <MDBNavbarLink href="/login" style={{paddingRight:"30px"}}>
                                    <p className="header-text" onClick={handleLogout}>SignOut&nbsp;<MDBIcon fas icon="sign-out-alt" /></p>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                        ) : (
                            <MDBNavbarItem>
                                <MDBNavbarLink href="/login"  style={{paddingRight:"30px"}}>
                                    <p className="header-text">Login</p>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                        )}
                    </MDBNavbarNav>
                    <form className="d-flex input-group w-auto" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search Article"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </form>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
};

export default Header;
