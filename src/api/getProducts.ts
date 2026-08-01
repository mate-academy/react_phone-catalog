/* eslint-disable no-console */
import { DetailsProduct, Product } from '../types/productTypes';
import { getAssetUrl } from './utilis';

export const getProductsItem = async (): Promise<Product[]> => {
  try {
    const resp = await fetch(getAssetUrl('api/products.json'));

    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }

    const data = await resp.json();

    return data;
  } catch (error) {
    console.error('Failed to fetch products.json', error);
    throw error;
  }
};

export const getProductsFromCategory = async (
  category: string,
  signal: AbortSignal,
): Promise<DetailsProduct[]> => {
  try {
    const resp = await fetch(getAssetUrl(`api/${category}.json`), { signal });

    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }

    const data = await resp.json();

    return data;
  } catch (error) {
    console.error('Failed to fetch products.json', error);
    throw error;
  }
};
