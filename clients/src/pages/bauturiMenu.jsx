import React, { useState, useContext } from "react";
import { ShopContext } from "../context/shop-context";
import MenuItems from "../components/menuItems";
import bigO from "../styles/bigO.webp";
import "../styles/bauturi.css"

const BauturiMenu = () => {
  const { menuList } = useContext(ShopContext);
  const [CategoryBauturi, setCategoryBauturi] = useState("All");

  const FillterCategoryBauturi =
    CategoryBauturi === "All"
      ? menuList.filter((item) => item.category === "Bauturi")
      : menuList.filter((item) => item.SubCategory === CategoryBauturi);

  return (
    <div className="menu-viewport">
      <div className="menu">
        <div style={{ margin: "20px" }}></div>
        <div className="filter_container">

          <div className="filterBTN_bauturi">

            <div className="container_Logo">
              <img src={bigO} className="bigO_logo" alt="" />
              <h1 className="category_title">Bauturi</h1>
            </div>


            <div className="RemoveOption">
                <div
                  className={CategoryBauturi === "All" ? "active" : "all"}
                  onClick={() => setCategoryBauturi("All")}
                >
                  Toate Produsele
                </div>

                <div
                  className={CategoryBauturi === "Fierbinti" ? "active" : "all"}
                  onClick={() => setCategoryBauturi("Fierbinti")}
                >
                  Fierbiniți
                </div>

                <div
                  className={CategoryBauturi === "Racoritoare" ? "active" : "all"}
                  onClick={() => setCategoryBauturi("Racoritoare")}
                >
                  Racoritoare
                </div>

                <div
                  className={CategoryBauturi === "Bere" ? "active" : "all"}
                  onClick={() => setCategoryBauturi("Bere")}
                >
                  Bere
                </div>
             </div>

          </div>

 
        </div>

        <div className="menuList">
          {FillterCategoryBauturi.map((item, key) => {
            return (
              <MenuItems
                id={item.id}
                key={key}
                image={item.image}
                name={item.name}
                price={item.price}
                ingredients={item.ingredients}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BauturiMenu;
