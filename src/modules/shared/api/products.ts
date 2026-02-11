import { Category, Product, ProductDetails } from '../types';

const PRODUCTS_URL = '/api/products.json';
const DETAILS_URL = '/_old/v2/api/products';

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const getProducts = () => fetchJson<Product[]>(PRODUCTS_URL);

export const getProductsByCategory = async (category: Category) => {
  const products = await getProducts();

  return products.filter(product => product.category === category);
};

export const getProductDetails = async (itemId: string) => {
  const details = await fetchJson<ProductDetails>(
    `${DETAILS_URL}/${itemId}.json`,
  );

  return {
    ...details,
    images: details.images.map(image => image.replace('.jpg', '.webp')),
  };
};

export const getSuggestedProducts = async (amount = 10) => {
  const products = await getProducts();
  const shuffled = [...products].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, amount);
};
