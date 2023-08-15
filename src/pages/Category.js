 import React, { useEffect, useState } from 'react';
import CustomInput from '../components/CustomInput'
import { useFormik } from 'formik';
import * as yup from 'yup';
import Dropzone from 'react-dropzone'
// import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteImage, uploadImage } from '../features/upload/uploadSlice';
import {AiOutlineClose} from 'react-icons/ai'
import { toast } from 'react-toastify';
import { createBrand } from '../features/brand/brandSlice';
import { createCategory, getCategories, getCategory, resetState, updateCategory } from '../features/pcategory/pcategorySlice';
import Spinner from './Spinner';

const Category = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const {id} = params;

  let {createdCategory, updatedCategory, deletedCategory, currentCategory, isSuccess, isError, isLoading} = useSelector((state) => state?.categories);

  useEffect(() => {
    
    dispatch(getCategory(id));
  }, [updatedCategory, deletedCategory]);


  const handleSubmit = () => { 
    if (id !== undefined) {
      const data = {id, category: formik?.values};

      dispatch(updateCategory(data));
      formik.resetForm();
      dispatch(resetState())
      setTimeout(() => {
        navigate('/admin/list-category')
      }, 1000)
    } else {
      dispatch(createCategory(formik.values));
      formik.resetForm();
      dispatch(resetState())
      setTimeout(() => {
        navigate('/admin/list-category')
      }, 1000)  
    }
    console.log('hello')
  }

    

    useEffect(() => {
      if (createdCategory?.title && isSuccess) {
        toast.success("Category Added Successfully");
      }
      if (createdCategory?.title && isError) {
        toast.error("Something went error");
      }
      if (isSuccess && updatedCategory?.title) {
        toast.success("Category Updated Successfully")
      }

      if (isError && updatedCategory?.title) {
        toast.error("Something went error")
      }
      if (isLoading) {
      }
    }, [isSuccess, isLoading, isError]);

    let categorySchema = yup.object().shape({
      title: yup.string().required('Title is Required'),
    });
  
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: currentCategory?.title || "",
    },

    onSubmit: handleSubmit,
    validationSchema: categorySchema,
  });

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div>
      <h3 className='font-bold text-[1.5rem] text-gray-900 my-6'>{id ? "Edit" :  "Add"} Category</h3>
      <div className='w-[100%] '>
        <form className='w-[100%] ' onSubmit={formik.handleSubmit}>
          <CustomInput type={'text'} classNamew='min-w-[100%] mb-5' label='Enter Category Title' name='title' value={formik.values.title} handleChange={formik.handleChange}  />
          <p className='text-[.9rem] mt-0 my-1 text-red-500 font-bold'>{formik.touched.title && formik.errors.title}</p>
          <button type='submit' className='flex items-center justify-center  bg-green-500 px-3 py-2 text-white text-[1.1rem] font-semibold rounded-lg mt-[.5rem] cursor-pointer active:bg-green-600'  >{id ? "Edit" :  "Add"} Category</button>

        </form>
      </div>

    </div>
  )
}


export default Category;