import * as actionTypes from "./actionType";

export const addMenu = (id) => ({
  type: actionTypes.ADD_MENU,
  payload: id,
});

export const removeMenu = (id) => ({
  type: actionTypes.REMOVE_MENU,
  payload: id,
});

export const removeItem = (id) => ({
  type: actionTypes.REMOVE_ITEM,
  payload: id,
});

export const setMenuList = (menuList) => ({
  type: actionTypes.SET_MENU_LIST,
  payload: menuList,
});

export const setOrder = (order) => ({
  type: actionTypes.SET_ORDER,
  payload: order,
});
