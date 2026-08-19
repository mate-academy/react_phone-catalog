import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import favouritesReducer from "./favouritesSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favourites: favouritesReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
