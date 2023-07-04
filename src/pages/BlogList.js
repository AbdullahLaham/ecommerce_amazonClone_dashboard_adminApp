import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { getBlogs, resetState } from '../features/blog/blogSlice'

const BlogList = () => {
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      product: 15,
      status: '10 Downing Street',
    },
    {
      key: '2',
      name: 'Mike',
      product: 15,
      status: '10 Downing Street',
    },
  ];
  
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
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
    
  ];
  
  const {blogs} = useSelector((state) => state?.blogs);

  console.log(blogs, 'dddddddd');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState())
    dispatch(getBlogs())
  }, []);
  
  const data1 = [];

  blogs?.forEach((blog, i) => {

    data1.push({
      key: i + 1,
      title: blog?.title,
      category: blog?.category,
      action: <div className='flex items-center gap-2'>
        <Link to='/'>
          <BiEdit className='text-[1.2rem]'/>
        </Link> 
        <Link>
          <AiFillDelete className='text-[1.2rem] hover:fill-red-500 decoration-none'/>
        </Link>
      </div>,

    });
    
  });

  return (
    <div>
      <div className=' my-6'>
        <h3 className='font-bold text-[1.5rem] text-gray-900 my-6'>Blogs</h3>
        <Table dataSource={data1} columns={columns} />;
      </div>
        
    </div>
  )
}

export default BlogList