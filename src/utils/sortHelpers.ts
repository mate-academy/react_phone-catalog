import { Product } from '../types/Product';

export const sortProducts = (goods: Product[], sortField: string) => {
  const goodsCopy = [...goods];

  return goodsCopy.sort((good1, good2) => {
    switch (sortField) {
      case 'title':
        return good1.name.localeCompare(good2.name);
      case 'cheapest':
        return good1.price - good2.price;
      case 'age':
      default:
        return String(good2.id).localeCompare(String(good1.id));
    }
  });
};
