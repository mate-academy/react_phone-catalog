import { useContext } from 'react';
import { Accessory } from '../types/Accessory';
import { Phone } from '../types/Phone';
import { Tablet } from '../types/Tablet';
import { CatalogContext } from '../CatalogContext';
// eslint-disable-next-line
type argument = Phone | Tablet | Accessory;

export const GetPoroductsForView = (products: argument[]) => {
  const { productsFromServer } = useContext(CatalogContext);

  let uniqProducts: string[] = [];
  let result: Phone[] | Tablet[] | Accessory[] = [];

  products.forEach(product => {
    if (!uniqProducts.includes(product.namespaceId) && productsFromServer) {
      const currentProduct = productsFromServer?.find(
        item => item.itemId === product.id,
      );

      uniqProducts = [...uniqProducts, product.namespaceId];

      if (currentProduct !== undefined) {
        result = [...result, product];
      }
    }
  });

  return result;
};
