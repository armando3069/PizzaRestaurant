import React, { useState, useEffect, useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import MenuItems from "../../components/menuItems";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import { Link } from 'react-router-dom';

//import toast, { Toaster } from "react-hot-toast";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import bigO from "../../styles/bigO.webp";
import {responsive} from '../../helpers/utility' 

const Paste = () => {
    const { menuList } = useContext(ShopContext);
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
          <div className="filterBTN">
            <div className="container_Logo">
              <img src={bigO} className="bigO_logo" alt="" />
              <h1 className="category_title">Paste</h1>
            </div>
          </div>
          <div className="spreMeniu">
             <MdOutlineSubdirectoryArrowRight color="white" size={20}  />
          <Link to="/menu/paste" className="linkPizza"> 
            <p >spre meniu Paste</p>
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
            </Carousel>
          </div>
        ) : (
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
        )}
    </div>
  )
}

export default Paste
