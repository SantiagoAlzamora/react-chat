import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {getUserByEmail} from '../services/userService'
import { addUserConversation } from "../services/conversationService";

const Search = () => {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { data } = useContext(AuthContext);

  const handleSearch = async () => {
    try {
      
      const data = await getUserByEmail(email)
      setUser(data);
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    const body={
      senderId: data.user._id,
      receiverId:user._id
    }
    addUserConversation(body)
    setUser(null);
    setEmail("")
  };
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user by email"
          onKeyDown={handleKey}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.image} alt="" />
          <div className="userChatInfo">
            <span>{user.username}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
