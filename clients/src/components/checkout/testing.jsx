import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51PfPyVIvcgr2PatmhGNhIcspQsiCVJawyrNUoxt0Rn83zLj9OGY362d2cArhEOJFVNCdLDGFWN0I128TYapYqkyP00i6flbPhb'); // Înlocuiește cu cheia ta publică Stripe

const CheckoutForm = ({ items,order }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
 
      // Apelează endpoint-ul pentru a crea o sesiune de checkout
      // const checkoutResponse = await fetch('http://localhost:3001/create-checkout-session', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ items }),
      // });

      // // Verifică dacă răspunsul este OK
      // if (!checkoutResponse.ok) {
      //   throw new Error('Network response was not ok');
      // }

      // const session = await checkoutResponse.json();
      // console.log('Checkout session response:', session); // Debugging

      // if (session.url) {
      //   window.location.href = session.url;
      // } else {
      //   console.error('Failed to create checkout session');
      // }

        // Apelează endpoint-ul pentru a crea o comandă
  
        const orderResponse = await fetch('http://localhost:3001/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Adaugă token-ul de autentificare
          },
          body: JSON.stringify(order),
        });
    
        if (!orderResponse.ok) {
          throw new Error('Order creation failed');
        }
    
        const orderData = await orderResponse.json();
        console.log('Order response:', orderData);
    
        // Poți adăuga redirecționare sau un mesaj de succes aici
        alert('Comanda a fost plasată cu succes!');
      } catch (error) {
        console.error('Error:', error);
        alert('A apărut o eroare la plasarea comenzii. Te rugăm să încerci din nou.');
      }
  };

  return (
    <>
      <button onClick={handleSubmit} type="submit">Comanda</button>
    </>
  );
};

const Checkout = ({ items,order }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm items={items} order={order} />
  </Elements>
);

export default Checkout;