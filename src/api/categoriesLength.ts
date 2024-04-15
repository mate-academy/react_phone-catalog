import { getAccessories } from './accessories';
import { getPhones } from './phones';
import { getTablets } from './tablets';

export const getAmountOfProducts = async () => {
  const [accessories, phones, tablets] = await Promise.all([
    getAccessories(),
    getPhones(),
    getTablets(),
  ]);

  return {
    phones: phones.length,
    tablets: tablets.length,
    accessories: accessories.length,
  };
};
