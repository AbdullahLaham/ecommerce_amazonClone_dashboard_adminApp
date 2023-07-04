import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import {getBlogCategories} from '../features/bcategory/bcategorySlice'
import { getEnquiries } from '../features/enquiry/enquirySlice';

const Enquiries = () => {
    
      
      const columns = [
        {
          title: 'SNo',
          dataIndex: 'key',
        },
        {
          title: 'Name',
          dataIndex: 'name',
        },
        
        {
          title: 'Email',
          dataIndex: 'email',
        },
        {
          title: 'Status',
          dataIndex: 'status',
        },
        {
          title: 'Date',
          dataIndex: 'createdAt',
        },
        {
          title: 'Action',
          dataIndex: 'action',
        },
      ]


 const {enquiries} = useSelector((state) => state?.enquiries);

  console.log(enquiries, 'tttttttttt');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEnquiries())
  }, []);
  
  const data1 = [];

  enquiries?.forEach((enquiry, i) => {

    data1.push({
      key: i + 1,
      name: enquiry?.name,
      email: enquiry?.email,
      status: <>
        <select className='px-[1rem] py-[.5rem] border border-gray-300 outlin-none rounded-lg'>
          <option>{enquiry.status}</option>
        </select>
      </>,
      createdAt: enquiry?.createdAt.slice(0, 10),
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
        <h3 className='font-bold text-[1.5rem] text-gray-900 my-6'>Enquiries</h3>
        <Table  dataSource={data1} columns={columns} />;
      </div>
    </div>
  )
}

export default Enquiries