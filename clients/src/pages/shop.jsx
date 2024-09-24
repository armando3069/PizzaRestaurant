import React, { useContext, useEffect, useState } from "react";
import "../styles/cart.css";
import { fetchMenuList } from "../helpers/menuList";

import { ShopContext } from "../context/shop-context";
import CartShop from "../components/cartShop";
import { useNavigate } from "react-router-dom";
import CheckoutPage from "./checkOutPage";
import Adresa from "../components/adresa/adresa";

const Shop = () => {
  const { itemCart, getTotalCartAmount, getTotalCartItem } =
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
            <img src="https://www.adasglobal.com/img/empty-cart.png" alt="" />
          ) : (
            <>
              <div className="container_shoping">
                {itemCart.map((item) => (
                  <CartShop key={item.id} {...item} menuList={menuList} />
                ))}
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
                        <div className="pil">
                          <input
                            type="checkbox"
                            checked="checked"
                            className="inputPoli"
                          />
                          <p className="paragPoli">
                            Accept acordul de utilizare. Politica de
                            confidențialitate
                          </p>
                        </div>
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
