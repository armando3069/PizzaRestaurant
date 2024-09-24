import React, { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";

import "./signin.css";

function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("UserID", data.id);

      alert("Autentificare reușită!");
      navigate("/account"); // Redirecționează utilizatorul la pagina principală
    } else {
      alert(data.message);
    }
  };

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     console.log('Tokenul există:', token);
  //     navigate('/account'); // Redirecționează utilizatorul dacă token-ul există
  //   }
  // }, [navigate]); // Asigură-te că `navigate` este adăugat ca dependență

  return (
    <div className="reg-main">
      <div className="right">
        <div className="data_form">
          <p className="main_text">Login account</p>
          <p className="main_text_desc">Or Login using email & password</p>
          <hr />
          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="">Username</label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" id="btn-reg">
              Login
            </button>
          </form>
          <p style={{color: "#5e5c5c"}}>
            You don't have an account ? !<Link to={'/auth/register'}>Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
