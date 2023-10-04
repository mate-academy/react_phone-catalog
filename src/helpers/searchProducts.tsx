import { Product } from '../types/Product';

export const searchProducts = (
  products: Product[],
  query: string,
) => {
  const visibleItems = products.filter(item => (
    item.name.toLowerCase().includes(query.toLowerCase())
  ));

  return visibleItems;
};
