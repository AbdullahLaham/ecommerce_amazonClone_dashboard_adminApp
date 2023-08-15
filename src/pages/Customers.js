import { Table } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../features/customers/customerSlice';
import Spinner from './Spinner';


const Customers = () => {
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
      title: 'User_No',
      dataIndex: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a,b) => a.name.length - b.name.length,
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers())
  }, []);

  const {customers, isLoading} = useSelector((state) => state?.customers);
  
  
  const data1 = [];
  customers?.forEach((user) => {
    if (user?.role !== 'admin') {
      data1.push({
        key: user?._id,
        name: user?.firstname + ' ' + user?.lastname,
        email: user?.email,
        mobile: user?.mobile,
      });
    }
  })

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div>
      <div className=' my-6'>
        <h3 className='font-bold text-[1.5rem] text-gray-900 my-6'>Customers</h3>
        <Table dataSource={data1} columns={columns} />;
      </div>
    </div>
  )
}

export default Customers