
import React from 'react'
import CustomInput from '../components/CustomInput'

const ResetPassword = () => {
  return (
    <div className='py-5 h-[100vh] w-[100%] flex items-center justify-center rounded-lg' style={{background: "#ffd333"}}>
        <div className='bg-white w-[30%] p-5 flex flex-col items-center gap-2'>
            <h3 className='text-center font-bold text-gray-700 text-[1.5rem] '>Reset Password</h3>
            <p className='text-center font-semibold text-gray-500 text-[.9rem] '>Please Enter your New Password..</p>
            <p></p>
            <CustomInput label='New Password' type='password'/>
            <CustomInput label='Confirm Password' type='password' />
            {/* <CustomInput label='Email Address' />
            <CustomInput label='Email Address' /> */}
            <button className='border-0 px-3 py-2 mt-2 text-white font-semibold w-[100%] bg-gray-800 active:bg-gray-900 rounded-lg cursor-pointer ' type='submit' >Reset Password</button>
        </div>
        
    </div>
  )
}

export default ResetPassword;