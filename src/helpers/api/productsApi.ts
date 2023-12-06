import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../types/Product';
import { ProductInfo } from '../types/ProductInfo';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://mate-academy.github.io/react_phone-catalog/_new',
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => '/products.json',
    }),
    getProductDetails: builder.query<ProductInfo, string>({
      query: (productId) => `/products/${productId}.json`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } = productsApi;
