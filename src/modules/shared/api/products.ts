import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

async function request<T>(url: string): Promise<T> {
  const cleanUrl = url.replace(/^\/+/, '');
  const apiPath = cleanUrl.startsWith('api/') ? cleanUrl : `api/${cleanUrl}`;
  const response = await fetch(`./${apiPath}`);

  if (!response.ok) {
    throw new Error('Failed to load data');
  }

  return response.json();
}

export const fixImageUrl = (path: string): string => {
  if (!path) {
    return '';
  }

  return `./${path.replace(/^\/+/, '')}`;
};

export const getProducts = async (): Promise<Product[]> => {
  const products = await request<Product[]>('products.json');

  return products.map(product => ({
    ...product,
    image: fixImageUrl(product.image),
  }));
};

export const getProductDetails = async (
  productId: string,
): Promise<ProductDetails> => {
  const [phones, tablets, accessories] = await Promise.all([
    request<ProductDetails[]>('phones.json').catch(() => []),
    request<ProductDetails[]>('tablets.json').catch(() => []),
    request<ProductDetails[]>('accessories.json').catch(() => []),
  ]);

  const allDetails = [...phones, ...tablets, ...accessories];
  const found = allDetails.find(item => item.id === productId);

  if (!found) {
    throw new Error(`Product with id ${productId} not found`);
  }

  return {
    ...found,
    images: found.images.map(fixImageUrl),
  };
};

export const getProductById = async (
  itemId: string,
): Promise<Product | null> => {
  const products = await getProducts();
  const found = products.find(
    item => item.itemId === itemId || String(item.id) === itemId,
  );

  return found || null;
};

export const getSuggestedProducts = async () => {
  const products = await getProducts();

  return products.sort(() => 0.5 - Math.random()).slice(0, 8);
};
