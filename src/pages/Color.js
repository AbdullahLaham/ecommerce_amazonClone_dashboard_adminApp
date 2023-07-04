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
import { createCategory } from '../features/pcategory/pcategorySlice';
import { createColor, getColor, resetState, updateColor } from '../features/pcolor/pcolorSlice';

const Color = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // color ID
  const {id} = useParams();

  const handleSubmit = () => { 
    if (id !== undefined) {
      dispatch(updateColor({id, color: formik.values}));
      formik.resetForm();
      dispatch(resetState())
      setTimeout(() => {
        navigate('/admin/list-color');
      }, 3000)
    } else {
      dispatch(createColor(formik.values));
      formik.resetForm();
      dispatch(resetState())
      setTimeout(() => {
        navigate('/admin/list-color');
      }, 3000)
    }
  }

    let {createdColor ,deletedColor, updatedColor, currentColor, isSuccess, isError, isLoading} = useSelector((state) => state?.colors);

    useEffect(() => {
      if (isSuccess && createdColor) {
        toast.success("Color Added Successfully");
      }
      if (isError && createdColor) {
        toast.error("Something went error");
      }

      if (isSuccess && updateColor?.title) {
        toast.success("Color Updated Successfully");
      }
      if (isError && updateColor?.title) {
        toast.error("Something went error");
      }
      
      if (isLoading) {
      }
    }, [isSuccess, isLoading, isError, createColor]);

    useEffect(() => {
      dispatch(getColor(id));
    }, [id])
    let colorSchema = yup.object().shape({
      title: yup.string().required('Title is Required'),
    });
  
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: currentColor?.title || '',
    },

    onSubmit: handleSubmit,
    validationSchema: colorSchema,
  });
  return (
    <div>
        <h3 className='font-bold text-[1.5rem] text-gray-900 my-6'>{id ? "Edit" : "Add"} Color</h3>
        <div className='w-[100%] '>
          <form className='w-[100%] ' onSubmit={formik.handleSubmit}>
            <input type={'color'} className =' mb-2 py-1 px-2 rounded-md  text-gray-600 w-[100%] ' placeholder='Enter Product Color' onChange={formik.handleChange} value={formik?.values?.title} name='title' />
            <p className='text-[.9rem] mt-0 my-1 text-red-500 font-bold'>{formik.touched.title && formik.errors.title}</p>
            <button type='submit' className='flex items-center justify-center  bg-green-500 px-3 py-2 text-white text-[1.1rem] font-semibold rounded-lg mt-[.5rem] cursor-pointer active:bg-green-600' >{id ? "Edit " : "Add "}Color</button>

          </form>
        </div>

    </div>
  )
}

export default Color