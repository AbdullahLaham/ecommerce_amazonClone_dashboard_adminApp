import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../features/product/productSlice';
import { Link } from 'react-router-dom';
import {BiEdit} from 'react-icons/bi';
import {AiFillDelete} from 'react-icons/ai';

const ProductList = () => {
  // const dataSource = [
  //   {
  //     key: '1',
  //     name: 'Mike',
  //     product: 15,
  //     status: '10 Downing Street',
  //   },
  //   {
  //     key: '2',
  //     name: 'Mike',
  //     product: 15,
  //     status: '10 Downing Street',
  //   },
  // ];
  
  const columns = [
    {
      title: 'SNo',
      dataIndex: 'key',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      sorter: (a, b) => a?.title?.length - b?.title?.length,
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      sorter: (a, b) => a?.brand?.length - b?.brand?.length,
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
    {
      title: 'Color',
      dataIndex: 'color',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const {products} = useSelector((state) => state?.products);
  console.log(products, 'dddddddd');

  const data1 = [];
  products.forEach((product, i) => {
    if (product?.role !== 'admin') {
      data1.push({
        key: i + 1,
        title: product?.title,
        brand: product?.brand,
        price: '$' + product?.price,
        category: product?.category,
        color: product?.color,
        action: <div className='flex items-center gap-2'>
          <Link to='/'>
            <BiEdit className='text-[1.2rem]'/>
          </Link> 
          <Link>
            <AiFillDelete className='text-[1.2rem] hover:fill-red-500 decoration-none'/>
          </Link>
        </div>,

      });
    }
  })

  return (
    <div>
      <div className=' my-6'>
        <h3 className='font-bold text-[1.5rem] text-gray-900 my-6'>Colors</h3>
        <Table dataSource={data1} columns={columns} />;
      </div>
    </div>
  )
}

export default ProductList