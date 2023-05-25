import React from 'react'
import CustomInput from '../components/CustomInput'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='py-5 h-[100vh] w-[100%] flex items-center justify-center rounded-lg' style={{background: "#ffd333"}}>
        <form className='bg-white w-[30%] p-5 flex flex-col items-center gap-2'>
            <h3 className='text-center font-bold text-gray-700 text-[1.7rem] '>Login</h3>
            <p className='text-center font-semibold text-gray-500 text-[1rem] '>Login to Your Account to continue...</p>
            <p></p>
            <CustomInput label='Email Address' type={'email'} />
            <CustomInput label='Password' type={'password'} />
            <div className='w-[100%] flex justify-end'>
                <Link to='/forgot-password' className='text-end text-blue-600'>Forgot Password</Link>
            </div>
            {/* <CustomInput label='Email Address' />
            <CustomInput label='Email Address' /> */}
            <button className='border-0 px-3 py-2 text-white font-bold w-[100%] bg-gray-800 rounded-lg cursor-pointer ' type='submit' >Login</button>
        </form>
        
    </div>
  )
}

export default Login