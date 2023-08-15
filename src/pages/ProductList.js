import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getProducts, resetState } from '../features/product/productSlice';
import { Link } from 'react-router-dom';
import {BiEdit} from 'react-icons/bi';
import {AiFillDelete} from 'react-icons/ai';
import CustomModal from '../components/CustomModal';
import Spinner from './Spinner';

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
    const {products, deletedProduct, isLoading} = useSelector((state) => state?.products);

  const [open, setOpen] = useState(false);

  const [productId, setProductId] = useState('');
  const performAction = () => {
    // alert(id)
    dispatch(deleteProduct(productId));
    dispatch(resetState());
    dispatch(getProducts())
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
  }, [deletedProduct]);
  console.log(products, 'dddddddd');

  
  const showModal = (id) => {
    setOpen(true);
    setProductId(id);
    // performAction(id)
  };
  const hideModal = () => {
    setOpen(false);
  };

  const data1 = [];
  products?.forEach((product, i) => {
    if (product?.role !== 'admin') {
      data1.push({
        key: i + 1,
        title: product?.title,
        brand: product?.brand,
        price: '$' + product?.price,
        category: product?.category,
        color: product?.color,
        action: <div className='flex items-center gap-2'>
        <Link to={`/admin/brand/${product?._id}`} >
          <BiEdit className='text-[1.2rem]'/>
        </Link> 
        <button onClick={() => showModal(product?._id)} className='bg-transparent border-0 text-danger '>
          <AiFillDelete className='text-[1.2rem] hover:fill-red-500 decoration-none'/>
        </button>
        </div>,

      });
    }
  })
  if (isLoading) {
    return <Spinner />
  }
  return (
    <div>
      <div className=' my-6'>
        <h3 className='font-bold text-[1.5rem] text-gray-900 my-6'>Colors</h3>
        <Table dataSource={data1} columns={columns} />
        <CustomModal title='Are you sure you want to delete this brand ? ' hideModal={hideModal} showModal={showModal}  open={open} performAction={performAction} />
      </div>
    </div>
  )
}

export default ProductList