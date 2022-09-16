import React, { useContext, useEffect, useState } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Chat = ({ currentChat, socket }) => {

  const [messages, setMessages] = useState(null);
  const { data } = useContext(AuthContext)

  useEffect(() => {
    if (currentChat) {
      const getConversationMessages = async () => {
        const res = await axios.get(`http://localhost:3001/api/messages/${currentChat._id}`)
        setMessages(res.data)
      }

      getConversationMessages()
    }

  }, [currentChat])

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages((messages) => [...messages, data])
    })
  }, [socket])

  const addMessage = async (message) => {
    const newMessage = {
      conversationId: currentChat._id,
      sender: data.user._id,
      text: message
    }
    const res = await axios.post(`http://localhost:3001/api/messages/`, newMessage, {
      headers: {
        'Content-type': "application/json"
      }
    })
    await socket.emit("sendMessage", res.data)
    setMessages([...messages, res.data])
  }

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{currentChat && data.user._id === currentChat?.members[0]._id ? currentChat?.members[1].username : currentChat?.members[0].username}</span>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages messages={messages} currentChat={currentChat} />
      <Input addMessage={addMessage} />
    </div>
  );
};

export default Chat;
