import React,{ useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { addLeadSchema } from '../validationSchema'
import { useNavigate } from 'react-router-dom';
import {useFormik} from 'formik'
import axios from "axios";
import { ATLAS_URI } from '../constants';
import Alert from 'react-bootstrap/Alert';

function RegistrationForm() {
  

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





return  (
  <div className="container justify-content-center">
    <Form className="my-form" onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Name</Form.Label>
        <Form.Control
          className={`form-control ${
            formik.errors.name && formik.touched.name ? 'input-error' : ''
          }`}
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
          className={`form-control ${
            formik.errors.address && formik.touched.address ? 'input-error' : ''
          }`}
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
          className={`form-control ${
            formik.errors.password && formik.touched.password ? 'input-error' : ''
          }`}
          onChange={formik.handleChange}
          name="password"
          type="password"
          placeholder="Enter password"
        />
        {formik.errors.password && formik.touched.password && (
          <p className="error-message">{formik.errors.password}</p>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          className={`form-control ${
            formik.errors.confirm_password && formik.touched.confirm_password ? 'input-error' : ''
          }`}
          onChange={formik.handleChange}
          name="confirm_password"
          type="password"
          placeholder="Confirm password"
        />
        {formik.errors.confirm_password && formik.touched.confirm_password && (
          <p className="error-message">{formik.errors.confirm_password}</p>
        )}
      </Form.Group>

      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Add Image</Form.Label>
        <Form.Control
          name="userImage"
          type="file"
          ref={profileImageInputRef}
          onChange={handleChange}
          accept="image/png, image/jpeg"
        />
      </Form.Group>

      <Button type="submit" variant="success">
        Submit
      </Button>
    </Form>
  </div>
);
}

export default RegistrationForm