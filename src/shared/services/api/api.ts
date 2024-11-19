import axios from 'axios';

import { ProductCoverModel, ProductModel } from '@shared/types/Product';
import { ProductCategory } from '@shared/types/Product/Product.interfaces';
import { imitateRequestDelay } from '@shared/utils/imitateRequestDelay';

import {
  filterProductsCovers,
  generateProductsCoversPagination,
} from './api.helpers';

interface Meta {
  end: boolean;
  start: boolean;
  total: number;
  page: number | null;
}

interface Response<TData> {
  data: TData;
}

export interface ResponseWithPagination<TData> extends Response<TData> {
  meta: Meta;
}

const instance = axios.create({
  baseURL: 'api/',
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

const api = {
  async get<TResponse>(url: string) {
    const response = await imitateRequestDelay(() =>
      instance.get<TResponse>(url),
    );

    return response;
  },
};

export const getProductsCovers = async (): Promise<ProductCoverModel[]> => {
  const response = await api.get<ProductCoverModel[]>('products.json');

  return response.data;
};

export const getBrandNewProductsCovers = async (
  page?: number,
): Promise<ResponseWithPagination<ProductCoverModel[]>> => {
  const allProductsCovers = await getProductsCovers();

  const brandNewProductsCovers = filterProductsCovers({
    variant: 'new',
    productsCovers: allProductsCovers,
  });

  return generateProductsCoversPagination({
    page,
    productsCovers: brandNewProductsCovers,
  });
};

export const getHotProductsCovers = async (
  page?: number,
): Promise<ResponseWithPagination<ProductCoverModel[]>> => {
  const allProductsCovers = await getProductsCovers();

  const hotProductsCovers = filterProductsCovers({
    variant: 'hot',
    productsCovers: allProductsCovers,
  });

  return generateProductsCoversPagination({
    page,
    productsCovers: hotProductsCovers,
  });
};

export const getProducts = async (
  category: ProductCategory,
  page?: number,
): Promise<ResponseWithPagination<ProductModel[]>> => {
  const { data } = await api.get<ProductModel[]>(`${category}.json`);

  const response = {
    data,
    meta: {
      page: null,
      end: true,
      start: true,
      total: data.length,
    },
  };

  if (typeof page === 'undefined') {
    return response;
  }

  const to = page * 10;
  const from = to - 10;

  const slicedData = data.slice(from, to);

  return {
    data: slicedData,
    meta: {
      page,
      end: to === data.length || slicedData.length < 10,
      start: from === 0,
      total: data.length,
    },
  };
};
