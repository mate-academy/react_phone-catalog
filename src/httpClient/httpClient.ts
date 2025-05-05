import { CATEGORIES } from '../constants';
import { Categories } from '../types/Categories';
import { Item } from '../types/Item';

const BASE_URL = 'api/';

export const wait = () => new Promise(resolve => setTimeout(resolve, 300));

const get = async (dataName: string) => {
  await wait();

  const data = await fetch(BASE_URL + dataName + '.json').then(res => {
    if (!res.ok) {
      throw new Error(res.status + '');
    }

    return res.json();
  });

  return data;
};

export const getProducts = () => {
  return get(CATEGORIES.PRODUCTS);
};

export const getItemById = (str: Categories, id: string) =>
  get(str).then((res: Item[]) => res.find(e => e.id === id));

export const getAllVariations = (str: Categories, nameSpaceId: string) =>
  get(str).then((res: Item[]) =>
    res.filter(e => e.namespaceId === nameSpaceId),
  );
