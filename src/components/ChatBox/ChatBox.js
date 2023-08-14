import React, { useEffect, useRef, useState } from 'react'
import { fetchUserData } from '../../features/auth/authSlice';
import './ChatBox.css';
import {format} from 'timeago.js';
import InputEmoji from 'react-input-emoji';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, getMessages } from '../../features/chat/chatSlice';
import API from '../../features/MainApi';
const ChatBox = ({chat, currentUserId, setSendMessage, recieveMessage}) => {

  let dispatch = useDispatch();
  const {messages: chatMessages} = useSelector((state) => state?.chat);

  // fetching data for header
  // const {userData} = useSelector((state) => state?.auth)
  const [userData, setUserData] = useState({});
  const [messages, setMessages] = useState(chatMessages);
  const [currentChat, setCurrentChat] = useState({});
  const {chats} = useSelector((state) => state?.chat)
  const [newMessage, setNewMessage] = useState("");
  const [currentMessage, setCurrentMessage] = useState({});

  const scroll = useRef();



  const recieverId = chat?.members.find((member) => member?._id !== currentUserId);


  console.log(chatMessages, 'rrrrrrrrrrrrrooooooooooooooooo')
  // fetching data for messages
    useEffect(() => {
        dispatch(getMessages(chat?._id));
    }, [chat, currentUserId]);

    useEffect(() => {
        setMessages(chatMessages);      
        const userr = chat?.members?.find((user) => user?._id !== currentUserId);
        // dispatch(fetchUserData(userId));
        setUserData(userr);
        setMessages(chatMessages);
        console.log(messages, 'uyyyyyyyyyyyyyyyuuuuuuuuu');
    }, [chat, currentUserId]);

    

  // useEffect(() => {
  //   setCurrentChat(chat);
  // }, [])
  // recieve message from the socket server
  useEffect(() => {
    if (recieveMessage !== null && recieveMessage.chatId == chat?._id) {
      setMessages([...messages, recieveMessage]);
    }
  }, [recieveMessage])
  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  }




  useEffect(() => {
    const fetchMessages = async () => {
      const {data} = await API.get(`/messages/${chat?._id}`)
      setMessages(data);
    }
    fetchMessages();
  }, [chat])




  // always scroll to last message
  useEffect(() => {
    scroll.current.scrollIntoView({ behavior: "smooth", })
  }, [messages])
  // handleSend the message

  const handleSend = async (e) => {
    e?.preventDefault();
    const message = {
      senderId: currentUserId,
      text: newMessage,
      chatId: chat?._id,
    }
    setCurrentMessage(message)
    // send message to the database
    try {
      const {data} = dispatch(addMessage(message));
      setMessages([...messages, message])

      setNewMessage("");
    } catch(error) {
      console.log(error);
    }

    // send message to the socket server
    const recieverId = chat?.members.find((member) => member?._id !== currentUserId);
    setSendMessage({...message, recieverId});
  }
  return (
    <>
      <div className=' w-[100%] min-h-[85vh] ' >
        <div className=''>
          <div className='w-[100%] '>
            <div className='flex justify-start items-center gap-[1rem] w-[100%] relative p-[.4rem]'>
              <div className='ml-[.5rem]'>
                  <div className='online-dot'></div>
                  <img src={userData?.profilePicture ? 'http://localhost:5000/images/' + userData?.profilePicture : '/images/web3.jpg'} alt='followerImage' className='w-[50px] h-[50px] rounded-full object-cover' />
              </div>
              <div className='name text-[.8rem] flex flex-col '>
                  <span className='font-semibold text-[1.1rem] '>
                    {userData?.firstname} {userData?.lastname} </span>
                  <span>Online</span>
              </div>
            </div>
          </div>
        </div>

        <hr className='w-[85%] mx-auto border-[.1px] border-[#ececec]' />
        
          {/* chatBox Messages */}
        <div className='chat-body overflow-y-scroll h-[70vh] ' ref={scroll}>
          {
            messages?.map((message) => (
              <div className={message?.senderId === currentUserId ? "message own" : "message"} >
                <span>{message?.text}</span>
                <span>{format(message?.createdAt)}</span>
              </div>
            ))
          }
          {/* {
            currentMessage?.text ? (
              <div className={currentMessage?.senderId === currentUserId ? "message own" : "message"} >
                <span>{currentMessage?.text}</span>
                <span>{format(currentMessage?.createdAt)}</span>
              </div>
            )
             : <></>
          } */}
        </div>
        {/* chat input  */}
        <div className='chat-sender' >
          <div className='p-[1.5rem] flex items-center justify-center text-[1.2rem] h-[2rem]'>+</div>
          <InputEmoji value={newMessage} onChange={handleChange} />
          <button className='w-[5rem] h-[1.5rem] rounded-lg border-none outline-none cursor-pointer bg-blue-400 text-white ' onClick={handleSend}>
            Send
          </button>

        </div>
      </div>
      
    </>

  )
}

export default ChatBox;