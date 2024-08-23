import React,{useState} from 'react'
import './signup.css'
const Signup = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const response = await fetch('http://localhost:3001/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
    
        const data = await response.json();
        alert(data.message);
      };
    

  return (
    <div className='signup'>
      <form className='form_signup' onSubmit={handleSubmit}>
      <h3>SignUp</h3>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Register</button>
    </form>
    </div>
  )
}

export default Signup