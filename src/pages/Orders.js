import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../features/brand/brandSlice';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { getOrders } from '../features/auth/authSlice';
import { BsEye } from 'react-icons/bs';
import Spinner from './Spinner';

const Orders = () => {

      const columns = [
        {
          title: 'SNo',
          dataIndex: 'key',
        },
        {
          title: 'Status',
          dataIndex: 'paymentIntent',
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
        },
        {
          title: 'Products',
          dataIndex: 'products',
        },
        {
          title: 'UserOrders',
          dataIndex: 'orderProducts',
        },
        // {
        //   title: 'orderBy',
        //   dataIndex: 'orderBy',
        // },
        {
          title: 'Date',
          dataIndex: 'createdAt',
        },
        {
          title: 'Action',
          dataIndex: 'action',
        },
      ];

  const {orders, isLoading} = useSelector((state) => state?.auth);

  console.log(orders, 'dddddddd');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  
  const data1 = [];

  orders?.forEach((order, i) => {

    data1.push({
      key: i + 1,
      name: order?.name,
      products: order?.orderItems?.map((product) => {
        return <div>{product?.product?.title} , </div> 
      }),
      // orderBy: order?.orderBy?.firstname,
      amount: order?.paymentIntent?.amount,
      orderProducts: <Link to={`/admin/order/${order?._id}`}>View Order Products</Link>,
      paymentIntent: order?.paymentIntent?.status,
      createdAt: order?.createdAt.slice(0, 10),
      action: <div className='flex items-center gap-2'>
        {/* <Link to={`/admin/order/${order?._id}`} >
          <BsEye className='text-[1.2rem]'/>
        </Link>  */}

        <Link>
          <AiFillDelete className='text-[1.2rem] hover:fill-red-500 decoration-none'/>
        </Link>
      </div>,

    });
    
  });

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div>
      <div className=' my-6'>
        <h3 className='font-bold text-[1.5rem] text-gray-900 my-6'>Orders</h3>
        <Table dataSource={data1} columns={columns} />;
      </div>
    </div>
  )
}

export default Orders