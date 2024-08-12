import { Products } from '../../type/Products';

// Функція для відфільтрування за категорією
export const filterCategory = (
  products: Products[],
  category: string,
): Products[] => {
  return products.filter(product => product.category === category);
};
