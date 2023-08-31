import React,{ useEffect, useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { updateLeadSchema } from '../validationSchema'
import { useNavigate, useParams } from 'react-router-dom';
import {useFormik} from 'formik'
import axios from "axios";
import { ATLAS_URI } from '../constants';

function ProfileEdit() {

    
  
  

    const initialValue = {
        name: "",
        address: "",
        password: "",
       
        image: ''
        
      };
    
      const [formValues, setformValues] = useState(initialValue);
      const [file, setFile] = useState();
      const [images, setImages] = useState([]);
      const profileImageInputRef = React.useRef(null)
      const [edit, setEdit] = useState(false)

      const routeParams = useParams()

      useEffect(()=>{
        console.log(routeParams,'params')
        axios.get(`${ATLAS_URI}/getUserDetails/${routeParams.id}` ).then(response=>{
            console.log(response)
            setformValues({
                name: response.data.name,
                address: response.data.address,
                password: response.data.password,
                image: response.data.image

        })
        }).catch(error=>{
            console.log(error)
        
        })
      },[routeParams.id])
    
      const navigate = useNavigate()
    
    
    
    
      const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFile(e.target.files[0])
        setformValues({ ...formValues, [name]: value });
      };
    
    
    const handleSubmit = (e)=>{
        console.log(formValues)
    }
    const onSubmit = () => {
      console.log(formValues, "formvalues");
      const formData = new FormData();
    
      if (file && file.type != "image/png" && file.type != "image/jpeg") {
        alert("Only png/jpeg file is accepted");
        return;
      }
      
    
      for (const i in formik.values) {
        console.log(formik.values[i], "ini");
        formData.append(i, formik.values[i]);
      }
      formData.append('id', routeParams.id)
      if (file !== undefined) {
        formData.append("userImage", file);
      }
    
      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
    
      console.log(formData, "fomrdata");
      axios.put(`${ATLAS_URI}/userUpdateProfile`, formData).then((response)=>{
        console.log(response)
        if(response.status == 200){
            alert(response.data)
            //navigate(`/profile/${routeParams.id}`);
        }
    
        
      }).catch(error=>{
        alert('user already registered')
        console.log(error.message)
      })
    };
    const formik=useFormik({
        initialValues:{
            ...formValues
        },
        validationSchema:updateLeadSchema,
        enableReinitialize: true,
        onSubmit,
    })
    
    console.log(formik)
    
    
    
    
    
    return  (
      <div className="container justify-content-center">
        <div className="row topProfile">
          <div className="col-md-2 profile-image">
            {true && <img src={formik.values.image} alt="profile" />}
          </div>
        </div>
        <Form className="my-form" onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
            disabled={!edit}
              value={formik.values.name}
              className={`form-control ${formik.errors.name && formik.touched.name ? 'input-error' : ''}`}
              onChange={formik.handleChange}
              name="name"
              type="text"
              placeholder="Enter your name"
            />
            {formik.errors.name && formik.touched.name && (
              <p className="error-message">{formik.errors.name}</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Address</Form.Label>
            <Form.Control
            disabled={!edit}
              value={formik.values.address}
              className={`form-control ${formik.errors.address && formik.touched.address ? 'input-error' : ''}`}
              onChange={formik.handleChange}
              name="address"
              type="text"
              placeholder="Enter your address"
            />
            {formik.errors.address && formik.touched.address && (
              <p className="error-message">{formik.errors.address}</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label>Password</Form.Label>
            <Form.Control
            disabled={!edit}
              className={`form-control ${formik.errors.password && formik.touched.password ? 'input-error' : ''}`}
              onChange={formik.handleChange}
              name="password"
              type="password"
              placeholder="Enter password"
            />
            {formik.errors.password && formik.touched.password && (
              <p className="error-message">{formik.errors.password}</p>
            )}
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Add Image</Form.Label>
            <Form.Control
            disabled={!edit}
              name="userImage"
              type="file"
              ref={profileImageInputRef}
              onChange={handleChange}
              accept="image/png, image/jpeg"
            />
          </Form.Group>
          <Button  onClick={()=>{setEdit(true)}} variant="primary" >
            Edit
          </Button>  
          <Button   disabled={!edit} className='ms-5' type="submit" variant="success">
            Submit
          </Button>
        </Form>
      </div>
    );
    
}

export default ProfileEdit