import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/products"

type ProductsState = {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string;
}

const initialState: ProductsState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error:'',
}
/* eslint-disable no-param-reassign */
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;

    },
  }
})
/* eslint-enable no-param-reassign */

export const { setLoading, setProducts, setError } = productsSlice.actions;

export default productsSlice.reducer;

export const init = () => {
  return (dispach: Dispatch) => {
    dispach(setLoading(true));

      fetch('/api/products.json').then(res=>res.json())
        .then(data => dispach(setProducts(data)))
        .catch(()=>dispach(setError('something Wrong')))
    .finally(()=>dispach(setLoading(false)))

  }
}

