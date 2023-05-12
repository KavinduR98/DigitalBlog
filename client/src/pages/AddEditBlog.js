import React, { useState } from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBValidation,
    MDBBtn,
    MDBInput
} from "mdb-react-ui-kit";
import ChipInput from "material-ui-chip-input";
import FileBase from "react-file-base64";


const initialState = {
    title: "",
    description: "",
    tags: []

}


const AddEditBlog = () => {
    const [blogData, setBlogData] = useState(initialState);

    const { title, description, tags } = blogData;


    const handleSubmit = (e) => {
        e.preventDefault();
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
                            <MDBInput
                                placeholder='Enter Title'
                                type="text"
                                value={title}
                                name="title"
                                onChange={onInputChange}
                                className="form-control"
                                required
                                invalid
                                validation="Please provide the title"
                            />
                        </div>
                        <div className='col-md-12'>
                            <textarea
                                placeholder='Enter Description'
                                type="text"
                                value={description}
                                name="description"
                                onChange={onInputChange}
                                className="form-control"
                                required
                                invalid
                                textarea
                                rows={4}
                                validation="Please provide the description"
                            />
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