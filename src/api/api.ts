import { Accessory, Phone, Product, Tablet } from './types';

const ENDPOINT = {
  phones: 'api/phones.json',
  products: 'api/products.json',
  accessories: 'api/accessories.json',
  tablets: 'api/tablets.json',
} as const;

type Category = keyof typeof ENDPOINT;

type ResponseMap = {
  phones: Phone[];
  products: Product[];
  tablets: Tablet[];
  accessories: Accessory[];
};

export async function getData<K extends Category>(
  category: K,
): Promise<ResponseMap[K]> {
  const response = await fetch(
    `${import.meta.env.BASE_URL}${ENDPOINT[category]}`,
  );

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const result = await response.json();

  return result as ResponseMap[K];
}
