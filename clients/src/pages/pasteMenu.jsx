import React, { useState, useContext } from "react";
import { ShopContext } from "../context/shop-context";
import MenuItems from "../components/menuItems";
import bigO from "../styles/bigO.webp";


const PasteMenu = () => {
    const { menuList } = useContext(ShopContext);
    
  return (
    <div className="menu-viewport">
        <div className="menu">
        <div className="filter_container">
          <div className="filterBTN">
            <div className="container_Logo">
              <img src={bigO} className="bigO_logo" alt="" />
              <h1 className="category_title">Paste</h1>
            </div>
          </div>
        </div>

  
          <div className="menuList">
            {menuList
              .filter((item) => item.category === "Paste")
              .map((item, key) => {
                return (
                  <MenuItems
                    id={item.id}
                    key={key}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                    ingredients={item.ingredients}
                    //notify={notify}
                  />
                );
              })}
          </div>
          </div>
    </div>
  )
}

export default PasteMenu
