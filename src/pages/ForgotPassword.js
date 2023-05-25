import React from 'react'
import CustomInput from '../components/CustomInput'

const ForgotPassword = () => {
  return (
    <div className='py-3 h-[100vh] w-[100%] flex items-center justify-center ' style={{background: "#ffd333"}}>
        <div className='bg-white w-[30%] p-5 flex flex-col items-center gap-2 rounded-[.5rem]'>
            <h3 className='text-center font-bold text-gray-700 text-[1.5rem] '>Forgot Password</h3>
            <p className='text-center font-semibold text-gray-500 text-[.9rem] '>Please Enter your register Email to get reset password mail</p>
            <p></p>
            <CustomInput label='Your Email' type='email'/>
            <button className='border-0 px-3 py-2 mt-1 text-white font-semibold w-[100%] bg-gray-800 rounded-lg cursor-pointer active:bg-gray-900' type='submit' >Send Link</button>
        </div>
        
    </div>
  )
}

export default ForgotPassword;