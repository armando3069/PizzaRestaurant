import React,{useState} from 'react'
import { Link } from "react-router-dom";

import './signup.css'
const Signup = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const response = await fetch('http://localhost:3001/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username,email,password }),
        });
    
        const data = await response.json();
        alert(data.message);
      };
    

  return (
    <div className="reg-main">
      <div className="right">
        <div className="data_form">
          <p className="main_text">Register account</p>
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
              <label htmlFor="">Email</label>
            <input
              type="text"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              Register
            </button>
          </form>
          <p style={{color: "#5e5c5c"}}>
            You  have an account ? <Link to={'/auth/login'}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup