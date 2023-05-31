import React from 'react'
import {BsArrowDownRight} from 'react-icons/bs'
import { Column } from '@ant-design/plots';
import { Table } from 'antd';

const Dashboard = () => {

 const data = [
    {
      type: "Jan",
      sales: 38,
    },
    {
      type: "Feb",
      sales: 52,
    },
    {
      type: "Mar",
      sales: 61,
    },
    {
      type: "Apr",
      sales: 145,
    },
    {
      type: "May",
      sales: 48,
    },
    {
      type: "Jun",
      sales: 38,
    },
    {
      type: "July",
      sales: 38,
    },
    {
      type: "Aug",
      sales: 38,
    },
    {
      type: "Sept",
      sales: 38,
    },
    {
      type: "Oct",
      sales: 38,
    },
    {
      type: "Nov",
      sales: 38,
    },
    {
      type: "Dec",
      sales: 38,
    },
  ];
    const config = {
      data,
      xField: 'type',
      yField: 'sales',
      label: {
        position: 'middle',
        // 'top', 'bottom', 'middle',
        style: {
          fill: '#FFFFFF',
          opacity: 0.6,
        },
      },
      xAxis: {
        label: {
          autoHide: true,
          autoRotate: false,
        },
      },
      meta: {
        type: {
          alias: '类别',
        },
        sales: {
          alias: '销售额',
        },
      },
    }
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
    <div className=''>
        <h3 className='font-bold text-[1.8rem] mb-2 text-gray-900'>Dashboard</h3>

        <section className='flex items-center justify-between'>
          <div className='flex justify-between items-center gap-3'>
            <div className='flex justify-between gap-3 items-end rounded-md w-[22rem] h-[5.5rem] shadow-xs bg-gray-100 px-3 py-3 '>
              <div className='flex flex-col justify-between'>
                <p className='font-bold text-[1.1rem] mb-1 text-gray-700'>
                  Total
                </p>
                <p  className='font-bold text-[1.3rem] text-gray-800'>
                  $1100
                </p>
              </div>

              <div>
                
                <p className='font-bold text-[.9rem] text-gray-700 '>
                  <p className='font-bold text-[1rem] text-gray-800 flex items-center gap-2 justify-end'>
                    <BsArrowDownRight /> 32%
                  </p>
                  Compared To April 2022
                </p>
              </div>
              
            </div>

          </div>

          <div className='flex justify-between items-center gap-3'>
            <div className='flex justify-between gap-3 items-end rounded-md w-[22rem] h-[5.5rem] shadow-xs bg-gray-100 px-3 py-3 '>
              <div className='flex flex-col justify-between'>
                <p className='font-bold text-[1.1rem] mb-1 text-gray-700'>
                  Total
                </p>
                <p  className='font-bold text-[1.3rem] text-gray-800'>
                  $1100
                </p>
              </div>

              <div>
                
                <p className='font-bold text-[.9rem] text-gray-700 '>
                  <p className='font-bold text-[1rem] text-gray-800 flex items-center gap-2 justify-end'>
                    <BsArrowDownRight /> 32%
                  </p>
                  Compared To April 2022
                </p>
              </div>
              
            </div>

          </div>

          <div className='flex justify-between items-center gap-3'>
            <div className='flex justify-between gap-3 items-end rounded-md w-[22rem] h-[5.5rem] shadow-xs bg-gray-100 px-3 py-3 '>
              <div className='flex flex-col justify-between'>
                <p className='font-bold text-[1.1rem] mb-1 text-gray-700'>
                  Total
                </p>
                <p  className='font-bold text-[1.3rem] text-gray-800'>
                  $1100
                </p>
              </div>

              <div>
                
                <p className='font-bold text-[.9rem] text-gray-700 '>
                  <p className='font-bold text-[1rem] text-gray-800 flex items-center gap-2 justify-end'>
                    <BsArrowDownRight /> 32%
                  </p>
                  Compared To April 2022
                </p>
              </div>
              
            </div>

          </div>
          
        </section>

        <div className=' my-6'>
          <h3 className='font-bold text-[1.5rem] text-gray-900 my-6 mb-8'>Income Statistics</h3>
          <Column {...config} />
        </div>

        <div className=' my-6'>
          <h3 className='font-bold text-[1.5rem] text-gray-900 my-6'>Recent Orders</h3>
          <Table dataSource={dataSource} columns={columns} />;

        </div>

    </div>
  )
}

export default Dashboard