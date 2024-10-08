import React from "react";
import { Route, Routes } from "react-router-dom"; // Folosește Routes în loc de Switch
import Navbar from "./components/navbar2";
import Footer from "./components/footer";
import Menu from "./pages/menu";
import Contact from "./pages/contact";
import NotFound from "./pages/404";
import Shop from "./pages/shop";
import CheckoutPage from "./pages/checkOutPage";
import Succes from "./components/checkout/succes";
import Cancel from "./components/checkout/cancel";
import PizzaMenu from "./pages/pizzaMenu";
import PasteMenu from "./pages/pasteMenu";
import BauturiMenu from "./pages/bauturiMenu";
import SalateMenu from "./pages/salateMenu";
import { ShopContextProvider } from "./context/shop-context";
import "./App.css";
import Signup from './components/auth/signup/signup';
import Signin from "./components/auth/signin/signin";
import Auth from "./components/auth/auth";
import Account from './components/account/account';

function App() {
  return (
    <div className="App">
      <ShopContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/account" element={<Account />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/auth/register" element={<Signup />} />
          <Route path="/auth/login" element={<Signin />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/success" element={<Succes />} />
          <Route path="/menu/pizza" element={<PizzaMenu />} />
          <Route path="/menu/paste" element={<PasteMenu />} />
          <Route path="/menu/bauturi" element={<BauturiMenu />} />
          <Route path="/menu/salate" element={<SalateMenu />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ShopContextProvider>
    </div>
  );
}

export default App;