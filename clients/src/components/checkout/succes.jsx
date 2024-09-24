import React, { useEffect,useContext } from "react";
//import { ShopContext } from "../../context/shop-context";
//const {order} = useContext(ShopContext);

const Succes = () => {
  useEffect(() => {
    const processOrder = async () => {
      const token = localStorage.getItem("token"); // Asigură-te că token-ul este stocat corect

      try {
        // Apelează endpoint-ul pentru a crea o comandă
        const orderResponse = await fetch("http://localhost:3001/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Adaugă token-ul de autentificare
          },
          body: JSON.stringify(order), // Asigură-te că order este definit sau obținut dintr-o sursă
        });

        if (!orderResponse.ok) {
          throw new Error("Order creation failed");
        }

        const orderData = await orderResponse.json();
        console.log("Order response:", orderData);

        // Poți adăuga redirecționare sau un mesaj de succes aici
        alert("Comanda a fost plasată cu succes!");
      } catch (error) {
        console.error("Error:", error);
        alert(
          "A apărut o eroare la plasarea comenzii. Te rugăm să încerci din nou."
        );
      }
    };

    processOrder();
  }, []); // [] asigură că useEffect se execută doar o singură dată la montarea componentului

  return (
    <div>
      <h1>Success</h1>
      <p>Procesăm comanda dvs. Acest lucru poate dura câteva momente...</p>
    </div>
  );
};

export default Succes;
