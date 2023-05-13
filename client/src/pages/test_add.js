import React, { useState, useEffect } from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBValidation,
    MDBBtn,
    MDBInput,
    MDBValidationItem
} from "mdb-react-ui-kit";
import ChipInput from "material-ui-chip-input";
import FileBase from "react-file-base64";
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import { createBlog } from '../redux/api';


const initialState = {
    title: "",
    description: "",
    tags: []

}


const AddEditBlog = () => {
    const [blogData, setBlogData] = useState(initialState);
    const {error, loading} = useSelector ((state)=>({...state.blog}));
    const {user} = useSelector ((state)=>({...state.auth}));  
    const dispatch = useDispatch();
    const navigate = useNavigate();              

    const { title, description, tags } = blogData;

    useEffect(()=>{
        error && toast.error(error)
    },[error]);


    const handleSubmit = (e) => {
        e.preventDefault();
        if(title && description && tags){
            const updatedBlogData = {...blogData, name: user?.result?.name};
            dispatch(createBlog({updatedBlogData, navigate, toast}));
    
            handleClear();
        }
    };

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setBlogData({ ...blogData, [name]: value });
    };

    const handleAddTag = (tag) => {
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
            padding: "15px",
            maxWidth: "450px",
            alignContent: "center",
            marginTop: "120px"
        }} className="container">

            <MDBCard alignment='center'>
                <h5>Write Article</h5>
                <MDBCardBody>
                    <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
                        <div className='col-md-12'>
                            <MDBValidationItem feedback="Please provide title" invalid>
                                <MDBInput
                                    placeholder='Enter Title'
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
                            <MDBValidationItem feedback="Please provide the description" invalid>
                                <textarea
                                    placeholder='Enter Description'
                                    type="text"
                                    value={description}
                                    name="description"
                                    onChange={onInputChange}
                                    className="form-control"
                                    required
                                    textarea
                                    rows={4}
                                />
                            </MDBValidationItem>
                        </div>
                        <div className='col-md-12'>
                            <ChipInput
                                name="tags"
                                variant='outlined'
                                placeholder='Enter tag'
                                fullWidth
                                value={tags}
                                onAdd={(tag) => handleAddTag(tag)}
                                onDelete={(tag) => handleDeleteTag(tag)}
                            />
                        </div>
                        <div className='d-flex justify-content-start'>
                            <FileBase
                                type="file"
                                multiple={false}
                                onDone={(({ base64 }) =>
                                    setBlogData({ ...blogData, imageFile: base64 }))
                                } />
                        </div>
                        <div className='col-12'>
                            <MDBBtn style={{ width: "100%" }}>Submit</MDBBtn>
                            <MDBBtn
                                style={{ width: "100%" }}
                                className="mt-2"
                                color='danger'
                                onClick={handleClear}>
                                Clear
                            </MDBBtn>
                        </div>
                    </MDBValidation>
                </MDBCardBody>
            </MDBCard>
        </div>
    )
};

export default AddEditBlog;