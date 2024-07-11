import { Product } from '../types/Product';
import { getData } from '../utils/fetchClient';

const DELAY = 300;

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

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export const getDetailedItems = async (
  itemCategory: string,
): Promise<Product[]> => {
  if (itemCategory === 'phones') {
    const phones = await getData<Product[]>('/phones.json');

    return wait(DELAY).then(() => phones as Product[]);
  }

  if (itemCategory === 'tablets') {
    const tablets = await getData<Product[]>('/tablets.json');

    return wait(DELAY).then(() => tablets as Product[]);
  }

  if (itemCategory === 'accessories') {
    const accessories = await getData<Product[]>('/accessories.json');

    return wait(DELAY).then(() => accessories as Product[]);
  }

  return [];
};
