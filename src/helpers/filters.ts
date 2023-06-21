import { Product } from '../types/product';

export const filterProducts = (products: Product[], activeFilter: string) => {
  switch (activeFilter) {
    case 'age':
      return products.sort((a, b) => a.age - b.age);
    case 'name':
      return products.sort((a, b) => a.name.localeCompare(b.name));
    case 'price':
      return products.sort((a, b) => a.price - b.price);
    default:
      return products;
  }
};
