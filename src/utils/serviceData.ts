import { Product } from '../types/Product';
import { ProductItem } from '../types/ProductItem';

const request = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error loading ${url}`);
  }

  return response.json();
};

export const getProducts = async (): Promise<Product[]> => {
  const products = await request('./api/products.json');

  return products;
};

export const getAllProducts = async (): Promise<ProductItem[]> => {
  const [phones, tablets, accessories] = await Promise.all([
    request('/api/phones.json'),
    request('/api/tablets.json'),
    request('/api/accessories.json'),
  ]);

  return [...phones, ...tablets, ...accessories];
};

export const getProductById = async (
  productId: string,
): Promise<ProductItem | null> => {
  const products = await getAllProducts();

  return products.find(product => product.id === productId) || null;
};

export const getSuggestedProducts = async (
  productId: string,
): Promise<ProductItem[]> => {
  const products = await getAllProducts();

  return products
    .filter(product => product.id !== productId)
    .sort(() => 0.5 - Math.random())
    .slice(0, 8);
};

export const getNewModels = async (): Promise<Product[]> => {
  const products = await getProducts();

  return products
    .filter(product => product.category === 'phones' && product.year >= 2022)
    .slice(0, 8);
};

export const getHotPrices = async (): Promise<Product[]> => {
  const products = await getProducts();

  return products
    .filter(
      product =>
        product.category === 'phones' &&
        product.fullPrice - product.price >= 150,
    )
    .slice(0, 8)
    .sort(
      (product1, product2) =>
        product2.fullPrice -
        product2.price -
        (product1.fullPrice - product1.price),
    );
};
