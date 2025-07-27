import { getAccessories } from './getAccessories';
import { getPhones } from './getPhones';
import { getProducts } from './getProducts';
import { getTablets } from './getTablets';

import type { Accessory } from '../types/Accessory';
import type { Phone } from '../types/Phone';
import type { Product } from '../types/Product';
import type { Tablet } from '../types/Tablet';
import type { ProductWithDetails } from '../types/ProductWithDetails';

export const getProductsWithDetails = async (): Promise<
  ProductWithDetails[]
> => {
  const products: Product[] = await getProducts();
  const phones: Phone[] = await getPhones();
  const accessories: Accessory[] = await getAccessories();
  const tablets: Tablet[] = await getTablets();

  const productsWithDetails = products.map(product => {
    let details: Phone | Tablet | Accessory | null = null;

    switch (product.category) {
      case 'phones':
        details = phones.find(phone => phone.id === product.itemId) || null;
        break;
      case 'tablets':
        details = tablets.find(tablet => tablet.id === product.itemId) || null;
        break;
      case 'accessories':
        details =
          accessories.find(accessory => accessory.id === product.itemId) ||
          null;
        break;
      default:
        details = null;
    }

    return {
      ...product,
      details,
    };
  });

  return productsWithDetails;
};
