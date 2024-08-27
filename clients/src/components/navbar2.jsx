import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "./log.svg";
import logo2 from "./log_02.svg";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdOutlineAccountCircle } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi"; // Iconul de hamburger
import { ShopContext } from "../context/shop-context";
import "../styles/nav2.css";

function Navbar1() {
  const { getTotalCartItem } = useContext(ShopContext);
  const totalItem = getTotalCartItem();
  const [color, setColor] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const changeColor = () => {
    if (window.scrollY >= 30) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const styleShop = {
    color: color ? "#fbb418" : "white",
  };
  const styleShop2 = {
    color: color ? "white" : "white",
  };

  window.addEventListener("scroll", changeColor);

  return (
    <div className={color ? "Viewport  bgColor_white" : "Viewport  bgColor"}>

    <div className={color ? "navbar sticky bgColor_white" : "navbar sticky bgColor"}>
      <div className="hamburger-menu" onClick={toggleMenu}>
        <GiHamburgerMenu />
      </div>
      <div className="leftSide">
        <Link to={"/"}>
          <img id="img_logo" src={color ? logo2 : logo} alt="logo" />
        </Link>
      </div>


      <div className={`rightSide ${isMenuOpen ? "open" : ""}`}>
        <Link
          className={color ? "navItem color_navItem_dark" : "navItem color_navItem_white"}
          to={"/"}
        >
          Menu
        </Link>

        <Link
          className={color ? "navItem color_navItem_dark" : "navItem color_navItem_white"}
          to={"/auth"}
        >
          <MdOutlineAccountCircle className="acount_nav" style={styleShop} />
        </Link>


      </div>
      <Link
          className={color ? "navItem color_navItem_dark" : "navItem color_navItem_white"}
          to={"/shop"}
        >
          <div className="shoping">
            <MdOutlineShoppingCart style={styleShop} className="acount_nav" />
            {totalItem ? (
              <div className="shop_item" style={styleShop2}>
                {totalItem}
              </div>
            ) : null}
          </div>
          
        </Link>
    </div>
    </div>
  );
}

export default Navbar1;