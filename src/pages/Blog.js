import React, { useEffect, useState } from 'react';
import CustomInput from '../components/CustomInput'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Step, Stepper } from 'react-form-stepper';
import { InboxOutlined } from '@ant-design/icons';
import { message, Select, Upload } from 'antd';
import Dropzone from 'react-dropzone'
import { deleteImage, uploadImage } from '../features/upload/uploadSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { createBlog, resetState } from '../features/blog/blogSlice';
import { toast } from 'react-toastify';
import { AiOutlineClose } from 'react-icons/ai';
import { getBlogCategories } from '../features/bcategory/bcategorySlice';

const Blog = () => {
  const [value, setValue]=  useState('');  
  const [category, setCategory] = useState('');
  // dispatch
  const dispatch = useDispatch();

  const navigate = useNavigate();


  const handleSubmit = () => { 
    dispatch(createBlog(formik.values));
    formik.resetForm();
    dispatch(resetState())
    setTimeout(() => {
      navigate('/admin/blog-list')
    }, 3000)
    alert(JSON.stringify(formik.values))
  }

    let {blogCategories} = useSelector((state) => state?.blogCategories);

    let {images} = useSelector((state) => state?.uploads);
    let {createdBlog, isSuccess, isError, isLoading} = useSelector((state) => state?.blogs);


    useEffect(() => {
      if (createdBlog && isSuccess) {
        toast.success("Product Added Successfully")
      }
      if (createdBlog && isError) {
        toast.error("Something went error")
      }
      if (isLoading) {
        
      }
    }, [isSuccess, isLoading, isError])

    blogCategories = blogCategories?.map((category) => {
      return {value: category.title, label: category.title}
    });
   
  let productSchema = yup.object().shape({
    title: yup.string().required('Title is Required'),
    description: yup.string(),
    category: yup.string().required('Blog Category is Required'),
  });
  

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      category: '',
      images: '',
    },
    
    onSubmit: handleSubmit,
    validationSchema: productSchema,
  });
  
  
  useEffect(() => {
    formik.setFieldValue('images', images?.length && images);
  }, [images]);

  useEffect(() => {
    dispatch(getBlogCategories());
  }, []);
  return (
    <div>
        <h4 className='font-bold text-[1.5rem] text-gray-900 my-6'>Add Blog</h4>
        <form className='' onSubmit={formik.handleSubmit}>
            
            
            <CustomInput type={'text'} className='min-w-[100%]' label='Enter Product Title' value={formik?.values?.title} handleChange={formik.handleChange} name='title' />
            <p className='text-[.9rem] mt-0 my-1 text-red-500 font-bold'>{formik.touched.title && formik.errors.title}</p>
            
            {/* <CustomInput label='Enter Blog Description' type='text' style={'my-[.5rem]'} /> */}
            <div className='flex flex-col my-3 '>
                <label className='font-bold text-[1rem] text-gray-900 my-3'>Product Desciption</label>
                <ReactQuill  theme="snow" value={formik?.values?.description} onChange={(val) => formik.setFieldValue('description', val)} name='description' />
            </div>
            <p className='font-bold text-[1rem] text-gray-900 my-[1rem]'>Blog Image</p>
            
            <Select className='w-[100%] my-[.5rem]'
              placeholder='Select Blog Category'
              onChange={(val) => formik.setFieldValue('category', val)}
              name='category'
              options={blogCategories}
            />
              
            
            <div className='flex items-center justify-center p-10 border border-gray-300 mt-5 rounded-lg text-center'>
              
              <Dropzone onDrop={acceptedFiles => dispatch(uploadImage(acceptedFiles))}>
                  {({getRootProps, getInputProps}) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                      </div>
                    </section>
                  )}
              </Dropzone>
          </div>

            <div>
              {images?.map((image, i) => {
                return (
                  <div className='relative w-[20rem] h-[15rem] '>
                    <img className='w-[100%] h-[100%] rounded-md mt-[1rem] select-none' src={image.url} />
                    <AiOutlineClose className='absolute top-5 right-5 font-bold text-white text-[2rem] cursor-pointer ' onClick={() => dispatch(deleteImage(image?.public_id))} /> 
                  </div>
                )
              })}
            </div>
            <button type='submit' className='flex items-center justify-center  bg-green-500 px-3 py-2 text-white text-[1.1rem] font-semibold rounded-lg mt-[.5rem] cursor-pointer active:bg-green-600' >Add Blog</button>
            
        </form>
    </div>
  )
}

export default Blog;

