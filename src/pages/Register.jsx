import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { useNavigate, Link } from "react-router-dom";
import { getImageUrl } from "../services/ImageService";
import { registerUser } from "../services/userService";

const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    try {
      const imageURL = await getImageUrl(file)

      await registerUser({
        username: displayName,
        email,
        password,
        image: imageURL
      })
      navigate("/login")
    } catch (error) {
      setErr(true)
      setTimeout(() => {
        setErr(false)
      }, 5000)
    }
  }



  return (
    <div className="formContainer">

      <div className="formWrapper">
        <span className="logo">React Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="display name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input hidden type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button>Sign up</button>
          {err && <span style={{ color: "red" }}>Something went wrong!</span>}
        </form>
        <p>You do have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};
export default Register;
