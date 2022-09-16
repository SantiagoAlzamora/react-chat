import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import {AuthContext} from '../context/AuthContext'

const Login = () => {
  const [err, setErr] = useState(false);
  const {dispatch} = useContext(AuthContext)
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    
    try {
      const res = await axios.post("http://localhost:3001/api/users/login",{
        email,
        password
      })
      dispatch({
        type:"LOGIN",
        payload:res.data
      })
      navigate('/')
    } catch (err) {
      setErr(true);
      setTimeout(()=>{
        setErr(false)
      },5000)
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Lama Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Sign in</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>You don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
