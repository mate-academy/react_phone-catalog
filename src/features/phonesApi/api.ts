import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Phone } from '../../types/Phone';

const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/';

type ResponePhone = Phone[];

export const api = createApi({
  reducerPath: 'apiPhone',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ['LIST'],
  endpoints: (builder) => ({
    getPhones: builder.query<ResponePhone, string>({
      query: () => 'products.json',
    }),
    getPhoneById: builder.query<Phone, string>({
      query: (params) => `products/${params}.json`,
    }),
  }),
});

export const { useGetPhonesQuery, useGetPhoneByIdQuery } = api;
