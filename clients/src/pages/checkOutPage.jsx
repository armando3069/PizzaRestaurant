import  { useContext } from "react";
import { ShopContext } from "../context/shop-context";
import Checkout from "../components/checkout/checkoutForm";
import { useDispatch, useSelector } from "react-redux";

const CheckoutPage = ({ dataItem }) => {
  const { itemCart, menuList} = useContext(ShopContext);
//  const { itemCart, menuList, cartQuantity, order } = useSelector(state => state);

  const { oras, strada, bloc, apartament, scara, etaj } = dataItem;

  const cartItems = itemCart
    .map((cartItem) => {
      const item = menuList.find((menuItem) => menuItem.id === cartItem.id);
      if (item) {
        return {
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: cartItem.quantity, // Utilizează cantitatea din cartItem
        };
      } else {
        return null;
      }
    })
    .filter((item) => item !== null);

  const cartItemsOrder = cartItems.map((cartItem) => ({
    ...cartItem,
    sum: cartItem.price * cartItem.quantity, // Calculează suma pentru fiecare element
  }));

  const totalSum = cartItemsOrder.reduce((acc, item) => acc + item.sum, 0);
  const UserID = localStorage.getItem("UserID");
 
  const order = {
    UserID: UserID,
    address: {
      oras,
      strada,
      bloc,
      apartament,
      scara,
      etaj,
    },
    items: cartItemsOrder,
    TotalSum: totalSum,
    date: new Date(),
  };
 
  return (
    <>
      <Checkout items={cartItems}  />
    </>
  );
};

export default CheckoutPage;
