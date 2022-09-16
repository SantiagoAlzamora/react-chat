import React from "react";
import Navbar from "./Navbar"
import Search from "./Search"
import Chats from "./Chats"

const Sidebar = ({handleSelect}) => {
  return (
    <div className="sidebar">
      <Navbar />
      <Search/>
      <Chats handleSelect={handleSelect}/>
    </div>
  );
};

export default Sidebar;
