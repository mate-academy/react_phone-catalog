import { Category, Accessory, Phone, Tablet } from '../types';
import { getData } from '../utils/httpClient';

export const getPhones = getData<Phone[]>('/api/phones.json');
export const getAccessories = getData<Accessory[]>('/api/accessories.json');
export const getTablets = getData<Tablet[]>('/api/tablets.json');

export const getGadgetById = async (category: Category, id: string) => {
  switch (category) {
    case 'phones':
      const phones = await getPhones;

      return phones.find(phone => phone.id === id.toLowerCase()) || null;
    case 'tablets':
      const tablets = await getTablets;

      return tablets.find(tablet => tablet.id === id.toLowerCase()) || null;
    case 'accessories':
      const accessories = await getAccessories;

      return (
        accessories.find(accessory => accessory.id === id.toLowerCase()) || null
      );
    default:
      return null;
  }
};
