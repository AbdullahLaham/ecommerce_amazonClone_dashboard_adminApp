import React from 'react'
import './menu.css';
import {GrLogout} from 'react-icons/gr';
import {BsPersonCircle} from 'react-icons/bs';
import { Link } from 'react-router-dom';
// import { LOGOUT } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
const Menu = () => {

  // // dispatch
  // const dispatch = useDispatch();
  // const {authData} = useSelector((state) => state.userReducer);
  const deleteCurrentUser = () => {
    // dispatch({type: LOGOUT});
  }
  return (
    <div className='w-[19rem]  flex flex-col justify-between border-orange rounded-md p-[1rem] pb-0 absolute right-[3rem] top-[5rem] bg-gray-200 '>
      <div className='max-h-[2rem] flex items-center gap-2 border-b border-gray-200  py-[.1rem] pt-0 mb-0 '>
        <img src={'authData.image'} className='w-[2rem] h-[2rem] rounded-full object-cover' />
        <p className=' text-blue-600 font-semibold'>{'authData.name'}</p>
      </div>
      <Link to='/profile' className='max-h-[2rem] border-b border-gray-200  text-blue-600 font-semibold mt-0' >My Profile</Link>
      <div className='flex gap-2 border-b items-center py-[.5rem] text-gray-500'>
        <Link to='/login' onClick={() => deleteCurrentUser()} className=' '>LogOut</Link>
        <GrLogout className='text-gray-300 text-[1.1rem]' />
      </div>
    </div>
  )
}

export default Menu
