import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';
import { getData } from './httpClient';

export const getAllProducts = async (): Promise<Product[]> => {
  return getData<Product[]>('api/products.json');
};

export const getProduct = async (itemId: string): Promise<Product> => {
  const products = await getData<Product[]>('api/products.json');

  const product = products.find(p => p.itemId === itemId);

  if (!product) {
    throw new Error(`No product found with itemId: ${itemId}`);
  }

  return product;
};

export const getProductsByCategory = async (category: string) => {
  const products = await getData<Product[]>('api/products.json');

  return products.filter((product: Product) => product.category === category);
};

export const getProductDetails = async (
  category: string,
  productId: string,
): Promise<ProductDetails | null> => {
  const products: ProductDetails[] = await getData<ProductDetails[]>(
    `api/${category}.json`,
    { cacheBust: Math.random() },
  );

  const detailedProduct = products.find(p => p.id === productId);

  return detailedProduct ?? null;
};

export const getSuggestedProducts = async () => {
  const products = await getData<Product[]>('api/products.json');

  return [...products.sort(() => Math.random() - 0.5).slice(0, 10)];
};
