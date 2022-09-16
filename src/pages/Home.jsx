import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import  io  from 'socket.io-client'

const socket = io.connect("http://localhost:3001")

const Home = () => {

  const [currentChat, setCurrentChat] = useState(null)
  const { data } = useContext(AuthContext)

  useEffect(() => {
    if (currentChat) {
      socket.emit("joinRoom", currentChat._id)
    }
  },[currentChat])

  const handleSelect = async (user) => {
    const resConversation = await axios.get(`http://localhost:3001/api/conversations/${data.user._id}/${user._id}`)
    setCurrentChat(resConversation.data)
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