import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

function home() {

 

  return (
    <div className={"home"}>
      <div className={"header"}>
        <h1 className={"title"}> Fresh Pizza</h1>
        <p className={"text"}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry'
        </p>
        <Link to={"/menu"}>
          <button className={"btn"}>Order Now !</button>
        </Link>
      </div>
 
    </div>
  );
}

export default home;
