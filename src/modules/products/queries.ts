import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import {
  ProductListParams,
  productListParamsSchema,
} from '@/modules/products/schema';
import { ProductCategory } from '@/modules/products/types';
import {
  getProductById,
  getProducts,
  getRandomProducts,
} from '@/service/api/products';

import { parseParamsBySchemaFromSearchParams } from './utils';

export const productKeys = {
  all: ['products'],
  list: (params?: ProductListParams) => ['products', 'list', params],
  detail: (id: string) => ['products', 'detail', id],
  random: (count: number, category?: ProductCategory) => [
    'products',
    'random',
    category,
    count,
  ],
};

export const useProductsQuery = (params: {
  category?: ProductCategory;
  ids?: string[];
}) => {
  const [searchParams] = useSearchParams();
  const { category, ids } = params;

  const queryParams = {
    ...parseParamsBySchemaFromSearchParams(
      searchParams,
      productListParamsSchema,
    ),
    category,
    ids,
  };

  return useQuery({
    queryKey: productKeys.list(queryParams),
    queryFn: () => getProducts(queryParams),
    placeholderData: keepPreviousData,
  });
};

export const useRandomProductsQuery = (
  count: number,
  category?: ProductCategory,
) => {
  const params = {
    category,
    count,
  };

  return useQuery({
    queryKey: productKeys.random(count, category),
    queryFn: () => getRandomProducts(params),
  });
};

export const useProductQuery = (id: string) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => getProductById(id),
  });
};
