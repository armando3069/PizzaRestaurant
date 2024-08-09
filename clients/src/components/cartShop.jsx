import React, { useContext } from "react";
import { ShopContext } from "../context/shop-context";
import { IoCloseOutline } from "react-icons/io5";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";



const CartShop = ({ id, name, image, price }) => {
  const { addMenu, removeMenu, itemCart, removeItem } = useContext(ShopContext);

  return (
    <div className="container_shop">
    <div className="cartItem">
      <img  className="image_shop" src={image} />
      <div className="description">
        <p className="text_name_shop">
          {name}
        </p>

        <div className="countHandler">
        <IoMdRemoveCircleOutline className="add_shop"  onClick={() => removeMenu(id)}/>
          {/* <input
          className="input_shop" 
            value={itemCart[id]}
            onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
          />
         */}
         <p className="item_shop">{itemCart[id]}</p>
          <IoMdAddCircleOutline  className="remove_shop"  onClick={() => addMenu(id)} />
        </div>
        <p className="price_shop">{price * itemCart[id]} lei</p>

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
