import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import productData from '../../api/products.json';

interface Product {
  id: number;
  itemId: string;
  category: string;
  name: string;
  capacity: string;
  fullPrice: number;
  price: number;
  color: string;
  image: string;
  screen: string;
  ram: string;
  year: number;
}

interface ProductsState {
  products: Product[];
}

const initialState: ProductsState = {
  products: productData as Product[],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
