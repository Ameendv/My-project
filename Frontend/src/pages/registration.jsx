import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { addLeadSchema } from '../validationSchema'
import { useNavigate } from 'react-router-dom';
import {useFormik} from 'formik'
import axios from "axios";
import { ATLAS_URI } from '../constants';
import Alert from 'react-bootstrap/Alert';








function Registration() {

    const initialValue = {
        name: "",
        address: "",
        password: "",
        confirm_password:""
        
      };

      const [formValues, setformValues] = useState(initialValue);
      const [file, setFile] = useState();
      const [images, setImages] = useState([]);
      const profileImageInputRef = React.useRef(null)

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
      if(!file){
        return alert('add an image')
      }

      for (const i in formik.values) {
        console.log(formik.values[i], "ini");
        formData.append(i, formik.values[i]);
      }
      if (file !== undefined) {
        formData.append("userImage", file);
      }

      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      console.log(formData, "fomrdata");
      axios.post(`${ATLAS_URI}/userRegistration`, formData).then((response)=>{
        console.log(response)
        if(response.status == 200){
            alert('User created succesfully')
            navigate('/login');
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
        validationSchema:addLeadSchema,
        onSubmit,
    })

    console.log(formik)

   

 

  return (
    <Form className="container justify-content-center" onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" >
        <Form.Label>Name</Form.Label>
        <Form.Control className={formik.errors.name && formik.touched.name?'form-control input-error':'form-control'} onChange={formik.handleChange} name='name'  type="text" placeholder="Enter your name" />
        {formik.errors.name && formik.touched.name && <p className="error-message">{formik.errors.name}</p>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Address</Form.Label>
        <Form.Control className={formik.errors.address && formik.touched.address?'form-control input-error':'form-control'} onChange={formik.handleChange} name='address' type="text" placeholder="Enter your address" />
              {formik.errors.address && formik.touched.address && <p className="error-message">{formik.errors.address}</p>}

      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>password</Form.Label>
        <Form.Control className={formik.errors.password && formik.touched.password?'form-control input-error':'form-control'} onChange={formik.handleChange} name='password' type="password" placeholder="Enter password" />
              {formik.errors.password && formik.touched.password && <p className="error-message">{formik.errors.password}</p>}

      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>confirm password</Form.Label>
        <Form.Control className={formik.errors.confirm_password && formik.touched.confirm_password?'form-control input-error':'form-control'} onChange={formik.handleChange} name='confirm_password' type="password" placeholder="confirm password" />
              {formik.errors.confirm_password && formik.touched.confirm_password && <p className="error-message">{formik.errors.confirm_password}</p>}

      </Form.Group>{" "}
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Add image</Form.Label>
        <Form.Control name ="userImage" type="file" ref={profileImageInputRef} onChange={handleChange} accept="image/png, image/jpeg" />
      </Form.Group>
      <Button type='submit' variant="success" >Success</Button>{' '}

    </Form>
  );
}

export default Registration