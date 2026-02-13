import { Products } from 'src/types/products';

export const getFilteredProducts = (
  data: Products[],
  filter: string = 'phones',
) => {
  return [...data]
    .filter(item => item.category === filter)
    .sort((a, b) => b.year - a.year);
};
