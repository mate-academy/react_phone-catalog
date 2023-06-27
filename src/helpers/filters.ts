import { Product } from '../types/product';

export const sortProducts = (products: Product[], activeFilter: string) => {
  switch (activeFilter) {
    case 'age':
      return products.sort((a, b) => b.year - a.year);
    case 'name':
      return products.sort((a, b) => a.name.localeCompare(b.name));
    case 'price':
      return products.sort((a, b) => a.price - b.price);
    default:
      return products;
  }
};

export const filterProducts = (products: Product[], query: string) => {
  return products.filter(({ name }) =>
    name.toLowerCase().includes(query.toLowerCase()));
};
