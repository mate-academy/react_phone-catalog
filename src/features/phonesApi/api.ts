import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Phone } from '../../types/Phone';

type ResponePhone = Phone[];

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://mate-academy.github.io/react_phone-catalog/_new/',
  }),
  tagTypes: ['LIST'],
  endpoints: (builder) => ({
    getPhones: builder.query<ResponePhone, string>({
      query: (limit = '') => `products.json?${limit && `limit=${limit}`}`,
    }),
    getPhoneById: builder.query<Phone, string>({
      query: (params) => {
        // const { phoneId } = params;

        return `products/${params}.json`;
      },
    }),
  }),
});

export const { useGetPhonesQuery, useGetPhoneByIdQuery } = api;
