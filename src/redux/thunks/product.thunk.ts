import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';
import { fetchProduct, fetchProducts } from '../../http/api';

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const getProducts = createAsyncThunk<Product[]>(
  'products/getProducts',
  async () => {
    await delay(1000);
    const response = await fetchProducts();

    return response.data;
  },
);

export const getProductDetails = createAsyncThunk(
  'product/getProduct',
  async (phoneId: string) => {
    const response = await fetchProduct(phoneId);

    return response.data;
  },
);
