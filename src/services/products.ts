import type { Product, ProductDetails } from '../types';

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch('/api/products.json');

  if (!response.ok) {
    throw new Error('Unable to load products');
  }

  const products: Product[] = await response.json();

  return products;
};

export const getProductDetails = async (
  productId: string,
): Promise<ProductDetails | undefined> => {
  const categories = ['phones', 'tablets', 'accessories'];

  for (const category of categories) {
    const response = await fetch(`/api/${category}.json`);

    if (!response.ok) {
      throw new Error('Unable to load product details');
    }

    const products: ProductDetails[] = await response.json();

    const product = products.find(item => item.id === productId);

    if (product) {
      return product;
    }
  }

  return undefined;
};
