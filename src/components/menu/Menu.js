import React from 'react'
import './menu.css';
import {GrLogout} from 'react-icons/gr';
import {BsPersonCircle} from 'react-icons/bs';
import { Link } from 'react-router-dom';
// import { LOGOUT } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
const Menu = () => {
  const {auth} = useSelector((state) => state.auth);
  // // dispatch
  const dispatch = useDispatch();
  // const {authData} = useSelector((state) => state.userReducer);
  const deleteCurrentUser = () => {
    dispatch(logout());
  }
  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)
  return (
    <div className='w-[19rem]  flex flex-col justify-start border-orange rounded-md p-[1rem] pb-0 absolute right-[3rem] top-[5rem] bg-gray-200 '>
      <div className=' h-[2em] flex items-center gap-2 border-b border-gray-200  py-[.1rem] '>
        <img src={'authData.image'} className='w-[2rem] h-[2rem] rounded-full object-cover' />
        <p className=' text-blue-600 font-semibold'>{user?.firstname} {user?.lastname}</p>
      </div>
      <Link to='/profile' className='h-[2rem] border-b border-gray-200  text-blue-600 font-semibold -mt-2' >My Profile</Link>
      <div className='flex gap-2 border-b items-center py-[.5rem] text-gray-500 h-[2rem] mt-3'>
        <p onClick={() => deleteCurrentUser()} className=' '>LogOut</p>
        <GrLogout className='text-gray-300 text-[1.1rem]' />
      </div>
    </div>
  )
}

export default Menu
