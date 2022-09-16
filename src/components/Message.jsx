import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";

const Message = ({ message, currentChat }) => {
  const { data } = useContext(AuthContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);


  return (
    <div
      ref={ref}
      className={`message ${message.sender === data.user._id && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.sender === currentChat.members[0]._id ? currentChat?.members[0].image : currentChat?.members[1].image
          }
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        {message.text && <p>{message.text}</p>}
        {/* {message.img && <img src={message.img} alt="" />} */}
      </div>
    </div>
  );
};

export default Message;
