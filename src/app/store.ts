import {configureStore} from "@reduxjs/toolkit";

import {reducer as productsReducer} from "../features/productsSlice";
import {reducer as bannersReducer} from "../features/bannersSlice";
import {reducer as categoriesReducer} from "../features/categoriesSlice";
import {reducer as cartReducer} from "../features/cartSlice";
import {reducer as favoriteReducer} from "../features/favoriteSlice";
import {reducer as selectedProductReducer} from "../features/selectedProductSlice";

function loadState() {
  try {
    const serializedCart = localStorage.getItem("cart");
    const serializedFavorite = localStorage.getItem("favorite");
    const serializedSelectedProduct = localStorage.getItem("selectedProduct");

    const cart = serializedCart ? JSON.parse(serializedCart) : undefined;
    const favorite = serializedFavorite
      ? JSON.parse(serializedFavorite)
      : undefined;
    const selectedProduct = serializedSelectedProduct
      ? JSON.parse(serializedSelectedProduct)
      : undefined;

    return {
      cart,
      favorite,
      selectedProduct,
    };
  } catch (err) {
    return undefined;
  }
}

function saveState(state: RootState) {
  try {
    const serializedCart = JSON.stringify(state.cart);
    localStorage.setItem("cart", serializedCart);

    const serializedFavorite = JSON.stringify(state.favorite);
    localStorage.setItem("favorite", serializedFavorite);

    const serializedSelectedProduct = JSON.stringify(state.selectedProduct);
    localStorage.setItem("selectedProduct", serializedSelectedProduct);
  } catch (err) {
    console.log(err);
  }
}

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    banners: bannersReducer,
    products: productsReducer,
    categories: categoriesReducer,
    cart: cartReducer,
    favorite: favoriteReducer,
    selectedProduct: selectedProductReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
