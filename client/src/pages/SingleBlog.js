import React, {useEffect} from 'react';
import {MDBCard, MDBCardBody, MDBCardText,MDBCardImage,MDBContainer,MDBIcon, MDBBtn} from "mdb-react-ui-kit";
import {useDispatch,useSelector} from "react-redux";
import {useParams, useNavigate} from "react-router-dom";
import moment from "moment";
import { getRelatedBlogs, getBlog } from '../redux/features/blogSlice';
import RelatedReports from '../components/RelatedBlogs';



const SingleBlog = () => {

    const dispatch = useDispatch();
    const {blog, relatedBlogs} =useSelector((state)=> ({...state.blog}));
    const { id } = useParams(); 
    const navigate = useNavigate();
    const tags = blog?.tags

    useEffect(()=>{
        tags && dispatch(getRelatedBlogs(tags));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[tags]);

    useEffect(() =>{

        if(id){
            dispatch(getBlog(id));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id]);

  return (
    <>
    <MDBContainer>
        <MDBCard className='mb-3 mt-2'>
            <MDBCardImage
            position='top'
            style={{width: "100%", maxHeight:"600px"}}
            src={blog.imageFile}
            alt={blog.title}
            />
                  <MDBCardBody>
                      <MDBBtn tag="a" color='none' style={{ float: "left", color: "#000" }} onClick={() => navigate("/")}>
                          <MDBIcon
                              fas
                              size='lg'
                              icon='long-arrow-alt-left'
                              style={{float:"left"}}
                          />

                      </MDBBtn>
                <h3>{blog.title}</h3>
                <span>
                    <p className='text-start reportName'>Created By: {blog.name}</p>
                </span>
                <div style={{float: "left"}}>
                    <span className='text-start'>
                        {blog && blog.tags && blog.tags.map((item)=> `#${item}`)}
                    </span>
                </div>
                <br/>
                <MDBCardText className='text-start mt-2'>
                    <MDBIcon
                    style={{float:"left", margin:"5px"}}
                    far
                    icon='calendar-alt'
                    size='lg'
                    />
                    <small className='text-muted'>
                        {moment(blog.createdAt).fromNow()}
                    </small>
                </MDBCardText>
                <MDBCardText className='lead mb-0 text-start'>
                    {blog.description}
                </MDBCardText>
            </MDBCardBody>
            <RelatedReports relatedBlogs={relatedBlogs} blogId={id}/>
        </MDBCard>
    </MDBContainer>
    </>
  )
}

export default SingleBlog;