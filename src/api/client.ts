import { AccessoryDetails } from '../types/AccessoryDetails';
import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';
import { getData } from './http';

export const getPhones = () => {
  return getData<ProductDetails[]>('./api/phones.json');
};

export const getTablets = () => {
  return getData<ProductDetails[]>('./api/tablets.json');
};

export const getAccessories = () => {
  return getData<AccessoryDetails[]>('./api/accessories.json');
};

export const getProducts = () => {
  return getData<Product[]>('./api/products.json');
};

export const getSuggestedProducts = async (
  excludeId?: string,
  count = 8,
): Promise<Product[]> => {
  const all = await getProducts();
  const pool = excludeId ? all.filter(p => p.itemId !== excludeId) : all;

  // Fisher-Yates shuffle
  const shuffled = [...pool];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
};
