import { Category } from '../../../types/Category';
// import { Product } from '../../../types/Product';
import { ProductDetails } from '../../../types/ProductDetails';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getProducts = async () => {
  const response = await fetch(`${import.meta.env.BASE_URL}/api/products.json`);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await response.json();

  await wait(500);

  return data;
};

export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(
    `${import.meta.env.BASE_URL}/api/categories.json`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  return response.json();
};

export const getProductById = async (
  productId: string,
): Promise<ProductDetails | null> => {
  const categories = ['phones', 'tablets', 'accessories'];

  try {
    for (const category of categories) {
      const response = await fetch(`api/${category}.json`);

      if (!response.ok) {
        continue;
      }

      const products: ProductDetails[] = await response.json();
      const found = products.find(p => p.id === productId);

      if (found) {
        return found;
      }
    }
  } catch (error) {}

  throw new Error('Product not found');
};
