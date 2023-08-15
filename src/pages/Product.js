import React, { useEffect, useState } from 'react';
import CustomInput from '../components/CustomInput'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Step, Stepper } from 'react-form-stepper';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Dropzone from 'react-dropzone'
// import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getColors } from '../features/pcolor/pcolorSlice';
import { getCategories } from '../features/pcategory/pcategorySlice';
import { getBrands } from '../features/brand/brandSlice';
import {Select} from 'antd';
import "react-widgets/styles.css";
import { deleteImage, uploadImage } from '../features/upload/uploadSlice';
import {AiOutlineClose} from 'react-icons/ai'
import { createProduct, resetState } from '../features/product/productSlice';
import { toast } from 'react-toastify';
import Spinner from './Spinner';

const Product = () => {

  const { Dragger } = Upload;
    const [value, setValue]=  useState('');  
    const [category, setCategory] = useState('');
    // dispatch
    const dispatch = useDispatch();

    const navigate = useNavigate();


    const handleSubmit = () => { 
      dispatch(createProduct(formik.values));
      formik.resetForm();
      dispatch(resetState())
      setTimeout(() => {
        navigate('/admin/list-product')
      }, 3000)
      // alert(JSON.stringify(formik.values), 'ddddd')
    }
  
      let {categories} = useSelector((state) => state?.categories);
      let {brands} = useSelector((state) => state?.brands);
      let {colors} = useSelector((state) => state?.colors);
      let {images} = useSelector((state) => state?.uploads);
      let {createdProduct, isSuccess, isError, isLoading} = useSelector((state) => state?.products)

      useEffect(() => {
        if (createdProduct && isSuccess) {
          toast.success("Product Added Successfully")
        }
        if (createdProduct && isError) {
          toast.error("Something went error")
        }
        if (isLoading) {
          
        }
      }, [isSuccess, isLoading, isError])

      categories = categories?.map((category) => {
        return {value: category.title, label: category.title}
      });
      brands = brands?.map((category) => {
        return {value: category.title, label: category.title}
      });
      colors = colors?.map((color, i) => {
        return {label: color?.title, value: color?._id}
      });

      const tags = [
        {label: "Featured", value: "Featured"},
        {label: "Popular", value: "Popular"},
        {label: "Special", value: "Special"}
      ]

      const [product, setProduct] = useState({
        title: '',
        description: '',
        price: '',
        category: categories?.length ? categories[0]['value'] : '',
        brand: brands?.length ? brands[0]['value'] : '',
        color: [],
        quantity: '',
        images: [],
    });

    let productSchema = yup.object().shape({
      title: yup.string().required('Title is Required'),
      describtion: yup.string(),
      price: yup.number().required('Price is Required'),
      category: yup.string().required('Category is Required'),
      brand: yup.string().required('Brand is Required'),
      tag: yup.string().required('Tag is Required'),
      quantity: yup.number().required('Quantity is Required'),
      color: yup.array().min(1, "Pick at least on color").required('Color is Required'),

    });
    
    const formik = useFormik({
      initialValues: {
        title: '',
        description: '',
        price: '',
        category: '',
        brand: '',
        tag: '',
        color: [],
        quantity: '',
        images: '',
      },
      
      onSubmit: (values) => handleSubmit(),
      validationSchema: productSchema,
    });
    
    
    useEffect(() => {
      dispatch(getColors());
      dispatch(getCategories());
      dispatch(getBrands());
    }, []);

    useEffect(() => {
      formik.setFieldValue('images', images?.length && images);
    }, [images]);





    if (isLoading) {
      return <Spinner />
    }

  return (
    <div>
      <h3 className='font-bold text-[1.5rem] text-gray-900 my-6'>Add Product</h3>
      <div className='w-[100%] '>
        <form className='w-[100%] ' onSubmit={formik?.handleSubmit} >
            <CustomInput type={'text'} className='min-w-[100%]' label='Enter Product Title' value={formik?.values?.title} handleChange={formik.handleChange} name='title' />
            <p className='text-[.9rem] mt-0 my-1 text-red-500 font-bold'>{formik.touched.title && formik.errors.title}</p>
            
            <div className='flex flex-col my-3 '>
                <label className='font-bold text-[1rem] text-gray-900 my-3'>Product Desciption</label>
                <ReactQuill  theme="snow" value={formik?.values?.description} onChange={(val) => formik.setFieldValue('description', val)} name='description' />
            </div>
            <p className='text-[.9rem] mt-0 my-1 text-red-500 font-bold'>{formik.touched.description && formik.errors.description}</p>
            
            <CustomInput type={'number'} className='min-w-[100%] mb-5' label='Enter Product Price' handleChange={formik.handleChange} value={formik?.values?.price} name='price' />
            <p className='text-[.9rem] mt-0 my-1 text-red-500 font-bold'>{formik.touched.price && formik.errors.price}</p>
            

            <Select className='w-[100%] my-[.5rem]'
              placeholder='Select Category'
              onChange={(val) => formik.setFieldValue('category', val)}
              name='category'
              options={categories}
            />
              
            <p className='text-[.9rem] mt-0 my-1 text-red-500 font-bold'>{formik.touched.category && formik.errors.category}</p>
            {/* <Multiselect
              dataKey="id"
              textField="color"
              defaultValue={[1]}
              data={colors}
              onSelect={(e) => setProduct({...product, colors: e})}
              onChange={(e) => setProduct({...product, colors: e})}
             /> */}

            <Select
              mode='multiple' allowClear className='w-[100%]' placeholder='Select Colors' onChange={(e) => formik.setFieldValue('color', e)} options={colors}
             />
             <p className='text-[.9rem] mt-0 my-1 text-red-500 font-bold'>{formik.touched.color && formik.errors.color}</p>
            
             <Select className='w-[100%] my-[.5rem]'
              placeholder='Select Brands'
              onChange={(val) => formik.setFieldValue('brand', val)}
              name='brand'
              options={brands}
            />

            <p className='text-[.9rem] mt-0 my-1 text-red-500 font-bold'>{formik.touched.tag && formik.errors.tag}</p>

            <Select className='w-[100%] my-[.5rem]'
              placeholder='Select Tags'
              onChange={(val) => formik.setFieldValue('tag', val)}
              name='tag'
              options={tags}
            />

          <p className='text-[.9rem] mt-0 my-1 text-red-500 font-bold'>{formik.touched.brand && formik.errors.brand}</p>
          <CustomInput type={'number'} className='min-w-[100%]' label='Enter Product Quantity' handleChange={formik.handleChange} value={formik?.values?.quantity} name='quantity' />
          <p className='text-[.9rem] mt-0 my-1 text-red-500 font-bold'>{formik.touched.quantity && formik.errors.quantity}</p>
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
             <button className='flex items-center justify-center  bg-green-500 px-3 py-2 text-white text-[1.1rem] font-semibold rounded-lg mt-[.5rem] cursor-pointer active:bg-green-600' type='submit'>Add Product</button>
        </form>
      </div>

    </div>
  )
}

export default Product
