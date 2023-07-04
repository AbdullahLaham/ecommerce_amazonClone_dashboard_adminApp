import React, { useEffect, useState } from 'react';
import CustomInput from '../components/CustomInput'
import { useFormik } from 'formik';
import * as yup from 'yup';
import Dropzone from 'react-dropzone'
// import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteImage, uploadImage } from '../features/upload/uploadSlice';
import {AiOutlineClose} from 'react-icons/ai'
import { toast } from 'react-toastify';
import { createBlogCategory, resetState } from '../features/bcategory/bcategorySlice';


const BlogCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleSubmit = () => { 
    dispatch(createBlogCategory(formik.values));
    formik.resetForm();
    dispatch(resetState())
    setTimeout(() => {
      navigate('/admin/blog-category-list')
    }, 3000)
    console.log('hello')
  }

    let {createdBlogCategory, isSuccess, isError, isLoading} = useSelector((state) => state?.blogCategories);

    useEffect(() => {
      if (createdBlogCategory && isSuccess) {
        toast.success("Blog Category Added Successfully");
      }
      if (createdBlogCategory && isError) {
        toast.error("Something went error");
      }
      if (isLoading) {
      }
    }, [isSuccess, isLoading, isError, createBlogCategory]);

    let blogCategorySchema = yup.object().shape({
      title: yup.string().required('Title is Required'),
    });
  
  const formik = useFormik({
    initialValues: {
      title: '',
    },

    onSubmit: handleSubmit,
    validationSchema: blogCategorySchema,
  });
  return (
    <div>
        <h3 className='font-bold text-[1.5rem] text-gray-900 my-6'>Add Blog Category</h3>
        <div className='w-[100%] '>
          <form className='w-[100%] ' onSubmit={formik.handleSubmit}>
          <CustomInput type={'text'} classNamew='min-w-[100%] mb-5' label='Enter Blog Category Title' name='title' value={formik.values.title} handleChange={formik.handleChange}  />
            <button type='submit' className='flex items-center justify-center  bg-green-500 px-3 py-2 text-white text-[1.1rem] font-semibold rounded-lg mt-[.5rem] cursor-pointer active:bg-green-600' >Add Blog Category</button>

          </form>
        </div>

    </div>
  )
}

export default BlogCategory;