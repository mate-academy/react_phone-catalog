import { Category, ProductDetails, ProductSummary } from '../types/catalog';

const withBase = (path: string) =>
  `${import.meta.env.BASE_URL}${path}`.replace('//', '/');

const fetchJson = async <T>(path: string): Promise<T> => {
  const response = await fetch(withBase(path));

  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}`);
  }

  return response.json() as Promise<T>;
};

let productsPromise: Promise<ProductSummary[]> | null = null;
const categoryPromises: Partial<Record<Category, Promise<ProductDetails[]>>> =
  {};

export const getProducts = () => {
  if (!productsPromise) {
    productsPromise = fetchJson<ProductSummary[]>('api/products.json');
  }

  return productsPromise;
};

export const getCategoryDetails = (category: Category) => {
  if (!categoryPromises[category]) {
    categoryPromises[category] = fetchJson<ProductDetails[]>(
      `api/${category}.json`,
    );
  }

  return categoryPromises[category] as Promise<ProductDetails[]>;
};

export const getProductDetails = async (productId: string) => {
  const categories: Category[] = ['phones', 'tablets', 'accessories'];
  const collections = await Promise.all(categories.map(getCategoryDetails));

  for (const collection of collections) {
    const product = collection.find(item => item.id === productId);

    if (product) {
      return {
        product,
        variants: collection.filter(
          item => item.namespaceId === product.namespaceId,
        ),
      };
    }
  }

  return null;
};

export const getSuggestedProducts = async (
  category: Category,
  excludeId: string,
  limit = 12,
) => {
  const products = await getProducts();
  const suggested = products
    .filter(
      product => product.category === category && product.itemId !== excludeId,
    )
    .sort(() => Math.random() - 0.5)
    .slice(0, limit);

  return suggested;
};
