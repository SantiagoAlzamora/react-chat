import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Chats = ({handleSelect}) => {
  const [chats, setChats] = useState([]);

  const { data } = useContext(AuthContext);


  useEffect(()=>{
    const getUserChats = async ()=>{
      try {
        const res = await axios.get(`https://santi-react-chat.herokuapp.com/api/conversations/${data.user._id}`)
        setChats(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    getUserChats()
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
