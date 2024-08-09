// CheckoutPage.jsx
import React, { useContext } from 'react';
import { ShopContext } from '../context/shop-context';
import Checkout from '../components/checkout/checkoutForm';

const CheckoutPage = ({dataItem}) => {
  const { itemCart, menuList } = useContext(ShopContext);
  const {oras,strada,bloc,apartament,scara,etaj} = dataItem;
   
  const cartItems = menuList
    .filter(item => itemCart[item.id] > 0)
    .map(item => ({
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: itemCart[item.id],
    }));
    const newOrder ={ "Oras":oras,"Strada":strada,"Bloc":bloc,"Apt": apartament ,"Scara":scara,"Etajul":etaj,"Data":new Date(), ...cartItems,}

  return (
    <>
      <Checkout items={cartItems} order={newOrder} />
    </>
  );
};

export default CheckoutPage;