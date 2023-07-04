import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBrand, getBrands, resetState } from '../features/brand/brandSlice';
import { Link, useParams } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import CustomModal from '../components/CustomModal';

const BrandList = () => {
  // params
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [brandId, setBrandId] = useState('');
  const showModal = (id) => {
    setOpen(true);
    setBrandId(id);
    // performAction(id)
  };
  const hideModal = () => {
    setOpen(false);
  };

  const performAction = () => {
    // alert(id)
    dispatch(deleteBrand(brandId));
    dispatch(getBrands())
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


  const {brands, updatedBrand, deletedBrand} = useSelector((state) => state?.brands);

  console.log(brands, 'dddddddd');
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(resetState())
    dispatch(getBrands())
  }, [deletedBrand, updatedBrand]);
  
  const data1 = [];

  brands?.length && brands?.map((brand, i) => {

    data1.push({
      key: i + 1,
      title: brand?.title,
      action: <div className='flex items-center gap-2'>
        <Link to={`/admin/brand/${brand?._id}`} >
          <BiEdit className='text-[1.2rem]'/>
        </Link> 
        <button onClick={() => showModal(brand?._id)} className='bg-transparent border-0 text-danger '>
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
        <CustomModal title='Are you sure you want to delete this brand ? ' hideModal={hideModal} showModal={showModal}  open={open} performAction={performAction} />

      </div>
    </div>
  )
}

export default BrandList