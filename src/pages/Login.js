import React, { useEffect, useState } from 'react'
import CustomInput from '../components/CustomInput'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {login} from '../features/auth/authSlice'
import { base_url } from '../utils/base_url';
import axios from 'axios';
const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (values) => { 
    dispatch(login(values));
    console.log(values);
  }
  
  let userSchema = yup.object().shape({
    email: yup.string().email('Email Should be Valid').required('Email is Required'),
    password: yup.string().required('Password is Required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    
    onSubmit: (values) => handleSubmit(values),
    validationSchema: userSchema,
  });
  
  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)
  
  useEffect(() => {
    console.log(user, 'dddddddd');
    if (user?.email || isSuccess) {
      navigate('admin')
    }
  }, [user, isLoading, isError, isSuccess, message])

  return (
    <div className='py-5 h-[100vh] w-[100%] flex items-center justify-center rounded-lg' style={{background: "#ffd333"}}>
        <form className='bg-white w-[30%] p-5 flex flex-col items-center gap-2' onSubmit={formik.handleSubmit}>
            <h3 className='text-center font-bold text-gray-700 text-[1.7rem] '>Login</h3>
            <p className='text-center font-semibold text-gray-500 text-[1rem] '>Login to Your Account to continue...</p>
            <p></p>
            <CustomInput label='Email Address' id='name' name='email' type={'email'}  handleChange={formik.handleChange} value={formik.values.email} />
            <div className='error'>
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
            </div>
            <CustomInput label='Password' id='password' name='password' type={'password'} handleChange={formik.handleChange} value={formik.values.password} />
            <div className='error'>
              {formik.touched.password && formik.errors.password ? (
                  <div>{formik.errors.password}</div>
                ) : null}
            </div>
            <div className='w-[100%] flex justify-end'>
                <Link to='/forgot-password' className='text-end text-blue-600'>Forgot Password</Link>
            </div>
            {/* <CustomInput label='Email Address' />
            <CustomInput label='Email Address' /> */}
            <button className='border-0 px-3 py-2 text-white font-bold w-[100%] bg-gray-800 rounded-lg cursor-pointer ' type='submit' >Login</button>
        </form>
        
    </div>
  )
}

export default Login