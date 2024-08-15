import React, { useMemo } from "react";
import "../styles/menu.css";

import Panel from "../components/panel/panel";
import Pizza from "../components/pizzaCategory/pizza";
import Paste from "../components/pasteCategory/paste";
import Salate from "../components/salateCategory/salate";
import Bauturi from "../components/bauturiCategory/bauturi";

function Menu() {
  const memoizedPanel = useMemo(() => <Panel />, []);
  const memoizedPizza = useMemo(() => <Pizza />, []);
  const memoizedPaste = useMemo(() => <Paste />, []);
  const memoizedSalate = useMemo(() => <Salate />, []);
  const memoizedBauturi = useMemo(() => <Bauturi />, []);

  return (
    <div className="menu-viewport">
      <div className="menu">
        {memoizedPanel}
        {memoizedPizza}
        <hr style={{ margin: "50px" }} />
        {memoizedPaste}
        <hr style={{ margin: "50px" }} />
        {memoizedSalate}
        <hr style={{ margin: "50px" }} />
        {memoizedBauturi}
      </div>
    </div>
  );
}

export default Menu;