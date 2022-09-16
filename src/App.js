import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./style.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
   
  const {data} = useContext(AuthContext)

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={
          data.user ? <Home /> : <Navigate to="/login" />
        }/>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
