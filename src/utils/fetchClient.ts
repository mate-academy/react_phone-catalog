import { Product, ProductDetails } from '../types/Product';
import { client } from './client';

export const getProducts = async (): Promise<Product[]> => {
  return client.get('/products.json');
};

export const getProductDetails = async (
  itemId: string,
): Promise<ProductDetails> => {
  const products = await getProducts();
  const productFromList = products.find(p => p.itemId === itemId);

  if (!productFromList) {
    throw new Error('Product not found');
  }

  const productsByCategory = await client.get<ProductDetails[]>(
    `/${productFromList.category}.json`,
  );
  const product = productsByCategory.find(p => p.id === itemId);

  if (!product) {
    throw new Error('Product not found');
  }

  return product;
};

export const getSuggestedProducts = async (
  category: string,
  exclude: string,
  limit: number = 3,
): Promise<Product[]> => {
  const products = await client.get<Product[]>(`/products.json`);
  const filtered = products
    .filter(p => p.category === category && p.itemId !== exclude)
    .sort(() => Math.random() - 0.5)
    .slice(0, limit);

  return filtered;
};
