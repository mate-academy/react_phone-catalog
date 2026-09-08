import { Product, Category, ShortProduct } from '../models';

const getRequest = async <T>(category: Category | 'products'): Promise<T[]> => {
  const response = await fetch(`api/${category}.json`);

  if (!response.ok) {
    throw new Error('Failed to fetch phones');
  }

  return response.json();
};

export const getPhones = async (): Promise<Product[]> => {
  return getRequest<Product>('phones');
};

export const getTablets = async (): Promise<Product[]> => {
  return getRequest<Product>('tablets');
};

export const getAccessories = async (): Promise<Product[]> => {
  return getRequest<Product>('accessories');
};

export const getProducts = async (): Promise<ShortProduct[]> => {
  return getRequest<ShortProduct>('products');
};

export const getShortProductsByCategory = async (
  category: Category,
): Promise<ShortProduct[]> => {
  const allProducts = await getProducts();
  return allProducts.filter(product => product.category === category);
};

let fullProductsCache: Product[] | null = null;

export const getFullProducts = async (): Promise<Product[]> => {
  if (fullProductsCache) {
    return fullProductsCache;
  }

  const [phones, tablets, accessories] = await Promise.all([
    getRequest<Product>('phones'),
    getRequest<Product>('tablets'),
    getRequest<Product>('accessories'),
  ]);

  fullProductsCache = [...phones, ...tablets, ...accessories];

  return fullProductsCache;
};

export const getProductById = async (
  id: string,
): Promise<Product | undefined> => {
  const products = await getFullProducts();
  return products.find(product => product.id === id);
};

export const clearProductCache = () => {
  fullProductsCache = null;
};

export const getProductId = (product: Product | ShortProduct): string => {
  return 'itemId' in product ? product.itemId : product.id;
};
