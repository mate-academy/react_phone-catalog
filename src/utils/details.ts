import { getAccessories } from '../api/accessories';
import { getPhones } from '../api/phones';
import { getTablets } from '../api/tablets';
import { DetailsProduct } from '../types/DetailsProduct';

export function getProductVariant(
  namespaceId: string,
  color: string,
  capacity: string,
): Promise<DetailsProduct | undefined> {
  return Promise.all([getPhones(), getTablets(), getAccessories()]).then(
    ([phones, tablets, accessories]) => {
      return [...phones, ...tablets, ...accessories].find(product => {
        return (
          product.namespaceId === namespaceId &&
          product.capacity === capacity &&
          product.color === color
        );
      });
    },
  );
}
