import { ProductDetailed } from '../types';
/* eslint-disable @typescript-eslint/no-var-requires */
const phoneData: ProductDetailed[] = require('../api/phones.json');
const accessoryData: ProductDetailed[] = require('../api/accessories.json');
const tabletData: ProductDetailed[] = require('../api/tablets.json');
/* eslint-enable @typescript-eslint/no-var-requires */
const DATA_SOURCES: Record<
  'phones' | 'accessories' | 'tablets',
  ProductDetailed[]
> = {
  phones: phoneData,
  accessories: accessoryData,
  tablets: tabletData,
};

export async function getAllProducts<T extends ProductDetailed>(
  productType: 'phones' | 'accessories' | 'tablets',
): Promise<T[]> {
  const dataSource = DATA_SOURCES[productType] as T[];
  return dataSource;
}

export async function getData<T extends ProductDetailed>(
  productType: 'phones' | 'accessories' | 'tablets',
  productId: string,
): Promise<T> {
  const allProducts = await getAllProducts<T>(productType);

  const product = allProducts.find((item) => item.id === productId);
  if (!product) {
    throw new Error(`Product not found: ${productId}`);
  }

  return product;
}

export async function getProductsByName<T extends ProductDetailed>(
  productType: 'phones' | 'accessories' | 'tablets',
  namespaceId: string,
): Promise<T[]> {
  const allProducts = await getAllProducts<T>(productType);

  return allProducts.filter((item) => item.namespaceId === namespaceId);
}

export const getProductAPI = (
  type: 'phones' | 'accessories' | 'tablets',
): ((productId: string) => Promise<ProductDetailed | null>) => {
  switch (type) {
    case 'phones':
      return (productId: string) =>
        getData<ProductDetailed>('phones', productId);
    case 'tablets':
      return (productId: string) =>
        getData<ProductDetailed>('tablets', productId);
    case 'accessories':
      return (productId: string) =>
        getData<ProductDetailed>('accessories', productId);
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
    const products = await getAllProducts<ProductDetailed>(category);
    if (products.some((product) => product.id === productId)) {
      return category;
    }
  }

  throw new Error('Product category not found for the given ID.');
};
