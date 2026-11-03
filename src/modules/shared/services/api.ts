import { Product, ProductDetail } from '../types';

const BASE_URL = import.meta.env.BASE_URL;

const getFullUrl = (path: string) => {
  const base = BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`;

  return `${base}${path.startsWith('/') ? path.slice(1) : path}`;
};

async function request<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}

export const getProducts = (): Promise<Product[]> => {
  return request<Product[]>(getFullUrl('api/products.json'));
};

export const getProductDetails = async (
  productId: string,
): Promise<ProductDetail> => {
  const [phones, tablets, accessories] = await Promise.all([
    request<ProductDetail[]>(getFullUrl('api/phones.json')).catch(() => []),
    request<ProductDetail[]>(getFullUrl('api/tablets.json')).catch(() => []),
    request<ProductDetail[]>(getFullUrl('api/accessories.json')).catch(
      () => [],
    ),
  ]);

  const allDetails = [...phones, ...tablets, ...accessories];

  const foundDetail = allDetails.find(item => item.id === productId);

  if (!foundDetail) {
    throw new Error(`Details for product "${productId}" not found`);
  }

  return foundDetail;
};
