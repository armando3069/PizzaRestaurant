import React,{useState,useContext} from 'react'
import { ShopContext } from "../context/shop-context";
import MenuItems from "../components/menuItems";
import bigO from "../styles/bigO.webp";

import "../styles/menu.css";
const PizzaMenu = () => {
    const { menuList } = useContext(ShopContext);
    const [CategoryPizza, setCategoryPizza] = useState("All");

    const FillterCategoryPizza =
    CategoryPizza === "All"
      ? menuList.filter(
          (item) => item.category === "Pizza" || item.category === "Calzone"
        )
      : menuList.filter((item) => item.category === CategoryPizza);
  
  return (
    <div className='menu-viewport'>
      <div className="menu">
      <div className="filter_container">
          <div className="filterBTN">
            <div className="container_Logo">
              <img src={bigO} className="bigO_logo" alt="" />
              <h1 className="category_title">Pizza</h1>
            </div>

            <div
              className={CategoryPizza === "All" ? "active" : "all"}
              onClick={() => setCategoryPizza("All")}
            >
              Toate Produsele
            </div>
            <div
              className={CategoryPizza === "Pizza" ? "active" : "all"}
              onClick={() => setCategoryPizza("Pizza")}
            >
              Pizza
            </div>
            <div
              className={CategoryPizza === "Calzone" ? "active" : "all"}
              onClick={() => setCategoryPizza("Calzone")}
            >
              Calzone
            </div>
          </div>
        </div>
      <div className="menuList">
      {FillterCategoryPizza.map((item, key) => {
                return (
                  <MenuItems
                    //notify={notify}
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
  )
}

export default PizzaMenu
