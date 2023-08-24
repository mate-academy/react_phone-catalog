import { Product } from '../types/Phone';

export const filteredProductsByName = (products: Product[], name: string) => {
  return products
    .filter(product => product
      .name.toLowerCase().replace(/\s+/, '')
      .includes(name.toLowerCase().replace(/\s+/, '')));
};
