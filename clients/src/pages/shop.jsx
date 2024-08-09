import React, { useContext, useEffect, useState } from "react";
import "../styles/cart.css";
import { fetchMenuList } from "../helpers/menuList";

import { ShopContext } from "../context/shop-context";
import CartShop from "../components/cartShop";
import { useNavigate } from "react-router-dom";
import CheckoutPage from "./checkOutPage";
import Adresa from "../components/adresa/adresa";

const Shop = () => {
  const { itemCart, MenuList, getTotalCartAmount, getTotalCartItem } =
    useContext(ShopContext);

  const [menuList, setMenuList] = useState([]);
  const [dataItem, setDataItem] = useState({});

  const totalAmount = getTotalCartAmount();
  const totalItem = getTotalCartItem();
  const navigate = useNavigate();

  useEffect(() => {
    const getMenuList = async () => {
      const data = await fetchMenuList();
      setMenuList(data);
    };

    getMenuList();
  }, []);

  const handleDataItemChange = (newDataItem) => {
    setDataItem(newDataItem);
  };

  // const cartsItems = MenuList?.filter((item) => itemCart[item.id] > 0).map(
  //   (item) => ({
  //     name: item.name,
  //     image: item.image,
  //     price: item.price,
  //     quantity: itemCart[item.id],
  //   })
  // );

  const isCartEmpty = Object.values(itemCart).every((count) => count === 0);

  return (
    <div className="cart-viewport_shop">
      <div className="cart_shop">
        <div className="payload">
          {isCartEmpty ? (
            <h1>Your Cart is empty</h1>
          ) : (
            <>
              <div className="container_shoping">
                {menuList.map((item, key) => {
                  if (itemCart[item.id] !== 0) {
                    return (
                      <CartShop
                        id={item.id}
                        key={item.id}
                        image={item.image}
                        name={item.name}
                        price={item.price}
                        ingredients={item.ingredients}
                      />
                    );
                  }
                  return null;
                })}
              </div>
              <Adresa onChange={handleDataItemChange} />

              <div className="couting">
                {totalAmount > 0 && (
                  <div className="checkout">
                    <div className="subtotoal">
                      <p>Subtotal</p>
                      <p>{totalAmount} lei</p>
                    </div>
                    <div className="subtotoal">
                      <p>Livrare</p>
                      <p>{30} lei</p>
                    </div>
                    <div className="subtotoal">
                      <h3 className="total_price">Total</h3>
                      <h3 className="total_price">{totalAmount + 30} lei</h3>
                    </div>
                    <div className="policy">
                      <div className="politica_shop">
                        <input type="checkbox" checked="checked" />
                        <p>
                          Accept acordul de utilizare. Politica de
                          confidențialitate
                        </p>
                      </div>
                      <CheckoutPage dataItem={dataItem} />
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
