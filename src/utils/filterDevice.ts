import { Accessorie } from '../types/accessories';
import { Phone } from '../types/phone';
import { Tablet } from '../types/tablets';
import { findDeviceFromProducts } from './findDeviceFromProducts';
import { Product } from '../types/product';

export const filterDevice = (
  devices: (Phone | Tablet | Accessorie)[],
  search: URLSearchParams,
  products?: Product[],
): (Phone | Tablet | Accessorie)[] => {
  const doneDevices = devices;

  if (search.get('sort') === 'Alphabetically') {
    doneDevices.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (search.get('sort') === 'Cheapest') {
    doneDevices.sort((a, b) => a.priceDiscount - b.priceDiscount);
  }

  if (search.get('sort') === 'Newest') {
    return doneDevices.sort((a, b) => {
      if (products) {
        return (
          findDeviceFromProducts(products, b.id) -
          findDeviceFromProducts(products, a.id)
        );
      }

      return 0;
    });
  }

  return doneDevices;
};
