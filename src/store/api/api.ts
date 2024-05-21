import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../../utils/types/Product';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://vitaliinez.github.io/react_phone-catalog/api/',
  }),
  endpoints: builder => ({
    getData: builder.query<Product[], void>({
      query: () => 'products.json',
    }),
  }),
});

export const { useGetDataQuery } = api;
