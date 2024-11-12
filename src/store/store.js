import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userSlice from "./user/userSlice";
import adminSlice from "./admin/adminSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import operatorSlice from "./operator/operatorSlice";
import vendingMachineSlice from "./vendingMachine/VendingMachineSlice";
import productSlice from "./product/productSlice";
import cardSlice from "./card/CardSlice";

const reducers = combineReducers({
  admin: adminSlice,
  user: userSlice,
  operator: operatorSlice,
  vendingMachine: vendingMachineSlice,
  product: productSlice,
  card: cardSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
