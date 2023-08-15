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
import { createBlogCategory, getBlogCategory, resetState, updateBlogCategory } from '../features/bcategory/bcategorySlice';
import Spinner from './Spinner';


const BlogCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id} = useParams();

  let {createdBlogCategory,updatedBlogCategory,deletedBlogCategory, currentBlogCategory, isSuccess, isError, isLoading} = useSelector((state) => state?.blogCategories);


  
  useEffect(() => {
    
    dispatch(getBlogCategory(id));
  }, [updatedBlogCategory, deletedBlogCategory]);



  const handleSubmit = () => { 
    if (id !== undefined) {
      const data = {id, bcategory: formik.values }
      dispatch(updateBlogCategory(data));
      formik.resetForm();
      dispatch(resetState())
      setTimeout(() => {
        navigate('/admin/blog-category-list')
      }, 3000)
      console.log('hello')
    } else {
      dispatch(createBlogCategory(formik.values));
      formik.resetForm();
      dispatch(resetState());
      setTimeout(() => {
        navigate('/admin/blog-category-list')
      }, 3000)
      console.log('hello')
    }
  }


    useEffect(() => {
      if (isSuccess && createdBlogCategory) {
        toast.success("Blog Category Added Successfully");
      }
      if (isError && createdBlogCategory) {
        toast.error("Something went error");
      }
      if (isSuccess && updatedBlogCategory) {
        toast.success("Blog Category Updated Successfully");
      }
      if (isError && updatedBlogCategory) {
        toast.error("Something went error");
      }
      if (isLoading) {
      }
    }, [isSuccess, isLoading, isError, createBlogCategory]);

    let blogCategorySchema = yup.object().shape({
      title: yup.string().required('Title is Required'),
    });
  
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title:  currentBlogCategory?.title || '',
    },

    onSubmit: handleSubmit,
    validationSchema: blogCategorySchema,
  });
  if (isLoading) {
    return <Spinner />
  }
  return (
    <div>
        <h3 className='font-bold text-[1.5rem] text-gray-900 my-6'>{id ? "Edit" :  "Add"} Blog Category</h3>
        <div className='w-[100%] '>
          <form className='w-[100%] ' onSubmit={formik.handleSubmit}>
          <CustomInput type={'text'} classNamew='min-w-[100%] mb-5' label='Enter Blog Category Title' name='title' value={formik.values.title} handleChange={formik.handleChange}  />
            <button type='submit' className='flex items-center justify-center  bg-green-500 px-3 py-2 text-white text-[1.1rem] font-semibold rounded-lg mt-[.5rem] cursor-pointer active:bg-green-600' >{id ? "Edit" :  "Add"} Blog Category</button>

          </form>
        </div>

    </div>
  )
}

export default BlogCategory;