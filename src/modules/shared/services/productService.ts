import { Category } from '../../../types/Category';
import { Product } from '../../../types/Product';
import { ProductDetails } from '../../../types/ProductDetails';

const BASE_PATH = import.meta.env.BASE_URL;

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${BASE_PATH}/api/products.json`);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
};

export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${BASE_PATH}/api/categories.json`);

  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  return response.json();
};

export const getProductById = async (
  productId: string,
  category?: string,
): Promise<ProductDetails | null> => {
  try {
    if (category) {
      const response = await fetch(`${BASE_PATH}/api/${category}.json`);

      if (response.ok) {
        const products: ProductDetails[] = await response.json();
        const found = products.find(p => p.id === productId);

        if (found) {
          return found;
        }
      }

      return null;
    }

    const categories = ['phones', 'tablets', 'accessories'];
    const fetchPromises = categories.map(cat =>
      fetch(`${BASE_PATH}/api/${cat}.json`)
        .then(res => (res.ok ? res.json() : []))
        .catch(() => []),
    );

    const allCategoriesData = await Promise.all(fetchPromises);

    for (const products of allCategoriesData) {
      const found = products.find((p: ProductDetails) => p.id === productId);

      if (found) {
        return found;
      }
    }

    return null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('API Error:', error);
    throw new Error('Network error or invalid JSON');
  }
};

export const getCategoryDetailsArray = async (
  category: string,
): Promise<ProductDetails[]> => {
  const response = await fetch(`${BASE_PATH}/api/${category}.json`);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${category}.json`);
  }

  return response.json();
};
