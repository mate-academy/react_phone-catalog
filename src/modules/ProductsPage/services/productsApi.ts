import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Product } from '../../../types';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: './api/' }),
  endpoints: build => ({
    getProducts: build.query<Product[], void>({
      query: () => `products.json`,
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
