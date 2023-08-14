import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../features/auth/authSlice';
// import LogoSearch from '../../components/LogoSearch'
// import NavIcons from '../../components/NavIcons';
import ChatBox from '../../components/ChatBox/ChatBox';
import Conversation from '../../components/Conversation'
import { Button, Modal } from 'antd';

import {BsPlusCircleDotted} from 'react-icons/bs'


// import Backdrop from '@mui/material/Backdrop';
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import Fade from '@mui/material/Fade';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';


import './Chat.css'

import { io } from 'socket.io-client';
import { createChat, getMessages, getUserChats } from '../../features/chat/chatSlice';

const Chat = () => {
  // authData
  const {user, allUsers} = useSelector((state) => state?.auth);
  const {chats, chatMessages} = useSelector((state) => state?.chat);

  // dispatch
  const dispatch = useDispatch();
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [recieveMessage, setRecieveMessage] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  console.log(chats, 'tyyyyyyyyyy');

  


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  // socket
  const socket = useRef();


  useEffect(() => {
    socket.current = io('http://localhost:9000');
    socket.current.emit("new-user-add", user?._id);
    socket.current.on('get-users', (users) => {
      console.log('user', users)
      setOnlineUsers(users)
    })
  }, [user])

  useEffect(() => {
    dispatch(getUserChats(user?._id));
    dispatch(getAllUsers());
  }, [user]);






  // send message to the socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit('send-message', sendMessage);
    }
  }, [sendMessage]);

  // recieve message from the the socket server
  useEffect(() => {
    // setCurrentChat(chats[0]);
    socket.current.on("recieve-message", (data) => {
      setRecieveMessage(data);
    })
  }, []);
  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user?._id);
    const online = onlineUsers.find((user) => user?.userId === chatMember);
    return online ? true : false;
  }

  const createNewChat = (data) => {
    dispatch(createChat({senderId: user?._id, receiverId: data?._id}));
    setOpen(false)
  }
  return (
    <div className='Chat'>
      {/* left side */}
        <div className='flex flex-col gap-[1rem] mt-[1rem]'>
          {/* <LogoSearch /> */}
          <div className='flex flex-col gap-[1rem] bg-[#f3f3f3] p-[1rem] h-auto min-h-[80vh] overflow-scroll rounded-[1rem]'>
            <h2>Chats</h2>
            <div className=''>
              {chats?.map((chat) => {
                return (
                  <div className='cursor-pointer' onClick={() => setCurrentChat(chat)}>
                    {/* <p>{chat?._id}</p> */}
                    <Conversation data={chat} currentUserId={user?._id} online={checkOnlineStatus(chat)} />
                  </div>
                )
              })}

            <Button type="primary" onClick={showModal}>
              Open Modal
            </Button>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </Modal>
            </div>
          </div>
        </div>
      {/* right side */}
      <div className='flex flex-col gap-[1rem] flex-1 mt-[1rem]'>
          
          <div className='flex flex-col justify-end'>
            {/* <div className='w-[20rem] mb-[.4rem]'  style={{alignSelf: 'flex-end', }}>
              <NavIcons />
            </div> */}
            {/* chat body */}
            <ChatBox setSendMessage={setSendMessage} chat={currentChat} currentUserId={user?._id} recieveMessage={recieveMessage} />
          </div>    
      </div>
    </div>
  )
}

export default Chat