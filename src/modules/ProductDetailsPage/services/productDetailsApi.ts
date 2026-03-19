import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Category, ProductDetails } from '../../../types';

export const productDetailsApi = createApi({
  reducerPath: 'productDetailsApi',
  baseQuery: fetchBaseQuery({ baseUrl: './api/' }),
  endpoints: build => ({
    getProductsByCategory: build.query<ProductDetails[], Category>({
      query: category => `${category}.json`,
    }),
  }),
});

export const { useGetProductsByCategoryQuery } = productDetailsApi;
