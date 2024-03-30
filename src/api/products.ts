import { Product } from '../types/products';
import { client } from '../utils/axiosClient';
import { getAccessories } from './accessories';
import { getPhones } from './phones';
import { getTablets } from './tablets';

export const getProducts = () => {
  return client.get<Product[]>('/products.json');
};

export const getBrandNewModels = () => {
  return getProducts().then(products =>
    products.sort((a, b) => b.fullPrice - a.fullPrice),
  );
};

export const getHotPriceProducts = () => {
  return getProducts().then(products =>
    products.sort((a, b) => b.fullPrice - b.price - a.fullPrice - a.price),
  );
};

export const getAmountOfProducts = async () => {
  const [accessories, phones, tablets] = await Promise.all([
    getAccessories(),
    getPhones(),
    getTablets(),
  ]);

  return {
    accessories: accessories.length,
    phones: phones.length,
    tablets: tablets.length,
  };
};
