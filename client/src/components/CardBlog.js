import React from 'react'
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText, 
    MDBCardImage, 
    MDBCardGroup, 
    MDBBtn,
    MDBIcon,
    MDBTooltip
} from "mdb-react-ui-kit";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { likeBlog } from  "../redux/features/blogSlice.js";

const CardBlog = ({
    imageFile,
    description,
    title,
    tags,
    _id,
    name,
    likes,
  }) => {
    const { user } = useSelector((state) => ({ ...state.auth }));
    const userId = user?.result?._id;

const dispatch = useDispatch();

const excerpt = (str) => {
    if(str.length > 60){
        str = str.substring(0, 60) + " ..."
    }
    return str;
}

const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <MDBIcon fas icon="thumbs-up" />
          &nbsp;
          {likes.length > 2 ? (
            <MDBTooltip
              tag="a"
              title={`You and ${likes.length - 1} other people liked`}
            >
              {likes.length} Liked
            </MDBTooltip>
          ) : (
            `${likes.length} Like${likes.length > 1 ? "ed" : ""}`
          )}
        </>
      ) : (
        <>
          <MDBIcon far icon="thumbs-up" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Liked"}
        </>
      );
    }
    return (
      <>
        <MDBIcon far icon="thumbs-up" />
        &nbsp;Like
      </>
    );
  };

  const handleLike = () => {
    dispatch(likeBlog({ _id }));
  };

  return (
    <MDBCardGroup>
        <MDBCard className='h-100 mt-2 d-sm-flex' style={{maxWidth:"20rem"}}>
            <MDBCardImage
            src={imageFile}
            alt={title}
            position='top'
            style={{maxWidth:"100%", height:"180px"}}  
            />
            <div className='top-left'>{name}</div>
            <span className="text-start tag-card">
                {tags.map((tag, index) => (
                 <Link key={index} to={`/blogs/tag/${tag}`}>#{tag}</Link>   
                ))}

                <MDBBtn 
                style={{float: "right"}} 
                tag="a" color='none' 
                onClick={!user?.result ? null : handleLike}
                >
                {!user?.result ? (
                    <MDBTooltip title="Please login to like the article" tag="a">
                        <Likes/>
                    </MDBTooltip>
                ):(
                    <Likes/>
                )}
                
                </MDBBtn>
            </span>
            <MDBCardBody>
                <MDBCardTitle className='text-start'>{title}</MDBCardTitle>
                <MDBCardText className='text-start'>{excerpt(description)}
                <Link to={`/blog/${_id}`}>
                    Read More
                </Link>
                </MDBCardText>
            </MDBCardBody>
        </MDBCard>
    </MDBCardGroup>
  )
}

export default CardBlog;