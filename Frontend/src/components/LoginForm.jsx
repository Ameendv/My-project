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
    
      
    
      for (const i in formik.values) {
        console.log(formik.values[i], "ini");
        formData.append(i, formik.values[i]);
      }
     
      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
    
      console.log(formData, "fomrdata");
      axios.post(`${ATLAS_URI}/userLogin`, formik.values).then((response)=>{
        console.log(response)
        if(response.status == 200){
            alert('User Logged in succesfully')
            //navigate('/login');
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
    
    
    
    
    
    return (
    <Form className="container justify-content-center" onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" >
        <Form.Label>Name</Form.Label>
        <Form.Control className={formik.errors.name && formik.touched.name?'form-control input-error':'form-control'} onChange={formik.handleChange} name='name'  type="text" placeholder="Enter your name" />
        {formik.errors.name && formik.touched.name && <p className="error-message">{formik.errors.name}</p>}
      </Form.Group>
     
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>password</Form.Label>
        <Form.Control className={formik.errors.password && formik.touched.password?'form-control input-error':'form-control'} onChange={formik.handleChange} name='password' type="password" placeholder="Enter password" />
              {formik.errors.password && formik.touched.password && <p className="error-message">{formik.errors.password}</p>}
    
      </Form.Group>
      
      <Button type='submit' variant="success" >Success</Button>{' '}
    
    </Form>
    );
    
}

export default LoginForm