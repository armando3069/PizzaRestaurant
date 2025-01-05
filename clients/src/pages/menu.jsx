import React, { useMemo,useEffect } from "react";
import "../styles/menu.css";

import Panel from "../components/panel/panel";
import Pizza from "../components/pizzaCategory/pizza";
import Paste from "../components/pasteCategory/paste";
import Salate from "../components/salateCategory/salate";
import Bauturi from "../components/bauturiCategory/bauturi";

import { fetchMenuList } from "../helpers/menuList";
import { useDispatch } from "react-redux";
import { setMenuList } from "../redux/action";

function Menu() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getMenuList = async () => {
      const data = await fetchMenuList();
      dispatch(setMenuList(data));
    };

    getMenuList();
  }, [dispatch]);

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
