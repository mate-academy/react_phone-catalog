import { z } from 'zod';

import { PRODUCT_SORT_OPTIONS } from '@/modules/products/constants';
import {
  Device,
  ProductItem,
  ProductPage,
  deviceSchema,
  productItemSchema,
} from '@/modules/products/schema';
import { ProductCategory, ProductQueryParams } from '@/modules/products/types';
import { paginate } from '@/shared/utils';

import accessoriesJson from '../../../public/api/accessories.json';
import phonesJson from '../../../public/api/phones.json';
import productsJson from '../../../public/api/products.json';
import tabletsJson from '../../../public/api/tablets.json';

export const products = z.array(productItemSchema).parse(productsJson);
export const phones = z.array(deviceSchema).parse(phonesJson);
export const tablets = z.array(deviceSchema).parse(tabletsJson);
export const accessories = z.array(deviceSchema).parse(accessoriesJson);

export const productsStore: Record<ProductCategory, Device[]> = {
  phones,
  tablets,
  accessories,
};

export const getCategoryCounts = async () => {
  await new Promise(resolve => setTimeout(resolve, 0));

  const count = products.reduce(
    (prev, item) => ({
      ...prev,
      [item.category]: prev[item.category] + 1,
    }),
    {
      phones: 0,
      tablets: 0,
      accessories: 0,
    },
  );

  return count;
};

export const getProducts = async (
  params: ProductQueryParams,
): Promise<ProductPage> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const { page, perPage, sort, category, ids } = params;

  let productsList: ProductItem[] = [...products];

  if (category) {
    productsList = productsList.filter(
      product => product.category === params.category,
    );
  }

  if (ids) {
    productsList = productsList.filter(product => ids.includes(product.itemId));
  }

  if (sort) {
    const sortBy = PRODUCT_SORT_OPTIONS.find(option => option.key === sort);

    productsList = productsList.toSorted(sortBy?.compare);
  }

  const { items, total, totalPages } = paginate<ProductItem>(
    productsList,
    page,
    perPage,
  );

  return {
    items,
    total,
    page,
    perPage,
    totalPages,
  };
};

function shuffle<T>(array: T[]): T[] {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

export const getRandomProducts = async (params: {
  count: number;
  category?: ProductCategory;
}) => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const { category, count } = params;

  const productsList = category
    ? products.filter(product => product.category === category)
    : [...products];

  return shuffle(productsList).slice(0, count);
};

export const getProductById = async (id: string): Promise<Device> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const category = products.find(item => item.itemId === id)?.category;

  if (!category) {
    return Promise.reject(new Error('Product not found'));
  }

  const product = productsStore[category].find(item => item.id === id);

  if (!product) {
    throw new Error('Product not found');
  }

  return product;
};
