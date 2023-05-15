import React, { useEffect } from 'react'
import {
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBIcon,
    MDBCardGroup
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getBlogsByUser } from '../redux/features/blogSlice';
import Spinner from '../components/Spinner';
import { deleteBlog } from '../redux/features/blogSlice';
import { toast } from "react-toastify";

const Dashboard = () => {
    const { user } = useSelector((state) => ({ ...state.auth }));
    const { userBlogs, loading } = useSelector((state) => ({ ...state.blog }));
    const userId = user?.result?._id;

    const dispatch = useDispatch();

    useEffect(() => {
        if (userId) {
            dispatch(getBlogsByUser(userId))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const excerpt = (str) => {
        if (str.length > 35) {
            str = str.substring(0, 35) + " ...";
        }
        return str;
    };
    if (loading) {
        return <Spinner />;
    }

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this article?")) {
            dispatch(deleteBlog({ id, toast }));
        }
    };
    return (
        <div style={{
            margin: "auto",
            padding: "120px",
            maxWidth: "1200px",
            alignContent: "center",
        }}>

            {userBlogs.length === 0 && (
                <h3>No articles available with the user: {user?.result?.name} </h3>
            )}

            {userBlogs.length > 0 && (
                <>
                    <h4 className='text-center'>Dashboard: {user?.result?.name}</h4>
                    <hr style={{ maxWith: "570px" }} />
                </>
            )}
            {userBlogs && userBlogs.map((item) => (
                <MDBCardGroup key={item._id}>
                    <MDBCard style={{ maxWidth: "1000px"}} className="mt-2">
                        <MDBRow className='g-0' style={{maxHeight: "150px"}}>
                            <MDBCol size='4'>
                                <MDBCardImage
                                    style={{ maxHeight: "150px" }}
                                    className='rounded'
                                    src={item.imageFile}
                                    alt={item.title}
                                    fluid
                                />
                            </MDBCol>
                            <MDBCol size='5' style={{ marginTop:"30px"}}>
                                <MDBCardTitle className='text-start'>
                                    {item.title}
                                </MDBCardTitle>
                                <MDBCardText className='text-start'>
                                    <small className='text-muted'>
                                        {excerpt(item.description)}
                                    </small>
                                </MDBCardText>
                            </MDBCol>
                            <MDBCol size='3' style={{ marginTop:"30px", paddingRight:"40px"}}>
                                <div style={{ marginLeft: "5px", float: "right", }}>
                                    <MDBBtn className='mt-1' tag="a" color="none" style={{ marginRight: "15px" }}>
                                        <MDBIcon
                                            fas
                                            icon='trash'
                                            style={{ color: "#dd4b39" }}
                                            size="lg"
                                            onClick={() => handleDelete(item._id)}
                                        />
                                    </MDBBtn>
                                    <Link to={`/editBlog/${item._id}`}>
                                        <MDBIcon
                                            fas
                                            icon='edit'
                                            style={{ color: "#55acee", marginLeft: "10px" }}
                                            size="lg"
                                        />
                                    </Link>
                                </div>
                            </MDBCol>

                        </MDBRow>
                    </MDBCard>
                </MDBCardGroup>
            ))}
        </div>
    )
}
export default Dashboard;