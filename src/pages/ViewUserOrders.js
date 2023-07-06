import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../features/brand/brandSlice';
import { Link, useParams } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { getOrders, getOrdersByID } from '../features/auth/authSlice';
import { BsEye } from 'react-icons/bs';
const ViewUserOrders = () => {

      const columns = [
        {
          title: 'SNo',
          dataIndex: 'key',
        },
        {
          title: 'Product Title',
          dataIndex: 'title',
          sorter: (a, b) => a?.title?.length - b?.title?.length,
        },
        {
          title: 'Brand',
          dataIndex: 'brand',
          sorter: (a, b) => a?.brand?.length - b?.brand?.length,
        },
        {
            title: 'Count',
            dataIndex: 'count',
          },
        {
          title: 'Price',
          dataIndex: 'price',
          sorter: (a, b) => a?.price?.length - b?.price?.length,
        },
        {
          title: 'Category',
          dataIndex: 'category',
        },

      ];

  const {orders, currentOrder} = useSelector((state) => state?.orders);
  console.log(currentOrder, 'tttttt')  
  console.log(orders, 'dddddddd');
  const dispatch = useDispatch();
  const {id} = useParams();

  useEffect(() => {
    dispatch(getOrdersByID(id));
  }, [id]);
  
  const data1 = [];

  currentOrder?.products?.forEach((product, i) => {

    data1.push({
      key: i + 1,
      title: product?.product?.title,
    //   products: product?.products.map((product) => {
    //     return <div>{product.product.title} , </div> 
    //   }),
      price: product?.product?.price,
      brand: product?.product?.brand,
      category: product?.product?.category,
      count: product?.count,
      createdAt: product?.product?.createdAt.slice(0, 10),

    });
    
  });

  return (
    <div>
      <div className=' my-6'>
        <h3 className='font-bold text-[1.5rem] text-gray-900 my-6'>Order Products</h3>
        <Table dataSource={data1} columns={columns} />;
      </div>
    </div>
  )
}

export default ViewUserOrders;