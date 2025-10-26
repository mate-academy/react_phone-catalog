import { Product } from '../../../ProductsContext/TabsContext';

export const getSuggestedProducts = (
  id: string,
  products: Product[],
  count = 8,
) => {
  const filtered = products.filter(p => p.id !== +id);
  const shuffled = filtered.sort(() => Math.random() - 0.5);

  return shuffled.slice(0, count);
};
