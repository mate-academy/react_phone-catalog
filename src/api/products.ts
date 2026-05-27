import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

const BASE_URL = './api';

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${BASE_URL}/products.json`);

  if (!response.ok) {
    throw new Error('Unable to load products');
  }

  return response.json();
};

export const getPhones = async (): Promise<Product[]> => {
  const products = await getProducts();

  return products.filter(product => product.category === 'phones');
};

export const getTablets = async (): Promise<Product[]> => {
  const products = await getProducts();

  return products.filter(product => product.category === 'tablets');
};

export const getAccessories = async (): Promise<Product[]> => {
  const products = await getProducts();

  return products.filter(product => product.category === 'accessories');
};

export const getProductById = async (
  productId: string,
): Promise<Product | undefined> => {
  const products = await getProducts();

  return products.find(product => product.itemId === productId);
};

export const getPhonesDetails = async (): Promise<ProductDetails[]> => {
  const response = await await fetch(`${BASE_URL}/phones.json`);

  if (!response.ok) {
    throw new Error('Unable to load phones details');
  }

  return response.json();
};

export const getTabletsDetails = async (): Promise<ProductDetails[]> => {
  const response = await await fetch(`${BASE_URL}/tablets.json`);

  if (!response.ok) {
    throw new Error('Unable to load tablets details');
  }

  return response.json();
};

export const getAccessoriesDetails = async (): Promise<ProductDetails[]> => {
  const response = await await fetch(`${BASE_URL}/accessories.json`);

  if (!response.ok) {
    throw new Error('Unable to load accessories details');
  }

  return response.json();
};

export const getProductDetailsById = async (
  productId: string,
): Promise<ProductDetails | undefined> => {
  const [phones, tablets, accessories] = await Promise.all([
    getPhonesDetails(),
    getTabletsDetails(),
    getAccessoriesDetails(),
  ]);

  const allProducts = [...phones, ...tablets, ...accessories];

  return allProducts.find(product => product.id === productId);
};

export const getSuggestedProducts = async (
  category: string,
  currentProductId: string,
) => {
  const products = await getProducts();

  return products.filter(product => {
    return product.category === category && product.itemId !== currentProductId;
  });
};
