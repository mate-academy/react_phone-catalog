import { Item } from '../types/Item';

export const getFilteredProducts = (products: Item[], query: string) => {
  const queryLowerCase = query.toLowerCase().replaceAll(' ', '');

  return products
    .filter(product => {
      const productName = product.name.toLowerCase().replaceAll(' ', '');

      return productName.includes(queryLowerCase);
    });
};
