import { Product } from '../../../types/Product';
import { ProductDetails } from '../../../types/ProductDetails';
import { client } from '../fetchClient';

export const getProducts = () => {
  return client.get<Product[]>('/products.json');
};

export const getProductId = async (category: string, itemId: string) => {
  const items = await client.get<ProductDetails[]>(`/${category}.json`);

  const product = items.findLast(item => item.id === itemId);

  if (!product) {
    throw new Error('Product not found');
  }

  return product;
};

export const getSuggestedProducts = async (
  category: string,
): Promise<Product[]> => {
  const products = await client.get<Product[]>('/products.json');

  return products
    .filter(p => p.category === category)
    .map(p => ({ ...p, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .slice(0, 10);
};
