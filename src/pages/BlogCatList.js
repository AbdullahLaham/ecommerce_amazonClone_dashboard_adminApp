import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import {deleteBlogCategory, getBlogCategories, resetState} from '../features/bcategory/bcategorySlice'
import CustomInput from '../components/CustomInput'
import CustomModal from '../components/CustomModal';
import Spinner from './Spinner';

const BlogCatList = () => {

  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState('');
  const {blogCategories, updatedBlogCategory, deletedBlogCategory, isLoading} = useSelector((state) => state?.blogCategories);

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogCategories())
  }, [updatedBlogCategory, deletedBlogCategory]);

  const showModal = (id) => {
    setOpen(true);
    setCategoryId(id);
    // performAction(id)
  };
  const hideModal = () => {
    setOpen(false);
  };

  const performAction = () => {
    // alert(id)
    dispatch(deleteBlogCategory(categoryId));
    dispatch(getBlogCategories())
    setOpen(false);
    // dispatch(resetState());
  };
  
  const columns = [
    {
      title: 'SNo',
      dataIndex: 'key',
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
    
  ];
  

  console.log(blogCategories, 'dddddddd');
  const dispatch = useDispatch();

  const data1 = [];

  blogCategories?.forEach((blogCategory, i) => {

    data1.push({
      key: i + 1 ,
      title: blogCategory?.title,
      action: <div className='flex items-center gap-2'>
        <Link  to={`/admin/blog-category/${blogCategory?._id}`}>
          <BiEdit className='text-[1.2rem]'/>
        </Link> 
        <button className='bg-transparent ' onClick={() => showModal(blogCategory?._id)}>
          <AiFillDelete className='text-[1.2rem] hover:fill-red-500 decoration-none'/>
        </button>
      </div>,

    });
    
  });

  if (isLoading) {
    return <Spinner />
  }
  return (
    <div>
      <div className=' my-6'>
        <h3 className='font-bold text-[1.5rem] text-gray-900 my-6'>Blog Categories</h3>
        <Table dataSource={data1} columns={columns} />
        <CustomModal title='Are you sure you want to delete this Blog Category ? ' hideModal={hideModal} showModal={showModal}  open={open} performAction={performAction} />
      </div>
    </div>
  )
}

export default BlogCatList