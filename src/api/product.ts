import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

const BASE_URL = `${import.meta.env.BASE_URL}api`;

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${BASE_URL}/products.json`);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
};

export const getProductDetails = async (
  productId: string,
): Promise<ProductDetails> => {
  const categories = ['phones', 'tablets', 'accessories'];

  for (const category of categories) {
    try {
      const response = await fetch(`${BASE_URL}/${category}.json`);

      if (response.ok) {
        const products: ProductDetails[] = await response.json();
        const product = products.find(item => item.id === productId);

        if (product) {
          return product;
        }
      }
    } catch {}
  }

  throw new Error('Product not found');
};

export const getSuggestedProducts = async (): Promise<Product[]> => {
  const products = await getProducts();

  return [...products].sort(() => 0.5 - Math.random()).slice(0, 8);
};
