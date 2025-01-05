import React, { useState } from "react";
import "../styles/menu.css";
import { MdOutlineShoppingBag } from "react-icons/md";
import { RiInformationLine } from "react-icons/ri";
import { AiOutlineCloseCircle } from "react-icons/ai";

//redux actions
import { useSelector, useDispatch } from "react-redux";
import { addMenu } from "../redux/action";

function MenuItem({ id, name, image, price, ingredients }) {

  const dispatch = useDispatch();
  const itemCart  = useSelector(state => state.itemCart);

  const [modalIngredient, setModalIngredient] = useState(false);

  const addItem = (id) => {
    dispatch(addMenu(id));
  };

  function getItemQuantity(id) {
    return itemCart.find((item) => item.id === id)?.quantity || 0;
  }

  const quantity = getItemQuantity(id);

  return (
    <div className="container">
      <img id="img_menu" src={image} alt="" />
      <div className="desc_menu">
        <div className="info_menu">
          <h1 className="title_menu">{name}</h1>
          <RiInformationLine
            className="info"
            size={20}
            onClick={() => setModalIngredient((prev) => !prev)}
          />
        </div>
        <div className="grams_containers">
          <span className="grams_menu">670g</span>
        </div>
        <div className="price_box">
          <div className="price_container">
            <p className="price_menu">{price}</p>
            <span className="currency_menu">MDL</span>
          </div>

          <div className="shop_menu">
            <div className="bg_logo">
              <MdOutlineShoppingBag
                onClick={() => {
                  addItem(id);
                }}
                className="logo"
                color="white"
              />
            </div>

            <div className="amount_menu">{quantity}</div>
          </div>
        </div>
      </div>
      {modalIngredient ? (
        <div className="modal_menu">
          <AiOutlineCloseCircle
            className="close_modal"
            onClick={() => setModalIngredient(false)}
            size={20}
          />
          {ingredients}
        </div>
      ) : null}
    </div>
  );
}

export default MenuItem;
