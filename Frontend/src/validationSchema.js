import * as yup from "yup";

const nameRegex = /^[a-zA-Z][a-zA-Z. ]*$/;



export const addLeadSchema = yup.object().shape({
  name: yup
    .string()
    .required("Enter the name")
    .matches(nameRegex, "Enter a valid name")
    .min(3, "Name should be minimum 3 letters")
    .max(50, "Name cannot be more than 50"),
  address: yup
    .string()
    .required("Enter the address")

    .min(3, "Name should be minimum 3 letters")
    .max(50, "Name cannot be more than 50"),
  password: yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
    confirm_password: yup.string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const loginSchema = yup.object().shape({
  name: yup
    .string()
    .required("Enter the name")
    .matches(nameRegex, "Enter a valid name")
    .min(3, "Name should be minimum 3 letters")
    .max(50, "Name cannot be more than 50"),
 
  password: yup.string()
    .min(8, "Password must be at least 8 characters long")
    
   
});

export const updateLeadSchema = yup.object().shape({
  name: yup
    .string()
    
    .matches(nameRegex, "Enter a valid name")
    .min(3, "Name should be minimum 3 letters")
    .max(50, "Name cannot be more than 50"),
  address: yup
    .string()
    
    .min(3, "Name should be minimum 3 letters")
    .max(50, "Name cannot be more than 50"),
  password: yup.string()
    .min(8, "Password must be at least 8 characters long")
    ,
    confirm_password: yup.string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    
});