import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import { AuthContext } from '../context/AuthContext'
import  io  from 'socket.io-client'
import { selectConversation } from '../services/conversationService'

const socket = io.connect("https://react-chat-api.onrender.com/")

const Home = () => {

  const [currentChat, setCurrentChat] = useState(null)
  const { data } = useContext(AuthContext)

  useEffect(() => {
    if (currentChat) {
      socket.emit("joinRoom", currentChat._id)
    }
  },[currentChat])

  const handleSelect = async (user) => {
    setCurrentChat(await selectConversation(data.user._id,user._id))
  }

  return (
    <div className='home'>
      <div className="container">
        <Sidebar handleSelect={handleSelect} />
        <Chat currentChat={currentChat} socket={socket}/>
      </div>
    </div>
  )
}

export default Home