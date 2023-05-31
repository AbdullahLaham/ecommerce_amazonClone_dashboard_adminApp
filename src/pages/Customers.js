import { Table } from 'antd'
import React from 'react'

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
      title: 'SNo',
      dataIndex: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Product',
      dataIndex: 'product',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
  ];
  return (
    <div>
      <div className=' my-6'>
        <h3 className='font-bold text-[1.5rem] text-gray-900 my-6'>Customers</h3>
        <Table dataSource={dataSource} columns={columns} />;
      </div>
    </div>
  )
}

export default Customers