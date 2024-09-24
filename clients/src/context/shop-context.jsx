import React, { createContext, useState, useEffect } from "react";
import { fetchMenuList } from '../helpers/menuList';
import { useLocalStorage } from "../hooks/useLocalStorage";

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
  const [menuList, setMenuList] = useState([]);
  const [order,setOrder] = useState({});
  const [itemCart, setItemCart] = useLocalStorage("shopping-cart", []);

  useEffect(() => {
    const getMenuList = async () => {
      const data = await fetchMenuList();
      setMenuList(data);
    };

    getMenuList();
  }, []);

  const cartQuantity = itemCart.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  function getItemQuantity(id) {
    return itemCart.find(item => item.id === id)?.quantity || 0;
  }

  function addMenu(id) {
    setItemCart(currItems => {
      if (currItems.find(item => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeMenu(id) {
    setItemCart(currItems => {
      if (currItems.find(item => item.id === id)?.quantity === 1) {
        return currItems.filter(item => item.id !== id);
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeItem(id) {
    setItemCart(currItems => {
      return currItems.filter(item => item.id !== id);
    });
  }

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    itemCart.forEach(item => {
      const infoItem = menuList.find(product => product.id === item.id);
      if (infoItem) {
        totalAmount += item.quantity * infoItem.price;
      }
    });
    return totalAmount;
  };

  const getTotalCartItem = () => {
    let totalItem = 0;
    itemCart.forEach(item => {
      totalItem += item.quantity;
    });
    return totalItem;
  };

  const contextValue = {
    itemCart,
    addMenu,
    removeMenu,
    getTotalCartAmount,
    getTotalCartItem,
    getItemQuantity,
    removeItem,
    menuList,
    cartQuantity,
    setOrder,
    order
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};