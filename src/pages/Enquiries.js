import React, { useEffect, useState } from 'react'
import { Select, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import {getBlogCategories} from '../features/bcategory/bcategorySlice'
import { deleteEnquiry, getEnquiries, getEnquiry, resetState, updateEnquiry } from '../features/enquiry/enquirySlice';
import CustomModal from '../components/CustomModal';
import {BsEye} from 'react-icons/bs'
import { useFormik } from 'formik';
import * as yup from 'yup';
import Spinner from './Spinner';

const Enquiries = () => {
    
      
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
          title: 'Email',
          dataIndex: 'email',
        },
        {
          title: 'Status',
          dataIndex: 'status',
        },
        {
          title: 'Date',
          dataIndex: 'createdAt',
        },
        {
          title: 'Action',
          dataIndex: 'action',
        },
      ]




      const {id} = useParams();
    const navigate = useNavigate();
    const {enquiries, currentEnquiry, deletedEnquiry, updatedEnquiry, isLoading} = useSelector((state) => state?.enquiries);

    useEffect(() => {
        dispatch(getEnquiry(id));
    }, [id]);
    console.log(currentEnquiry, 'yy');



    const updateData = (dataa) => { 
        const {val,id} = dataa;
        const data = {enquiry: {status: val}, id}
        dispatch(updateEnquiry(data));
        dispatch(resetState())
        formik.resetForm();
        
        console.log('hello')
        
      }



    let enqSchema = yup.object().shape({
        status: yup.string().required('Status is Required'),
        
      });
      
    
      const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            status: '',
        },
        
        onSubmit: updateData,
        validationSchema: enqSchema,
      });
      console.log(formik.values.status);


      const statuss = [
        {label: "Submitted", value: "Submitted"},
        {label: "Contacted", value: "Contacted"},
        {label: "In Progress", value: "In Progress"},
        {label: "Resolved", value: "Resolved"}
      ]








 useEffect(() => {
   dispatch(getEnquiries())
 }, [deletedEnquiry, updatedEnquiry]);
 
 const [open, setOpen] = useState(false);
 const [enquiryId, setEnquiryId] = useState('');
 const showModal = (id) => {
   setOpen(true);
   setEnquiryId(id);
   // performAction(id)
 };
 const hideModal = () => {
   setOpen(false);
 };

 const performAction = () => {
   dispatch(deleteEnquiry(enquiryId));
   dispatch(resetState());
   dispatch(getEnquiries());
   setOpen(false);
   
 };



  console.log(enquiries, 'tttttttttt');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEnquiries())
  }, []);
  
  const data1 = [];

  enquiries?.forEach((enquiry, i) => {

    data1.push({
      key: i + 1,
      name: enquiry?.name,
      email: enquiry?.email,
      status: <>
        <Select className=' my-[.5rem]'
          defaultValue={enquiry?.status ? enquiry?.status : 'Submitted'}
          placeholder='Select Status'
          onChange={(val) => updateData({val: val, id: enquiry?._id})}
          name='tag'
          options={statuss}
          />
      </>,
      createdAt: enquiry?.createdAt.slice(0, 10),
      action: <div className='flex items-center gap-2'>
        <Link to={`/admin/enquiry/${enquiry?._id}`} >
          <BsEye className='text-[1.2rem]'/>
        </Link> 
        <button onClick={() => showModal(enquiry?._id)} className='bg-transparent border-0 text-danger '>
          <AiFillDelete className='text-[1.2rem] hover:fill-red-500 decoration-none'/>
        </button>
      </div>,
      


    });
    
  });

  if (isLoading) {
    return <Spinner />
  }
  return (
    <div>

      <div className=' my-6'>
        <h3 className='font-bold text-[1.5rem] text-gray-900 my-6'>Enquiries</h3>
        <Table  dataSource={data1} columns={columns} />
        <CustomModal title='Are you sure you want to delete this Enquiry ? ' hideModal={hideModal} showModal={showModal}  open={open} performAction={performAction} />
      </div>

    </div>
  )
}

export default Enquiries;