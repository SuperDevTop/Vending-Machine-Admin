import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userSlice from "./user/userSlice";
import getReadySlice from "./get-ready/getReadySlice";
import listingSlice from "./listing/listingSlice";
import chatSlice from "./chat/chatSlice";

const reducers = combineReducers({
  user: userSlice,
  getReady:getReadySlice,
  listing:listingSlice,
 chat :chatSlice
});

const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
