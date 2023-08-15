import React, { useEffect, useState } from 'react';
import CustomInput from '../components/CustomInput'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createBrand, getABrand, getBrands, resetState, updateBrand,  } from '../features/brand/brandSlice';
import Spinner from './Spinner';

const Brand = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const {id} = params;
  
  const {currentBrand, updatedBrand} = useSelector((state) => state?.brands);

  // dispatch(getABrand(id));
  console.log(currentBrand, 'rrrrrrrrrrrr');
 
  useEffect(() => {
    
    if (id) {
      
      dispatch(getABrand(id));
    
    }

  }, [id]) ;

  // useEffect(() => {
  //   formik.setFieldValue('title', currentBrand?.title)
  // }, [id, params])

  const handleSubmit = () => { 
    if (id !== undefined) {

      dispatch(updateBrand({id: id, brand: formik.values}));
      dispatch(resetState());
      formik.resetForm();
      setTimeout(() => {
        navigate('/admin/list-brand')
      }, 3000);

    } else {
      dispatch(createBrand(formik.values));
      dispatch(resetState());
      formik.resetForm();
      setTimeout(() => {
        navigate('/admin/list-brand')
      }, 3000)
    }
  }

    let {createdBrand, isSuccess, isError, isLoading} = useSelector((state) => state?.brands);

    useEffect(() => {
      if (isSuccess && createdBrand?.title) {
        toast.success("Brand Added Successfully")
      }
      if (isError && createdBrand ) {
        toast.error("Something went error")
      }

      if (isSuccess && updatedBrand) {
        toast.success("Brand Updated Successfully")
      }

      if (isError && updatedBrand) {
        toast.error("Something went error")
      }


      if (isLoading) {
      }
    }, [createdBrand]);

    let brandSchema = yup.object().shape({
      title: yup.string().required('Title is Required'),
    });
  
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: currentBrand?.title || "",

    },
    
    onSubmit: (values) => handleSubmit(),
    validationSchema: brandSchema,
  });

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div>
      <h3 className='font-bold text-[1.5rem] text-gray-900 my-6'>{id ? "Edit Brand" : "Add Brand"}</h3>
      <div className='w-[100%] '>
        <form className='w-[100%] ' onSubmit={formik.handleSubmit}>
          {/* <CustomInput type={'text'} className='min-w-[100%] mb-5' label='Enter Brand Title' name='title' value={formik.values.title} onChange={formik.handleChange} /> */}
          <CustomInput type={'text'} className ='min-w-[100%]' label='Enter Product Quantity' handleChange={formik.handleChange} value={formik?.values?.title} name='title' />
          <p className='text-[.9rem] mt-0 my-1 text-red-500 font-bold'>{formik.touched.title && formik.errors.title}</p>

          <button type='submit' className='flex items-center justify-center  bg-green-500 px-3 py-2 text-white text-[1.1rem] font-semibold rounded-lg mt-[.5rem] cursor-pointer active:bg-green-600'  >{id ? "Edit Brand" : "Add Brand"}</button>
    
        </form>
      </div>

    </div>
  )
}

export default Brand