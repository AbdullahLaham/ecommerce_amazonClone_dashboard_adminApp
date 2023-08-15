import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../features/brand/brandSlice';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { deleteColor, getColors } from '../features/pcolor/pcolorSlice';
import CustomModal from '../components/CustomModal';
import Spinner from './Spinner';

const ColorList = () => {
  
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
      title: 'Color',
      dataIndex: 'color',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];
  

  
  const {colors, deletedColor, updatedColor, isLoading} = useSelector((state) => state?.colors);

  console.log(colors, 'dddddddd');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getColors())
  }, [deletedColor, updatedColor]);
  
  const [open, setOpen] = useState(false);
  const [colorId, setColorId] = useState('');
  const showModal = (id) => {
    setOpen(true);
    setColorId(id);
    // performAction(id)
  };
  const hideModal = () => {
    setOpen(false);
  };

  const performAction = () => {
    // alert(id)
    dispatch(deleteColor(colorId));
    dispatch(getColors())
    setOpen(false);
    // dispatch(resetState());
  };



  const data1 = [];

  colors.forEach((color, i) => {

    data1.push({
      key: i + 1,
      title: color?.title,
      action: <div className='flex items-center gap-2'>
        <Link to={`/admin/color/${color?._id}`} >
          <BiEdit className='text-[1.2rem]'/>
        </Link> 
        <button onClick={() => showModal(color?._id)} className='bg-transparent border-0 text-danger '>
          <AiFillDelete className='text-[1.2rem] hover:fill-red-500 decoration-none'/>
        </button>
      </div>,
      color: <div>
      <p className={`w-[1.5rem] h-[1.5rem] rounded-full`} style={{backgroundColor: color?.title}}></p>
    </div>,

    });
    
  });
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

export default ColorList