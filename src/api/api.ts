/* eslint-disable no-console */
import { Goods } from '../types';
/* eslint-disable @typescript-eslint/no-var-requires */
const phoneData: Goods[] = require('../api/phones.json');
const accessoryData: Goods[] = require('../api/accessories.json');
const tabletData: Goods[] = require('../api/tablets.json');
/* eslint-enable @typescript-eslint/no-var-requires */
const DATA_SOURCES: Record<'phones' | 'accessories' | 'tablets', Goods[]> = {
  phones: phoneData,
  accessories: accessoryData,
  tablets: tabletData,
};

export async function getAllProducts<T extends Goods>(
  productType: 'phones' | 'accessories' | 'tablets',
): Promise<T[]> {
  const dataSource = DATA_SOURCES[productType] as T[];
  return dataSource;
}

export async function getData<T extends Goods>(
  productType: 'phones' | 'accessories' | 'tablets',
  productId: string,
): Promise<T> {
  const allProducts = await getAllProducts<T>(productType);

  console.log(`Fetching product data for ID: ${productId}`);
  const product = allProducts.find((item) => item.id === productId);
  if (!product) {
    throw new Error(`Product not found: ${productId}`);
  }
  console.log('Fetching product with ID:', productId);
  return product;
}

export async function getProductsByName<T extends Goods>(
  productType: 'phones' | 'accessories' | 'tablets',
  namespaceId: string,
): Promise<T[]> {
  const allProducts = await getAllProducts<T>(productType);
  console.log(allProducts + ' kkk');
  console.log('Product Type:', productType);

  return allProducts.filter((item) => item.namespaceId === namespaceId);
}

export const getProductAPI = (
  type: 'phones' | 'accessories' | 'tablets',
): ((productId: string) => Promise<Goods | null>) => {
  console.log(`Selecting API for product type: ${type}`);
  switch (type) {
    case 'phones':
      return (productId: string) => getData<Goods>('phones', productId);
    case 'tablets':
      return (productId: string) => getData<Goods>('tablets', productId);
    case 'accessories':
      return (productId: string) => getData<Goods>('accessories', productId);
    default:
      throw new Error('Unknown product type');
  }
};

export const determineCategoryByProductId = async (
  productId: string,
): Promise<'phones' | 'tablets' | 'accessories'> => {
  const productCategories: Array<'phones' | 'tablets' | 'accessories'> = [
    'phones',
    'tablets',
    'accessories',
  ];

  for (const category of productCategories) {
    const products = await getAllProducts<Goods>(category);
    if (products.some((product) => product.id === productId)) {
      return category;
    }
  }

  throw new Error('Product category not found for the given ID.');
};
