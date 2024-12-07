import axios from 'axios';

import { SortBy, ItemsOnPage, PaginationPage } from '@shared/types/common';
import { ProductCoverModel, ProductModel } from '@shared/types/Product';
import { ProductCategory } from '@shared/types/Product/Product.interfaces';
import { imitateRequestDelay } from '@shared/utils/imitateRequestDelay';

import {
  filterProductsCovers,
  generateProductsCoversPagination,
  prepareProductsResponse,
} from './api.service';

export interface Meta {
  end: boolean;
  start: boolean;
  total: number;
  totalPages: number;
  page: number;
}

interface Response<TData> {
  data: TData;
}

export interface ResponseWithPagination<TData> extends Response<TData> {
  meta: Meta;
}

interface GetProductsRequestProps {
  category: ProductCategory;
  sortBy?: SortBy;
  itemsOnPage?: ItemsOnPage;
  page?: PaginationPage;
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
  props: GetProductsRequestProps,
): Promise<ResponseWithPagination<ProductModel[]>> => {
  const { category, itemsOnPage, page, sortBy } = props;
  const isValidCategory = ['phones', 'tablets', 'accessories'].includes(
    category,
  );

  if (!isValidCategory) {
    throw Error("Category doesn't exist");
  }

  const { data } = await api.get<ProductModel[]>(`${category}.json`);

  return prepareProductsResponse({
    data,
    filters: { sortBy, itemsOnPage, page },
  });
};

export const getProductById = async (id: string) => {
  const allPromises = await Promise.allSettled([
    getProducts({ category: 'phones', page: 'all' }),
    getProducts({ category: 'tablets', page: 'all' }),
    getProducts({ category: 'accessories', page: 'all' }),
  ]);

  const candidate = allPromises.reduce(
    (_acc, promise, _idx, arr) => {
      if (promise.status === 'fulfilled') {
        const result =
          promise.value.data.find(product => product.id === id) ?? null;

        if (result) {
          arr.splice(1);
        }

        return result;
      }

      return null;
    },
    null as ProductModel | null,
  );

  return candidate;
};
