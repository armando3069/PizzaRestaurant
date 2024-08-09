import React, { useState, useEffect, useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import MenuItems from "../menuItems";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
//import toast, { Toaster } from "react-hot-toast";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import bigO from "../../styles/bigO.webp";
import { responsive } from "../../helpers/utility";

const Bauturi = () => {
  const { menuList } = useContext(ShopContext);
  const [CategoryBauturi, setCategoryBauturi] = useState("All");

  const FillterCategoryBauturi =
    CategoryBauturi === "All"
      ? menuList.filter((item) => item.category === "Bauturi")
      : menuList.filter((item) => item.SubCategory === CategoryBauturi);

  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

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
        <div className="spreMeniuBauturi">
          <MdOutlineSubdirectoryArrowRight color="white" size={20} />
          <Link to="/menu/bauturi" className="linkPizza">
            <p>spre meniu Bauturi</p>
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
          </Carousel>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Bauturi;
