import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getUserChats } from "../services/conversationService";

const Chats = ({handleSelect}) => {
  const [chats, setChats] = useState([]);

  const { data } = useContext(AuthContext);


  useEffect(()=>{
    getUserChats(data.user._id)
    .then(data=>setChats(data))
  },[data.user._id])


  return (
    <div className="chats">
      {chats && Object.entries(chats).map((chat) => (
        <div
          className="userChat"
          key={chat[1]._id}
          onClick={() => handleSelect(data.user._id === chat[1].members[0]._id ? chat[1].members[1] : chat[1].members[0])}
        >
          <img src={data.user._id === chat[1].members[0]._id ? chat[1].members[1].image : chat[1].members[0].image} alt="" />
          <div className="userChatInfo">
            <span>{data.user._id === chat[1].members[0]._id ? chat[1].members[1].username : chat[1].members[0].username}</span>
            <p>{}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
