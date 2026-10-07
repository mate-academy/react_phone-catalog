import { DetailsProduct } from '../types/DetailsProduct';
import { getAccessories } from './accessories';
import { getPhones } from './phones';
import { getTablets } from './tablets';

export function getProductDetails(
  productId: string,
): Promise<DetailsProduct | undefined> {
  const products = Promise.all([
    getPhones(),
    getTablets(),
    getAccessories(),
  ]).then(([phones, tablets, accessories]) => {
    return [...phones, ...tablets, ...accessories].find(product => {
      return product.id === productId;
    });
  });

  return products;
}
