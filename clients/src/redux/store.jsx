import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducer from "./reducer";

// Configurare pentru redux-persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["itemCart", "menuList"],
};

// Creează un reducer persistat
const persistedReducer = persistReducer(persistConfig, reducer);

// Creează store-ul cu reducer-ul persistat
const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(store);

export default store;
