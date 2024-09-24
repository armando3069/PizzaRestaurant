// CheckoutForm.jsx
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
const stripePromise = loadStripe('pk_test_51PfPyVIvcgr2PatmhGNhIcspQsiCVJawyrNUoxt0Rn83zLj9OGY362d2cArhEOJFVNCdLDGFWN0I128TYapYqkyP00i6flbPhb');

const CheckoutForm = ({ items}) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const token = localStorage.getItem("token"); // Asigură-te că token-ul este stocat corect
  
    try {
 // Apelează endpoint-ul pentru a crea o sesiune de checkout
      const checkoutResponse = await fetch('http://localhost:3001/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });

      // Verifică dacă răspunsul este OK
      if (!checkoutResponse.ok) {
        throw new Error('Network response was not ok');
      }

      const session = await checkoutResponse.json();
      console.log('Checkout session response:', session); // Debugging

      if (session.url) {
        window.location.href = session.url;
      } else {
        console.error('Failed to create checkout session');
      }
    }catch (error) {
      console.error('Error:', error);
      alert('A apărut o eroare la payment comenzii. Te rugăm să încerci din nou.');
    }
  };

  return (
    <>
      <button onClick={handleSubmit} type="submit">Comanda</button>
    </>
  );
};

const Checkout = ({ items}) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm items={items} />
  </Elements>
);

export default Checkout;