import React from "react";
import Message from "./Message";

const Messages = ({messages,currentChat}) => {

  return (
    <div className="messages">
      {messages && messages.map((m,i) => (
        <Message message={m} currentChat={currentChat} key={i} />
      ))}
    </div>
  );
};

export default Messages;
