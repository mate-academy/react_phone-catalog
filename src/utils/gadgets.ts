import { Category } from '../types/Category';
import { Phone, Tablet, Accessories } from '../types/Gadget';
import { getData } from './httpClient';

export const getPhones = getData<Phone[]>('./phones.json');
export const getTablets = getData<Tablet[]>('./tablets.json');
export const getAccessories = getData<Accessories[]>('./accessories.json');

const dataMap: Record<Category, Promise<(Phone | Tablet | Accessories)[]>> = {
  phones: getPhones,
  tablets: getTablets,
  accessories: getAccessories,
};

export const getGadget = async (category: Category, id: string) => {
  const gadgets = await dataMap[category];

  return gadgets.find(gadget => gadget.id === id.toLowerCase()) || null;
};
