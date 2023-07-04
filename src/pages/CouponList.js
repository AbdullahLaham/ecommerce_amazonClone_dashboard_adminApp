import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../features/brand/brandSlice';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { deleteCoupon, getCoupons } from '../features/coupon/couponSlice';
import CustomModal from '../components/CustomModal';

const CouponList = () => {
  const [open, setOpen] = useState(false);
  const [couponId, setCouponId] = useState('');
  const showModal = (id) => {
    setOpen(true);
    setCouponId(id);
    // performAction(id)
  };
  const hideModal = () => {
    setOpen(false);
  };

  const performAction = () => {
    // alert(id)
    dispatch(deleteCoupon(couponId));
    dispatch(getCoupons())
    setOpen(false);
    // dispatch(resetState());
  };


  
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
        title: 'Expiry',
        dataIndex: 'expiry',
    },
    {
        title: 'Discount',
        dataIndex: 'discount',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];


  const {coupons, deletedCoupon, updatedCoupon} = useSelector((state) => state?.coupons);

  console.log(coupons, 'dddddddd');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCoupons())
  }, [deleteCoupon, updatedCoupon]);
  
  const data1 = [];

  coupons?.length && coupons?.map((coupon, i) => {

    data1.push({
      key: i + 1,
      name: coupon?.name,
      expiry: new Date(coupon?.expiry).toLocaleString(),
      discount: coupon?.discount,
      action: <div className='flex items-center gap-2'>
        <Link to={`/admin/coupon/${coupon?._id}`}>
          <BiEdit className='text-[1.2rem]'/>
        </Link> 
        <button onClick={() => showModal(coupon?._id)}>
          <AiFillDelete className='text-[1.2rem] hover:fill-red-500 decoration-none'/>
        </button>
      </div>,

    });
    
  });





  return (
    <div>
      <div className=' my-6'>
        <h3 className='font-bold text-[1.5rem] text-gray-900 my-6'>Brands</h3>
        <Table dataSource={data1} columns={columns} />
        <CustomModal title='Are you sure you want to delete this coupon ? ' hideModal={hideModal} showModal={showModal}  open={open} performAction={performAction} />
      </div>
    </div>
  )
}

export default CouponList



