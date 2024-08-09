import React from "react";
import "../styles/contact.css";

function contact() {
  //              <textarea id="message" name="message" rows="4" cols="50"/>
  return (
    <div className="contact">
      <div className="lSide"></div>

      <div className="rSide">
        <h1 className="title">Contact Us</h1>

        <div className="forms">
          <input className="name" type="text" placeholder="Name..." />
          <div>
            <input className="email" type="email" placeholder="Email" />
          </div>
          <div>
            <textarea
              placeholder="message"
              className="message"
              name="message"
              rows="4"
              cols="50"
            />
          </div>
          <input className="buton" type="submit" value={"Send"} />
        </div>
      </div>
    </div>
  );
}

export default contact;
