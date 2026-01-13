interface Product {
  id: string;
  namespaceId: string;
  name: string;
  category: 'phones' | 'tablets' | 'accessories';
  priceDiscount: number;
  price: number;
  image: string;
  images?: string[];
  color?: string;
  colorsAvailable?: string[];
  capacity?: string;
  capacityAvailable?: string[];
  year?: number;
  itemId?: string;
  [key: string]: any;
}

const BASE_URL = process.env.PUBLIC_URL || '';

export const getPhones = async (): Promise<Product[]> => {
  const response = await fetch(`${BASE_URL}/api/phones.json`);
  return response.json();
};

export const getTablets = async (): Promise<Product[]> => {
  const response = await fetch(`${BASE_URL}/api/tablets.json`);
  return response.json();
};

export const getAccessories = async (): Promise<Product[]> => {
  const response = await fetch(`${BASE_URL}/api/accessories.json`);
  return response.json();
};
