import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';

const BASE_URL
  = 'https://mate-academy.github.io/react_phone-catalog/api/products';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => `${BASE_URL}.json`,
    }),
    getProductDetails: builder.query<ProductDetails, string>({
      query: (productId) => `${BASE_URL}/${productId}.json`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } = apiSlice;
