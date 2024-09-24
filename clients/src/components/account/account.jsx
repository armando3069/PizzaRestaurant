import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import "./account.css";
import Logout from '../auth/logout/logout';

const Account = () => {
  const [orders, setOrders] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token'); // Obține tokenul din localStorage

      if (!token) {
        console.error('Token lipsă');
        return;
      }

      try {
        const response = await fetch("http://localhost:3001/orders", {
          headers: {
            'Authorization': `Bearer ${token}`, // Trimite tokenul în header
          },
        });
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const formatDateTime = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return new Intl.DateTimeFormat("ro-RO", options).format(
      new Date(dateString)
    );
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <Link to={"/auth"}>
        <Logout />
      </Link>

      <h1>Istoria comenzilor</h1>
      {orders.map((order, index) => (
        <div key={order.OrderID} className="accordion">
          <div className="accordion-header" onClick={() => handleToggle(index)}>
            <h2>{formatDateTime(order.date)}</h2>
            <span>{order.TotalSum} MDL</span>
          </div>
          {openIndex === index && (
            <div className="accordion-content">
              <span>Comanda ID: {order.OrderID}</span>
              {order.items.map((item) => (
                <div key={item.name} className="accordion-item">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <div>
                      <strong>{item.name}</strong>
                    </div>
                    <div>Prețul: {item.price} MDL</div>
                    <div>Cantitatea: {item.quantity}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Account;