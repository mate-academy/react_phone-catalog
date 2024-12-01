import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';
import { client } from '../utils/httpClient';

export const getProducts = () => {
  return client.get<Product[]>('/api/products.json');
};

export const getGadgetById = async (
  category: string,
  itemId: string,
): Promise<ProductDetails | null> => {
  try {
    const products = await client.get<ProductDetails[]>(
      `/api/${category}.json`,
    );
    const product = products.find(p => p.id === itemId);

    return product || null;
  } catch (error) {
    throw new Error('Product not found');
  }
};

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const products = await getProducts();
    const product = products.find(
      p => p.itemId.toLowerCase() === id.toLowerCase(),
    );

    return product || null;
  } catch (error) {
    throw new Error('Product not found');
  }
};
