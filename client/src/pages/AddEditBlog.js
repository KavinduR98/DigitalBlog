import React, { useState, useEffect } from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBValidation,
    MDBValidationItem,
    MDBBtn,
    MDBTextArea,
    MDBInput,
    MDBIcon
} from "mdb-react-ui-kit";
import Chip from "material-ui-chip-input";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBlog, updateBlog } from "../redux/features/blogSlice"

const initialState = {
    title: "",
    description: "",
    tags: []

}

const AddEditBlog = () => {
    const [blogData, setBlogData] = useState(initialState);
    const [tagErrMsg, setTagErrMsg] = useState(null);
    const { error, userBlogs } = useSelector((state) => ({ ...state.blog }));
    const { user } = useSelector((state) => ({ ...state.auth }));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { title, description, tags } = blogData;
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const singleBlog = userBlogs.find((blog) => blog._id === id);
            console.log(singleBlog);
            setBlogData({ ...singleBlog });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    useEffect(() => {
        error && toast.error(error);
    }, [error]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!tags.length) {
            setTagErrMsg("Please provide some tags")
        }
        if (title && description && tags) {
            const updatedBlogData = { ...blogData, name: user?.result?.name };

            if (!id) {
                dispatch(createBlog({ updatedBlogData, navigate, toast }));
            } else {
                dispatch(updateBlog({ id, updatedBlogData, toast, navigate }));
            }


            handleClear();
        }

    };

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setBlogData({ ...blogData, [name]: value });

    };

    const handleAddTag = (tag) => {
        setTagErrMsg(null);
        setBlogData({ ...blogData, tags: [...blogData.tags, tag] });
    };

    const handleDeleteTag = (deleteTag) => {
        setBlogData({ ...blogData, tags: blogData.tags.filter((tag) => tag !== deleteTag) });

    };

    const handleClear = () => {
        setBlogData({ title: "", description: "", tags: [] })
    };

    return (
        <div style={{
            margin: "auto",
            padding: "10px",
            maxWidth: "1200px",
            alignContent: "center",
            marginTop: "80px"
        }} className="container">

            <MDBCard alignment='center'>
                <div className='row'>
                    <div className='col-md-1 mt-3' style={{ paddingLeft: "40px" }}>
                        <MDBIcon
                            fas
                            size='lg'
                            icon='long-arrow-alt-left'
                            style={{ float: "left" }}
                            onClick={() => navigate("/dashboard")}
                        />
                    </div>
                    <div className='col-md-10'>
                        <h5 style={{ paddingTop: "5px", }}>{id ? "Update Article" : "Write Article"}</h5>
                    </div>
                    <div className='col-md-1'></div>


                </div>

                <MDBCardBody>
                    <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
                        <div className='col-md-12'>
                            <MDBValidationItem feedback="Please provide title" invalid>
                                <MDBInput
                                    label="Title"
                                    type="text"
                                    value={title}
                                    name="title"
                                    onChange={onInputChange}
                                    className="form-control"
                                    required
                                />
                            </MDBValidationItem>
                        </div>
                        <div className='col-md-12'>
                            <MDBValidationItem feedback="Please provide description" invalid>
                                <MDBTextArea
                                    label="Description"
                                    type="text"
                                    value={description}
                                    name="description"
                                    onChange={onInputChange}
                                    className="form-control"
                                    required
                                    textarea
                                    rows={10}
                                />
                            </MDBValidationItem>
                        </div>
                        <div className='col-md-12'>
                            <Chip
                                name="tags"
                                variant='outlined'
                                fullWidth
                                label="Tags"
                                value={tags}
                                onAdd={(tag) => handleAddTag(tag)}
                                onDelete={(tag) => handleDeleteTag(tag)}
                            />
                            {tagErrMsg && (
                                <div className='tagErrMsg'>{tagErrMsg}</div>
                            )}
                        </div>
                        <div className='d-flex justify-content-start'>
                            <FileBase
                                type="file"
                                multiple={false}
                                onDone={(({ base64 }) =>
                                    setBlogData({ ...blogData, imageFile: base64 }))
                                } />
                        </div>
                        <div className='col-md-12 mt-4'>
                            <div className='row'>
                                <div className='col-md-3'></div>
                                <div className='col-md-3'>
                                    <MDBBtn
                                        style={{ width: "100%" }}
                                    >{id ? "Update" : "Submit"}</MDBBtn>
                                </div>
                                <div className='col-md-3'>
                                    <MDBBtn
                                        style={{ width: "100%" }}
                                        color='danger'
                                        onClick={handleClear}>
                                        Clear
                                    </MDBBtn>
                                </div>
                                <div className='col-md-3'></div>
                            </div>
                        </div>
                    </MDBValidation>
                </MDBCardBody>
            </MDBCard>
        </div>
    )
};

export default AddEditBlog;