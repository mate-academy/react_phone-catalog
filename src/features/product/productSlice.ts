/* eslint-disable */
import { Product } from '../../types/Product';
import productFromServer from '../../../public/api/products.json';
import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  products: Product[];
};

const initialState: InitialState = {
  products: productFromServer,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
});

export default productSlice;
