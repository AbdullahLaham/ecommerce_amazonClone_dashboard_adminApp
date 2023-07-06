import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEnquiry, resetState, updateEnquiry } from '../features/enquiry/enquirySlice';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Select } from 'antd';
const ViewEnquiry = () => {
    // EnqID
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {currentEnquiry, deletedEnquiry, updatedEnquiry} = useSelector((state) => state?.enquiries);

    useEffect(() => {
        dispatch(getEnquiry(id));
    }, [id]);
    console.log(currentEnquiry, 'yy');



    const updateData = (val) => { 
        
        if (id !== undefined) {
          const data = {enquiry: {status: val}, id}
        //   alert(JSON.stringify(data))
          dispatch(updateEnquiry(data));
          dispatch(resetState())
          formik.resetForm();
          setTimeout(() => {
            navigate('/admin/enquiries')
          }, 3000)
          console.log('hello')
        }
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
      
  return (
    <div>
        <h className='text-[1.5rem]  font-bold mb-[2.5rem] text-gray-500 '>View Enquiry</h>
        <div className='bg-white flex flex-col gap-3 justify-start rounded-md'>
            <div className='flex items-center gap-3 mt-[1rem]'>
                <h5 className='text-[1.1rem] font-gray-600 leading-md font-semibold '>Name: </h5>
                <p>{currentEnquiry?.name}</p>
            </div>
            <div className='flex items-center gap-3 mt-[1rem]'>
                <h5 className='text-[1.1rem] font-gray-600 leading-md font-semibold '>Mobile: </h5>
                <p>
                    <a hrey={`tel:+972${currentEnquiry?.mobile}`}>{currentEnquiry?.mobile}</a>
                </p>
            </div>

            <div className='flex items-center gap-3 mt-[1rem]'>
                <h5 className='text-[1.1rem] font-gray-600 leading-md font-semibold '>Email: </h5>
                <p>
                    <a hrey={`mailto:${currentEnquiry?.email}`}>{currentEnquiry?.email}</a>
                </p>
            </div>

            <div className='flex items-center gap-3 mt-[1rem]'>
                <h5 className='text-[1.1rem] font-gray-600 leading-md font-semibold '>Comment: </h5>
                <p>
                    {currentEnquiry?.comment}
                </p>
            </div>

            <div className='flex items-center gap-3 mt-[1rem]'>
                <h5 className='text-[1.1rem] font-gray-600 leading-md font-semibold '>Status: </h5>
                <p>
                    {currentEnquiry?.status}
                </p>
            </div>

            <form className='flex items-center gap-3'>
                <h5  className='text-[1.1rem] font-gray-600 leading-md font-semibold'>Change Status: </h5>
                <Select className=' my-[.5rem]'
                defaultValue={currentEnquiry?.status ? currentEnquiry?.status : 'Submitted'}
                    placeholder='Select Status'
                    onChange={(val) => updateData(val)}
                    name='tag'
                    options={statuss}
                />
            </form>
    

        </div>
    </div>
  )
}

export default ViewEnquiry