import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProductType } from '../helpers/types/ProductType';
import { DetailType } from '../helpers/types/DetailType';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://mate-academy.github.io/react_phone-catalog/_new',
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductType[], void>({
      query: () => '/products.json',
    }),
    getProductDetails: builder.query<DetailType, string>({
      query: (productId) => `/products/${productId}.json`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } = productsApi;
