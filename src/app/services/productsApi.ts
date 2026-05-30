// src/app/services/productsApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import { Product } from '../../types/ProductType';
import { ProductsType } from '../../types/ProductsType';
import { getProducts } from '../../utils/getProducts';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  // baseQuery: fetchBaseQuery({ baseUrl: '/' }), // базова URL
  baseQuery: async () => ({ data: null }),
  endpoints: builder => ({
    // getProductsByCategory: builder.query<Product[], ProductsType>({
    //   query: category => `api/${category}.json`, // твій шлях до json
    // }),
    getProductsByCategory: builder.query<Product[], ProductsType>({
      queryFn: async (category: ProductsType) => {
        try {
          const data = await getProducts(category);

          return { data };
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error } };
        }
      },
    }),
  }),
});

export const { useGetProductsByCategoryQuery } = productsApi;
