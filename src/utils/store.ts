import { configureStore } from "@reduxjs/toolkit";
import phonesReducer from "../features/phones";
import tabletsReducer from "../features/tablets";
import accessoriesReducer from "../features/accessories";
import productsReducer from "../features/products";
import selectedProductReducer from "../features/selectedProduct";
import brandNewReducer from "../features/brandNew";
import hotPriceReducer from "../features/hotPrice";

export const store = configureStore({
  reducer: {
    phones: phonesReducer,
    tablets: tabletsReducer,
    accessories: accessoriesReducer,
    products: productsReducer,
    selectedProduct: selectedProductReducer,
    brandNew: brandNewReducer,
    hotPrice: hotPriceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;