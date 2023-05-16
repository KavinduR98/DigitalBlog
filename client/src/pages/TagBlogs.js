import React , {useEffect} from 'react';
import {
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardBody, 
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBBtn, 
    MDBCardGroup } 
    from "mdb-react-ui-kit";
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import {getBlogsByTag} from "../redux/features/blogSlice"
import { excerpt } from '../utility/index';

const TagBlogs = () => {
    const {tagBlogs, loading} = useSelector((state)=> ({...state.blog}));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {tag} = useParams();

    useEffect(() =>{

        if(tag){
            dispatch(getBlogsByTag(tag))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[tag])

    if(loading){
        return <Spinner/>
    }

    return (
    <div style={{
        margin: "auto",
        padding: "120px",
        maxWidth: "800px",
        alignContent: "center",
    }}>
        <h3 className='text-center'>Blog Articles with tag: {tag}</h3>
        <hr style={{maxWidth: "570px"}}/>
        {tagBlogs && tagBlogs.map((item) =>(
            <MDBCardGroup key={item._id}>
                <MDBCard style={{maxWidth: "600px"}} className="mt-2">
                    <MDBRow className='g-0'>
                        <MDBCol md="4">
                            <MDBCardImage
                            className='rounded'
                            src={item.imageFile}
                            alt={item.title}
                            fluid
                            />
                        </MDBCol>
                        <MDBCol md='8'>
                            <MDBCardBody>
                                <MDBCardTitle className='text-start'>{item.title}
                                </MDBCardTitle>
                                    <MDBCardText className='text-start'>
                                        {excerpt(item.description,40)}
                                    </MDBCardText>
                                    <div style={{float:"left", marginTop:"-10px"}}>
                                        <MDBBtn size='sm' rounded color='info' onClick={()=> navigate(`/blog/${item._id}`)}>
                                            Read More
                                        </MDBBtn>
                                    </div>
                            </MDBCardBody>
                        </MDBCol>
                    </MDBRow>
                </MDBCard>
            </MDBCardGroup>
        ))} 
    </div>
  )
}

export default TagBlogs;