import React, { useState, useContext } from "react";
import logo from "./log.svg";
import logo2 from "./log_02.svg";
import { Link } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";
import { ShopContext } from "../context/shop-context";
import { MdOutlineAccountCircle } from "react-icons/md";

import "../styles/nav.css";

function navbar1() {
  const { getTotalCartItem } = useContext(ShopContext);

  const totalItem = getTotalCartItem();

  const [color, setColor] = useState(false);

  const changeColor = () => {
    if (window.scrollY >= 30) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  const styleShop={
    color: color ? "#fbb418":"white",
    fontSize: "40px",
  }
  const styleShop2={
    color: color ? "white":"white",
  }

  window.addEventListener("scroll", changeColor);

  return (
    <div
      className={
        color ? "navbar sticky bgColor_white" : "navbar sticky bgColor"
      }
    >
      <div className="leftSide">
        <Link to={"/"}>
          <img id="img_logo" src={color ? logo2 : logo} alt="logo" />
        </Link>
      </div>

      <div className="rightSide">
        <Link
          className={
            color ? "navItem color_navItem_dark" : "navItem color_navItem_white"
          }
          to={"/"}
        >
          Menu
        </Link>
        <Link
          className={
            color ? "navItem color_navItem_dark" : "navItem color_navItem_white"
          }
          to={"/contact"}
        >
          Contact
        </Link>
      </div>
      <div className="rightSide">

        <Link
          className={
            color ? "navItem color_navItem_dark" : "navItem color_navItem_white"
          }
          to={"/shop"}
        >
          <div className="shoping">
          <MdOutlineShoppingCart style={styleShop}  />
          {totalItem ?(
          <div className="shop_item" style={styleShop2}  >
          {totalItem}
          </div>
          ):null}
          </div>
        </Link>
        <Link
          className={
            color ? "navItem color_navItem_dark" : "navItem color_navItem_white"
          }
          to={"/contact"}
        >
          <MdOutlineAccountCircle style={styleShop} />

        </Link>
      </div>
    </div>
  );
}

export default navbar1;
