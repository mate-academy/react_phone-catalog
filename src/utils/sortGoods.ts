import { Accessories } from '../types/Accessories';
import { Phones } from '../types/Phones';
import { Products } from '../types/Products';
import { Tablets } from '../types/Tablets';

export const getSortedPhones = (
  typeSort: string,
  goods: Phones[] | Tablets[] | Accessories[],
  products: Products[],
) => {
  const sorted = [...goods];

  if (typeSort === 'Newest') {
    return sorted.sort((a, b) => {
      const prodA = products.find(val => val.itemId === a.id);
      const prodB = products.find(val => val.itemId === b.id);

      return (prodB?.year || 0) - (prodA?.year || 0);
    });
  }

  if (typeSort === 'Alphabetically') {
    return sorted.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (typeSort === 'Cheapest') {
    return sorted.sort((a, b) => a.priceDiscount - b.priceDiscount);
  }

  return sorted;
};
