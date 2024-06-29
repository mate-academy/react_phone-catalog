import { Product } from '../types/Product';
import { getData } from '../utils/fetchClient';

export const getDetailedPhones = async (): Promise<Product[]> => {
  const phones = await getData<Product[]>('/phones.json');

  return phones as Product[];
};

export const getDetailedTablets = async (): Promise<Product[]> => {
  const tablets = await getData<Product[]>('/tablets.json');

  return tablets as Product[];
};

export const getDetailedAccessories = async (): Promise<Product[]> => {
  const accessories = await getData<Product[]>('/accessories.json');

  return accessories as Product[];
};
