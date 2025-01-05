// shopReducer.js
import * as actionTypes from "./actionType";

const initialState = {
  menuList:  [],
  itemCart:  [],
  order: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.ADD_MENU:
      const itemExists = state.itemCart.find(
        (item) => item.id === action.payload
      );
      if (!itemExists) {
        return {
          ...state,
          itemCart: [...state.itemCart, { id: action.payload, quantity: 1 }],
        };
      } else {
        return {
          ...state,
          itemCart: state.itemCart.map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

    case actionTypes.REMOVE_MENU:
      return {
        ...state,
        itemCart: state.itemCart
          .map((item) =>
            item.id === action.payload && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };

    case actionTypes.REMOVE_ITEM:
      return {
        ...state,
        itemCart: state.itemCart.filter((item) => item.id !== action.payload),
      };

    case actionTypes.SET_MENU_LIST:
      return {
        ...state,
        menuList: action.payload,
      };

    case actionTypes.SET_ORDER:
      return {
        ...state,
        order: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
