import React, { useContext, useEffect, useState } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { AuthContext } from "../context/AuthContext";
import { getConversationMessages, saveMessage } from "../services/messageService";

const Chat = ({ currentChat, socket }) => {

  const [messages, setMessages] = useState(null);
  const { data } = useContext(AuthContext)

  useEffect(() => {
    if (currentChat) {
      getConversationMessages(currentChat._id)
      .then(data=>setMessages(data))
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
    const res = await saveMessage(newMessage)
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
