import { Product } from '../types/Product';

export const getSuggestedProducts = (
  products: Product[],
  filterType: keyof Product = 'year',
  value: string | number = 2019,
) => {
  return products.filter(product => product[filterType] === value);
};
