import React, { useEffect, useState } from 'react'
import '../pages/ChatPage/Chat.css'
import { fetchUserData } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
const Conversation = ({data, currentUserId, online}) => {
    let dispatch = useDispatch();
    
   // const {userData} = useSelector((state) => state?.auth)
  const [userData, setUserData] = useState({});
    console.log('data', data);


    useEffect(() => {
        const userr = data?.members?.find((user) => user?._id !== currentUserId);
        // dispatch(fetchUserData(userId));
        setUserData(userr)
    }, [data, currentUserId]);
    

  return (
    <>
        <div className='conversation-cont flex justify-start gap-[2rem] items-center w-[100%] hover:bg-[#e2e2e2] p-[.7rem] rounded-lg'>
            <div className=''>
                {online ? <div className='online-dot'></div> : ""}
                <img src={'/images/web3.jpg'} alt='followerImage' className='userImage w-[50px] h-[50px] rounded-full object-cover' />
            </div>
            <div className='flex flex-col name text-[.8rem] userInfo'>
                <span className='font-semibold text-[1.1rem] '>{userData?.firstname} {userData?.lastname} </span>
                <span>{online ? "Online" : "Offline"}</span>
            </div>
        </div>
        <hr className='w-[85%] border-[.1px] border-[#ececec]' />
    </>
  )
}

export default Conversation;