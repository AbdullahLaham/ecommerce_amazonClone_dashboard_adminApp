import React, { useEffect, useState } from 'react';
import CustomInput from '../components/CustomInput'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createBrand, resetState } from '../features/brand/brandSlice';
import { createCoupon, getCoupon, updateCoupon } from '../features/coupon/couponSlice';
import Spinner from './Spinner';

const Coupon = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // coupon ID
  const {id} = useParams();
    let {createdCoupon, updatedCoupon, deletedCoupon, currentCoupon, isSuccess, isError, isLoading} = useSelector((state) => state?.coupons);

    console.log(currentCoupon, 'fffffffffff')
  const handleSubmit = () => { 
    // alert(JSON.stringify(formik.values))
    if (id !== undefined) {
      const data = {coupon: formik.values, id}
      dispatch(updateCoupon(data));
      dispatch(resetState())
      formik.resetForm();
      setTimeout(() => {
        navigate('/admin/list-coupon')
      }, 3000)
      console.log('hello')
    } else {
      dispatch(createCoupon(formik.values));
      dispatch(resetState())
      formik.resetForm();
      setTimeout(() => {
        navigate('/admin/list-coupon')
      }, 3000)
      console.log('hello')
    }
  }


    useEffect(() => {
      if (isSuccess && createCoupon?.name) {
        toast.success("Coupon Added Successfully")
      }
      if (isError && createCoupon?.name) {
        toast.error("Something went error")
      }
      if (isSuccess && updatedCoupon?.name) {
        toast.success("Coupon Updated Successfully")
      }
      if (isError && updatedCoupon?.name) {
        toast.error("Something went error")
      }
      if (isLoading) {
      }
    }, [isSuccess, isLoading, isError]);

    useEffect(() => {
    
      dispatch(getCoupon(id));
    }, [updatedCoupon, deletedCoupon]);
  

    

    let couponSchema = yup.object().shape({
      name: yup.string().required('Title is Required'),
      expiry: yup.string().required('Expiry is Required'),
      discount: yup.string().required('Title is Discount'),
    });
  

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: currentCoupon?.name || '',
      expiry: currentCoupon?.expiry && new Date(currentCoupon?.expiry).toISOString().slice(0,10) || '',
      discount: currentCoupon?.discount || '',
    },
    
    onSubmit: (values) => handleSubmit(),
    validationSchema: couponSchema,
  });

  if (isLoading) {
    return <Spinner />
  }
  return (
    <div>
      <h3 className='font-bold text-[1.5rem] text-gray-900 my-6'>{id ? "Edit" :  "Add"} Coupon</h3>
      <div className='w-[100%] '>
        <form className='w-[100%] ' onSubmit={formik.handleSubmit}>
          {/* <CustomInput type={'text'} className='min-w-[100%] mb-5' label='Enter Brand Title' name='title' value={formik.values.title} onChange={formik.handleChange} /> */}
          <CustomInput type={'text'} className ='min-w-[100%]' label='Enter A Coupon Name' handleChange={formik.handleChange} value={formik?.values?.name} name='name' />
          <p className='text-[.9rem] mt-0 my-1 text-red-500 font-bold'>{formik.touched.title && formik.errors.title}</p>

          <CustomInput type={'date'} className ='min-w-[100%]' label='Enter A Coupon Expiry Date' handleChange={formik.handleChange} value={formik?.values?.expiry} name='expiry' />
          <p className='text-[.9rem] mt-0 my-1 text-red-500 font-bold'>{formik.touched.title && formik.errors.title}</p>

          <CustomInput type={'number'} className ='min-w-[100%]' label='Enter A Coupon Discount' handleChange={formik.handleChange} value={formik?.values?.discount} name='discount' />
          <p className='text-[.9rem] mt-0 my-1 text-red-500 font-bold'>{formik.touched.title && formik.errors.title}</p>

          <button type='submit' className='flex items-center justify-center  bg-green-500 px-3 py-2 text-white text-[1.1rem] font-semibold rounded-lg mt-[.5rem] cursor-pointer active:bg-green-600'  >{id ? "Edit" :  "Add"} Coupon</button>
    
        </form>
      </div>

    </div>
  )
}

export default Coupon
