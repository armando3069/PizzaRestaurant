import React, { useState, useEffect, useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import MenuItems from "../../components/menuItems";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

//import toast, { Toaster } from "react-hot-toast";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import bigO from "../../styles/bigO.webp";
import { responsive } from "../../helpers/utility";

const Pizza = () => {
  const { menuList } = useContext(ShopContext);
  const [CategoryPizza, setCategoryPizza] = useState("All");
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const FillterCategoryPizza =
    CategoryPizza === "All"
      ? menuList.filter(
          (item) => item.category === "Pizza" || item.category === "Calzone"
        )
      : menuList.filter((item) => item.category === CategoryPizza);

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div className="filter_container">
        <div className="filterBTN">
          <div className="container_Logo">
            <img src={bigO} className="bigO_logo" alt="" />
            <h1 className="category_title">Pizza</h1>
          </div>
          <div className="RemoveOption">
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
        <div className="spreMeniu">
          <MdOutlineSubdirectoryArrowRight color="white" size={20} />
          <Link to="/menu/pizza" className="linkPizza">
            <p>spre meniu Pizza</p>
          </Link>
        </div>
      </div>

      {windowDimensions.width > 767 ? (
        <div className="caru">
          <Carousel
            responsive={responsive}
            // autoPlay={true}
            swipeable={true}
            draggable={true}
            showDots={false}
            infinite={true}
            partialVisible={false}
            dotListClass="custom-dot-list-style"
          >
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
          </Carousel>
        </div>
      ) : (
        <div className="menuList">
          {FillterCategoryPizza.map((item, key) => {
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
      )}
    </div>
  );
};

export default Pizza;
