import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const imageURL = await getImageUrl(file)

      await axios.post("http://localhost:3001/api/users/register", {
        username: displayName,
        email,
        password,
        image: imageURL
      }, config)
      navigate("/login")
    } catch (error) {
      setErr(true)
      setTimeout(()=>{
        setErr(false)
      },5000)
    }
  }

  const getImageUrl = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "santi-preset");
    data.append("cloud_name", "santicloud");


    const res = await fetch("https://api.cloudinary.com/v1_1/santicloud/image/upload",
      {
        method: "post",
        body: data,
      })
    const resultado = await res.json()
    return resultado.secure_url
  }


  return (
    <div className="formContainer">

      <div className="formWrapper">
        <span className="logo">Lama Chat</span>
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




//import { storage } from "../firebase";
//import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

//try {

    //  const storageRef = ref(storage, displayName);

    //  const uploadTask = uploadBytesResumable(storageRef, file);

    //   uploadTask.on((error) => { setErr(true); }, () => {
    //     getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
    //       const image = downloadURL
    //       const user = await axios.post("http://localhost:3001/api/users/register", {
    //         username: displayName,
    //         email,
    //         password,
    //         image
    //       }, config)
    //       console.log(user)
    //     });
    //   }
    //   );
    // } catch (err) {
    //   console.log(err)
    //}
  //}