import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory, getCategories } from '../features/pcategory/pcategorySlice';
import { AiFillDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import CustomModal from '../components/CustomModal';
import { resetState } from '../features/brand/brandSlice';

const CategoryList = () => {
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
      title: 'Action',
      dataIndex: 'action',
    },
  ];



  const {categories, updatedCategory, deletedCategory} = useSelector((state) => state?.categories);
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState('');
  console.log(categories, 'dddddddd');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories())
  }, [updatedCategory, deletedCategory]);

  const showModal = (id) => {
    setOpen(true);
    setCategoryId(id);
    // performAction(id)
  };
  const hideModal = () => {
    setOpen(false);
  };

  const performAction = () => {
    // alert(id)
    dispatch(deleteCategory(categoryId));
    dispatch(getCategories())
    setOpen(false);
    // dispatch(resetState());
  };

  const data1 = [];

  categories?.forEach((category, i) => {

    data1.push({
      key: i + 1,
      title: category?.title,
      action: <div className='flex items-center gap-2'>
        <Link  to={`/admin/category/${category?._id}`}>
          <BiEdit className='text-[1.2rem]'/>
        </Link> 
        <button className='bg-transparent ' onClick={() => showModal(category?._id)}>
          <AiFillDelete className='text-[1.2rem] hover:fill-red-500 decoration-none'/>
        </button>
      </div>,

    });
    
  });



  return (
    <div>
      <div className=' my-6'>
        <h3 className='font-bold text-[1.5rem] text-gray-900 my-6'>Categories</h3>
        <Table dataSource={data1} columns={columns} />
        <CustomModal title='Are you sure you want to delete this Category ? ' hideModal={hideModal} showModal={showModal}  open={open} performAction={performAction} />
      </div>
    </div>
  )
}

export default CategoryList