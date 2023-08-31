import React,{ useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { loginSchema } from '../validationSchema'
import { useNavigate } from 'react-router-dom';
import {useFormik} from 'formik'
import axios from "axios";
import { ATLAS_URI } from '../constants';

function LoginForm() {
  
  

    const initialValue = {
        name: "",
        
        password: "",
        
        
      };
    
      const [formValues, setformValues] = useState(initialValue);

    
      const navigate = useNavigate()
    
    
    
    
      const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setformValues({ ...formValues, [name]: value });
      };
    
    
   
    const onSubmit = () => {
      console.log(formValues, "formvalues");
      const formData = new FormData();
    
      
    
   
        
      axios.post(`${ATLAS_URI}/userLogin`, formik.values).then((response)=>{
        console.log(response)
        if(response.status == 200){
            console.log(response)
            alert('User Logged in succesfully')
            navigate(`/profile/${response.data?.userExist?._id}`);
        }
    
        
      }).catch(error=>{
        alert('Incorrect password or username')
        console.log(error.message)
      })
    };
    const formik=useFormik({
        initialValues:{
            ...formValues
        },
        validationSchema:loginSchema,
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
  
          <Button type="submit" variant="success">
            Submit
          </Button>
        </Form>
      </div>
    );
    
}

export default LoginForm