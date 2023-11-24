import { Product } from '../types/Product';

export const filterProduct = (array: Product[], query: string | null) => {
  if (query?.trim() !== '' && query !== null) {
    return array.filter(pr => {
      return query?.toLowerCase().split(' ').every(word => {
        return pr.name.toLowerCase().includes(word);
      });
    });
  }

  return array;
};
