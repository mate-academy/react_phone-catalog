import { Product } from '../types/Product';

export const sortProducts = (sortQuery: string | null, product: Product[]) => {
  const sorted = [...product].sort((e1, e2) => {
    switch (sortQuery) {
      case 'newest':
        return e1.age - e2.age;
      case 'ascending':
        return e1.price - e2.price;
      case 'descending':
        return e2.price - e1.price;

      default:
        return 0;
    }
  });

  return sorted;
};
