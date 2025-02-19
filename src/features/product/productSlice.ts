/* eslint-disable */
import { Product } from '../../types/Product';
import productFromServer from '../../../public/api/products.json';
import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  products: Product[];
  newPhones: Product[];
  hotPrice: Product[];
};

const topNewProduct = productFromServer
  .filter(product => product.year === 2022)
  .reduce<Product[]>((acc, product) => {
    if (!acc.some(p => p.color === product.color)) {
      acc.push(product);
    }

    return acc;
  }, []);

const topDiscountedProduct = productFromServer
  .map(product => ({
    ...product,
    discount: product.price - (product.fullPrice ?? product.price),
  }))
  .sort((a, b) => b.discount - a.discount)
  .slice(0, 10);

const initialState: InitialState = {
  products: productFromServer,
  newPhones: topNewProduct,
  hotPrice: topDiscountedProduct,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
});

export default productSlice;
