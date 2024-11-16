import axios from 'axios';

import { ProductModel } from '@shared/models/Product';
import { imitateRequestDelay } from '@shared/utils/imitateRequestDelay';

const instance = axios.create({
  baseURL: 'api/',
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

const api = {
  async get<Response>(url: string) {
    const response = await imitateRequestDelay(() =>
      instance.get<Response>(url),
    );

    return response;
  },
};

export const getProducts = async (): Promise<ProductModel[]> => {
  const response = await api.get<ProductModel[]>('products.json');

  return response.data;
};

export const getBrandNewProducts = async (
  page?: number,
): Promise<{ data: ProductModel[]; isEnd: boolean; isStart: boolean }> => {
  const products = await getProducts();

  const brandNewProducts = products.filter(({ year }) => year === 2022);

  if (typeof page === 'undefined') {
    return { data: brandNewProducts, isEnd: true, isStart: true };
  }

  const to = page * 5;
  const from = to - 5;

  return {
    data: brandNewProducts.slice(from, to),
    isEnd: to === brandNewProducts.length,
    isStart: from === 0,
  };
};
