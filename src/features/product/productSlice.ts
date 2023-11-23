/* eslint-disable no-param-reassign */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProductDetails } from '../../Types/ProductDetails';

const BASE_URL
  = 'https://mate-academy.github.io/react_phone-catalog/api/products';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    // eslint-disable-next-line
    getProductDetails: builder.query<ProductDetails, any>({
      query: (productId) => `/${productId}.json`,
    }),
  }),
});

export const { useGetProductDetailsQuery } = apiSlice;
