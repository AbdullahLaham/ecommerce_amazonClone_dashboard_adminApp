import React, { useEffect, useState } from 'react';
import CustomInput from '../components/CustomInput'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Step, Stepper } from 'react-form-stepper';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';



const Blog = () => {
    const { Dragger } = Upload;
    const [value, setValue]=  useState('');  
    useEffect(() => {
        console.log(value)
    }, [value]);
    const props = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
          const { status } = info.file;
          if (status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
          } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
        onDrop(e) {
          console.log('Dropped files', e.dataTransfer.files);
        },
      };
  return (
    <div>
        <h4 className='font-bold text-[1.5rem] text-gray-900 my-6'>Add Blog</h4>
        <div className=''>
            <p className='font-bold text-[1rem] text-gray-900 my-[1rem]'>Blog Image</p>
            <Dragger {...props} className='mb-10'>
                <p className="ant-upload-drag-icon">
                <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                banned files.
                </p>
            </Dragger>
            <CustomInput label='Enter Blog Title' type='text' style={'my-[.5rem]'} />
            <CustomInput label='Enter Blog Description' type='text' style={'my-[.5rem]'} />
            <div className='flex flex-col '>
                <label className='font-bold text-[1rem] text-gray-900 my-3'>Blog Desciption</label>
                <ReactQuill  theme="snow" value={value} onChange={setValue} />
            </div>
            <button className='flex items-center justify-center  bg-green-500 px-3 py-2 text-white text-[1.1rem] font-semibold rounded-lg mt-[.5rem] cursor-pointer active:bg-green-600' >Add Blog</button>
            
        </div>
    </div>
  )
}

export default Blog;




// <Stepper
//                 steps={[{ label: 'Blog Details' }, { label: 'Upload Images' }, { label: 'Finish' }]}
//                 activeStep={2}
//             >
//                 <Step label='Blog Details' >
//                     <CustomInput label='Enter Blog Title' type='text' style={'mb-[.5rem]'} />
//                     <CustomInput label='Enter Blog Description' type='text' style={'mb-[.5rem]'} />
//                     <div className='flex flex-col '>
//                         <label className='font-bold text-[1rem] text-gray-900 my-3'>Blog Desciption</label>
//                         <ReactQuill  theme="snow" value={value} onChange={setValue} />
//                     </div>
//                 </Step>
//                 <Step label='Upload Images' >
//                     <Dragger {...props}>
//                         <p className="ant-upload-drag-icon">
//                         <InboxOutlined />
//                         </p>
//                         <p className="ant-upload-text">Click or drag file to this area to upload</p>
//                         <p className="ant-upload-hint">
//                         Support for a single or bulk upload. Strictly prohibited from uploading company data or other
//                         banned files.
//                         </p>
//                     </Dragger>
//                 </Step>
//         </Stepper>
            