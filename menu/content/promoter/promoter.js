import React from "react";
import {Container,Button,makeStyles} from '@material-ui/core'
import {Formik,Form,Field}from 'formik'
import * as Yup from 'yup'
import { Grid} from "@mui/material";
import { TextField } from "formik-material-ui"

const useStyle=makeStyles(()=>({
    padding:{
        padding:40
    },
    bgcolor:{
        background:'balck'
    }
}))

const lowercaseRegEx = /(?=.*[a-z])/
const uppercaseRegEx = /(?=.*[A-Z])/
const numericRegEx = /(?=.*[0-9])/
const lengthRegEx = /(?=.{6,})/

let validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    age: Yup.number().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().matches(lowercaseRegEx,'must lowercse letters').matches(lengthRegEx,'must have 6 charecters').required("Required")
})

// let validationSchema = Yup.object().shape({
//     name: Yup.string().required('required'),
//     age: Yup.string().required('required'),
//     email: Yup.string().email().required('required'),
//     password: Yup.string().matches(lowercaseRegEx,'hai')
// })
export default function Promoter(){
    debugger
    const classes=useStyle()
    const initialval={
        name:'',
        age:'',
        email:'',
        password:''
    }

    const handleSubmit=(values,formikHelpers)=>{
        debugger;
        console.log('values')
        console.log(values)
        formikHelpers.resetForm();
    }
    return(
        <Container className={classes.padding}>
            <Formik
              initialValues={initialval}
              validationSchema={validationSchema }
              enableReinitialize={true}
              onSubmit={handleSubmit}
              >
                { ({dirty,isValid, errors, values, handleChange, touched,resetForm})=>{
                    return(
                          <Form>
                              <Grid container xs={12} md={12} className={classes.bgcolor}>
                          <Grid item md={3} xs={12}>
                          <Field 
                                name='name' 
                                label='asdffasf' 
                                variant='outlined' 
                                component={TextField} 
                                onChange={handleChange}/>
                          </Grid>
                          <Grid item md={3} xs={12}>
                          <Field 
                                name='age' 
                                label='Age'
                                type='number' 
                                variant='outlined' 
                                component={TextField}/>
                          </Grid>
                          <Grid item md={3} xs={12}>
                          <Field 
                                name='email' 
                                label='Email' 
                                variant='outlined' 
                                component={TextField}
                                />
                          </Grid>
                          <Grid item md={3} xs={12}>
                          <Field 
                                name='password' 
                                label='Password' 
                                variant='outlined' 
                                component={TextField}/>
                          </Grid>
                          </Grid>
                              <Button variant='outlined' type='submit'>Login</Button>
                              <Button variant='outlined' onClick={resetForm}>Clear</Button>
                              
                          </Form>
                    )}
                }
            </Formik>

       </Container>
    )
}