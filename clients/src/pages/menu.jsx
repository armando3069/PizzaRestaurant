import React from "react";
import "../styles/menu.css";

import Panel from "../components/panel/panel";
import Pizza from "../components/pizzaCategory/pizza";
import Paste from "../components/pasteCategory/paste";
import Salate from "../components/salateCategory/salate";
import Bauturi from "../components/bauturiCategory/bauturi";

function Menu() {
  return (
    <div className="menu-viewport">
      <div className="menu">
        <Panel/>
        <Pizza />
        <hr style={{ margin: "50px" }} />
        <Paste />
        <hr style={{ margin: "50px" }} />
        <Salate />
        <hr style={{ margin: "50px" }} />
        <Bauturi />

      </div>
    </div>
  );
}

export default Menu;
