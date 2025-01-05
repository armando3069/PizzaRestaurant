import React from "react";
import MenuItems from "../components/menuItems";
import bigO from "../styles/bigO.webp";
import { useSelector } from "react-redux";

const SalateMenu = () => {
  const menuList = useSelector((state) => state.menuList);

  return (
    <div className="menu-viewport">
      <div className="menu">
        <div className="filter_container">
          <div className="filterBTN">
            <div className="container_Logo">
              <img src={bigO} className="bigO_logo" alt="" />
              <h1 className="category_title">Salate</h1>
            </div>
          </div>
        </div>

        <div className="menuList">
          {menuList
            .filter((item) => item.category === "Salate")
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
  );
};

export default SalateMenu;
