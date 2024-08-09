import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Footer from './components/footer';


// Create a root and render the App component within BrowserRouter
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <div className="main-content">
        <App />
      </div>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);