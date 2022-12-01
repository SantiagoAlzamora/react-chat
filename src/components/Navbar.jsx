import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const {data,dispatch} = useContext(AuthContext)
  const navigate = useNavigate() 
  const logout = ()=>{
    dispatch({
      type:"LOGOUT",
    })
    navigate("/login")
  }

  return (
    <div className='navbar'>
      <span className="logo">React Chat</span>
      <div className="user">
        <img src={data.user?.image} alt="" />
        <span>{data.user?.username}</span>
        <button onClick={logout}>logout</button>
      </div>
    </div>
  )
}

export default Navbar
