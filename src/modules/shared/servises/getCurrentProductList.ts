/* eslint-disable @typescript-eslint/indent */
import type { Product } from '../types/Product';
import phonesData from '../../../../public/api/phones.json';
import tabletsData from '../../../../public/api/tablets.json';
import accessoriesData from '../../../../public/api/accessories.json';
import type { ProductDetails } from '../types/ProductDetails';

export const getCurrentProductList = (
  category: string,
  listOfProducts: Product[],
  listType: 'details' | 'products',
): Product[] | ProductDetails[] => {
  switch (category) {
    case 'phones':
      return listType === 'details'
        ? phonesData
        : [...listOfProducts].filter(
            (product: Product) => product.category === 'phones',
          );

    case 'tablets':
      return listType === 'details'
        ? tabletsData
        : [...listOfProducts].filter(
            (product: Product) => product.category === 'tablets',
          );

    case 'accessories':
      return listType === 'details'
        ? accessoriesData
        : [...listOfProducts].filter(
            (product: Product) => product.category === 'accessories',
          );

    default:
      return listType === 'details' ? [] : [...listOfProducts];
  }
};
