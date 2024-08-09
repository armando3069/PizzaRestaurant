import React, { useState } from 'react';
import  '../App.css';
function navbar() {
  const [toggle,setToggle] = useState(false);
  return(
   <div className='navbar'>

  <div className="leftSide">
    <div className="links" id={toggle ? 'hidden' : "" }>
   <a href="#id">Home</a>
   <a href="#id">News</a>
   <a href="#id">Feed</a>
   <a href="#id">Projects{toggle}</a>
   </div>
   <button  id='btn' onClick={()=>setToggle(!toggle)} >open</button>

  </div>

  <div className="rightSide"> 
   <input placeholder='Search...' className='input' type="text" />
   <button>push</button>
  </div>
  
  </div>
  )}

export default navbar;
