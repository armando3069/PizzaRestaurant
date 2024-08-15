import React, { createContext, useState, useEffect } from "react";
import { fetchMenuList } from '../helpers/menuList';

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
  const [menuList, setMenuList] = useState([]);
  const [itemCart, setItemCart] = useState({});

  useEffect(() => {
    const getMenuList = async () => {
      const data = await fetchMenuList();
      setMenuList(data);
    };

    getMenuList();
  }, []);

  useEffect(() => {
    const getDefaultCart = () => {

      let cart = {};
      for (let i = 1; i <= menuList.length; i++) {
        cart[i] = 0;
      }
      return cart;
    };

    setItemCart(getDefaultCart());
  }, [menuList]);

  useEffect(() => {
    localStorage.setItem('itemCart', JSON.stringify(itemCart));
  }, [itemCart]);


  const addMenu = (itemID) => {
    setItemCart((prev) => ({
      ...prev,
      [itemID]: (prev[itemID] || 0) + 1,
    }));
  };

  const removeMenu = (itemID) => {
    setItemCart((prev) => ({
      ...prev,
      [itemID]: (prev[itemID] || 0) - 1,
    }));
  };

  const removeItem = (itemID) => {
    setItemCart((prev) => ({
      ...prev,
      [itemID]: 0,
    }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in itemCart) {
      if (itemCart[item] > 0) {
        const infoItem = menuList.find((product) => product.id === Number(item));
        if (infoItem) {
          totalAmount += itemCart[item] * infoItem.price;
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItem = () => {
    let totalItem = 0;
    for (const item in itemCart) {
      if (itemCart[item] > 0) {
        totalItem += itemCart[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    itemCart,
    addMenu,
    removeMenu,
    getTotalCartAmount,
    getTotalCartItem,
    removeItem,
    menuList,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};