import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { getBlog, getBlogs, resetState, deleteBlog, updateBlog } from '../features/blog/blogSlice'
import CustomModal from '../components/CustomModal';

const BlogList = () => {
  const [open, setOpen] = useState(false);
  const [blogId, setBlogId] = useState('');
  const {blogs, updatedBlog, deletedBlog} = useSelector((state) => state?.blogs);

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogs());
  }, [updatedBlog, deletedBlog, blogId]);

  const showModal = (id) => {
    setOpen(true);
    setBlogId(id);
    // performAction(id)
  };
  const hideModal = () => {
    setOpen(false);
  };

  const performAction = () => {
    // alert(id)
    dispatch(deleteBlog(blogId));
    dispatch(getBlog())
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
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
    
  ];
  
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
      description: blog?.description.slice(3, blog?.description?.length - 4),
      action: <div className='flex items-center gap-2'>
        <Link to={`/admin/blog/${blog?._id}`} >
          <BiEdit className='text-[1.2rem]'/>
        </Link> 
        <button onClick={() => showModal(blog?._id)} className='bg-transparent border-0 text-danger '>
          <AiFillDelete className='text-[1.2rem] hover:fill-red-500 decoration-none'/>
        </button>
      </div>,

    });
    
  });

  return (
    <div>
      <div className=' my-6'>
        <h3 className='font-bold text-[1.5rem] text-gray-900 my-6'>Blogs</h3>
        <Table dataSource={data1} columns={columns} />
        <CustomModal title='Are you sure you want to delete this Blog ? ' hideModal={hideModal} showModal={showModal}  open={open} performAction={performAction} />
      </div>
        
    </div>
  )
}

export default BlogList