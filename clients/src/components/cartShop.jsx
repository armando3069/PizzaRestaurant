import React, { useContext } from "react";
import { ShopContext } from "../context/shop-context";
import { IoCloseOutline } from "react-icons/io5";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";


const CartShop = ({id,menuList}) => {
  const { addMenu, removeMenu,getItemQuantity, removeItem } = useContext(ShopContext);

  const item = menuList.find(i => i.id === id)
  if (item == null) return null

  return (
    <div className="container_shop">
    <div className="cartItem">
      <img  className="image_shop" src={item.image} />
      <div className="description">
        <p className="text_name_shop">
          {item.name}
        </p>

        <div className="countHandler">
        <IoMdRemoveCircleOutline className="add_shop"  onClick={() => removeMenu(id)}/>

         <p className="item_shop">{getItemQuantity(id)}</p>
          <IoMdAddCircleOutline  className="remove_shop"  onClick={() => addMenu(id)} />
        </div>
        <p className="price_shop">{item.price * getItemQuantity(id)} lei</p>

        <IoCloseOutline
        className="close_shop"
          onClick={() => {
            removeItem(id);
          }}
        />
      </div>
    
    </div>
    <hr className="line" />
    </div>
  );
};

export default CartShop;
