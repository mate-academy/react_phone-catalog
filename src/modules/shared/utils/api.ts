import { Product, ProductDetail } from '../types/Product';

const cache: Record<string, ProductDetail> = {};

const fetchJson = async <T>(fileName: string): Promise<T> => {
  const response = await fetch(`${import.meta.env.BASE_URL}api/${fileName}`);

  if (!response.ok) {
    throw new Error(`Failed to retrieve ${fileName} from the server`);
  }

  return response.json();
};

export const getPhones = async (): Promise<ProductDetail[]> => {
  return fetchJson<ProductDetail[]>('phones.json');
};

export const getAccessories = async (): Promise<ProductDetail[]> => {
  return fetchJson<ProductDetail[]>('accessories.json');
};

export const getProducts = async (): Promise<Product[]> => {
  return fetchJson<Product[]>('products.json');
};

export const getTablets = async (): Promise<ProductDetail[]> => {
  return fetchJson<ProductDetail[]>('tablets.json');
};

export const getProductById = async (
  productId: string,
): Promise<ProductDetail> => {
  if (cache[productId]) {
    return cache[productId];
  }

  const [phones, tablets, accessories] = await Promise.all([
    getPhones().catch(() => []),
    getTablets().catch(() => []),
    getAccessories().catch(() => []),
  ]);

  const allDetails = [...phones, ...tablets, ...accessories];

  const product = allDetails.find(item => item.id === productId);

  if (!product) {
    throw new Error('Product not found');
  }

  cache[productId] = product;

  return product;
};
