import { useContext } from 'react';
import { Accessory } from '../types/Accessory';
import { Phone } from '../types/Phone';
import { Tablet } from '../types/Tablet';
import { CatalogContext } from '../CatalogContext';

export const GetCurrentProduct = (
  product: Phone | Tablet | Accessory | undefined,
) => {
  const { phonesFromServer, tabletsFromServer, accessoriesFromServer } =
    useContext(CatalogContext);

  let currentItem: Phone | Tablet | Accessory | undefined;

  if (product) {
    switch (product.category) {
      case 'phones':
        currentItem = phonesFromServer?.find(phone => phone.id === product.id);
        break;
      case 'tablets':
        currentItem = tabletsFromServer?.find(
          tablet => tablet.id === product.id,
        );
        break;
      case 'accessories':
        currentItem = accessoriesFromServer?.find(
          accessory => accessory.id === product.id,
        );
        break;
      default:
        currentItem = undefined;
    }
  } else {
    currentItem = undefined;
  }

  return currentItem;
};
