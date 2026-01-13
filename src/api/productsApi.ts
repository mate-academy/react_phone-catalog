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

// Use /api path for all environments (works in dev server and production)
const getApiUrl = (filename: string) => {
  return `/api/${filename}`;
};

export const getPhones = async (): Promise<Product[]> => {
  const response = await fetch(getApiUrl('phones.json'));
  return response.json();
};

export const getTablets = async (): Promise<Product[]> => {
  const response = await fetch(getApiUrl('tablets.json'));
  return response.json();
};

export const getAccessories = async (): Promise<Product[]> => {
  const response = await fetch(getApiUrl('accessories.json'));
  return response.json();
};
