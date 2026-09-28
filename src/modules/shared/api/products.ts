import { Product, ProductCategory, ProductDetails } from '../types/Product';

const API_ROOTS = [
  `${import.meta.env.BASE_URL}api`,
  './api',
  '/react_phone-catalog/api',
];

const request = async <T>(path: string): Promise<T> => {
  const responses = await Promise.allSettled(
    API_ROOTS.map(apiRoot => fetch(`${apiRoot}/${path}`)),
  );

  for (const responseResult of responses) {
    if (responseResult.status === 'fulfilled' && responseResult.value.ok) {
      return responseResult.value.json() as Promise<T>;
    }
  }

  throw new Error('Unable to load data');
};

export const getProducts = () => request<Product[]>('products.json');

export const getProductsByCategory = async (category: ProductCategory) => {
  const products = await getProducts();

  return products.filter(product => product.category === category);
};

export const getProductDetailsByCategory = (category: ProductCategory) => {
  return request<ProductDetails[]>(`${category}.json`);
};

export const getAllProductDetails = async () => {
  const details = await Promise.all([
    getProductDetailsByCategory('phones'),
    getProductDetailsByCategory('tablets'),
    getProductDetailsByCategory('accessories'),
  ]);

  return details.flat();
};

export const getProductDetails = async (productId: string) => {
  const products = await getAllProductDetails();

  return products.find(product => product.id === productId) || null;
};

export const getSuggestedProducts = async (
  excludedProductId?: string,
  limit = 12,
) => {
  const products = await getProducts();
  const availableProducts = products.filter(
    product => product.itemId !== excludedProductId,
  );

  return [...availableProducts].sort(() => Math.random() - 0.5).slice(0, limit);
};
