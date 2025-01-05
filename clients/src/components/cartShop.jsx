import  { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";

//redux actions
import { useSelector, useDispatch } from "react-redux";
import { addMenu, removeMenu, removeItem } from "../redux/action";

const CartShop = ({ id }) => {
  const dispatch = useDispatch();
  const [modalIngredient, setModalIngredient] = useState(false);

  const itemCart = useSelector((state) => state.itemCart);
  const  menuList  = useSelector((state) => state.menuList);


  const item = menuList.find((i) => i.id === id);
  if (item == null) return null;

  const addItem = (id) => {
    dispatch(addMenu(id));
  };
  const removeItems = (id) => {
    dispatch(removeMenu(id));
  };

  const removeItemAll = (id) => {
    dispatch(removeItem(id));
  };

  function getItemQuantity(id) {
    return itemCart.find((item) => item.id === id)?.quantity || 0;
  }

  return (
    <div className="container_shop">
      <div className="cartItem">
        <img className="image_shop" src={item.image} />
        <div className="description">
          <p className="text_name_shop">{item.name}</p>

          <div className="countHandler">
            <IoMdRemoveCircleOutline
              className="add_shop"
              onClick={() => removeItems(id)}
            />

            <p className="item_shop">{getItemQuantity(id)}</p>
            <IoMdAddCircleOutline
              className="remove_shop"
              onClick={() => addItem(id)}
            />
          </div>
          <p className="price_shop">{item.price * getItemQuantity(id)} lei</p>

          <IoCloseOutline
            className="close_shop"
            onClick={() => {
              removeItemAll(id);
            }}
          />
        </div>
      </div>
      <hr className="line" />
    </div>
  );
};

export default CartShop;
